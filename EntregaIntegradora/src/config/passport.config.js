import passport from "passport";
import local from "passport-local";
import userService from "../dao/database/models/user.model.js";
import { createHash, isValidPassword } from "../utils.js";
import  CartsModel  from "../dao/database/models/carts.model.js";

const LocalStrategy = local.Strategy;

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;
        try {

          const user = await userService.findOne({ email: username });

          if (user) {
            return done(null, false, { message: "Ya existe el usuario" });
          }
          const newCart = new CartsModel();
          await newCart.save();
          const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
            cart: newCart._id
          };
          let result
          if (newUser.email === "adminCoder@coder.com"){
            newUser.role = "admin";
            result = await userService.create(newUser);
          }else{
            newUser.role = "user";
            result = await userService.create(newUser);
          }
        
          return done(null, result);
        } catch (error) {
          return done(error);
        }
      }
    )
  );


  passport.use(
    "login",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
        passwordField: "password",
      },
      async (req, username, password, done) => {
        try {
          const user = await userService.findOne({ email: username });
          if (!user) {
            req.success = false;
            req.message = "Usuario no encontrado"
            return done(null, false, { message: "Usuario no encontrado" });
          }

          if (!isValidPassword(user, password)) {
            req.success = false;
            req.message = "Usuario o contraseña incorrecta"
            return done(null, false, { message: "Usuario o contraseña incorrecta" });
          } 
          user.last_connection = new Date();
          user.save();
          req.success = true;
          req.message = "Logueado con exito"
          return done(null, user, { message: "Logueado con exito" });
        } catch (error) {
          console.log(error);
          req.success = false;
          req.message = "Error al obtener el usuario"
          return done(null, false, { message: "Error al obtener el usuario" });
        }
      }
    )
  );


  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await userService.findById(id);
    done(null, user);
  });
};

export default initializePassport;