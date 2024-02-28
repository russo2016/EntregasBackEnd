import passport from "passport";
import local from "passport-local";
import userService from "../models/user.model.js";
import { createHash, isValidPassword } from "../utils.js";
import { CartsModel } from "../models/carts.model.js";

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
            return done(null, false, { message: "Usuario no encontrado" });
          }

          if (!isValidPassword(user, password)) {
            return done(null, false, { message: "Contraseña incorrecta" });
          } else {
            return done(null, user);
          }
        } catch (error) {
          return done("Error al obtener el usuario", error);
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