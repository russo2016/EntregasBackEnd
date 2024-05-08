import passport from "passport";
import GitHubStrategy from "passport-github2";
import userService from "../dao/database/models/user.model.js";
import * as dotenv from "dotenv";
import  CartsModel  from "../dao/database/models/carts.model.js";

dotenv.config();
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const GITHUB_CALLBACK_URL = process.env.GITHUB_CALLBACK_URL;

const initializePassport = () => {
  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: GITHUB_CALLBACK_URL,
        scope: ['user:email'],
        profileFields: ['id', 'displayName', 'emails']
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await userService.findOne({
            email: profile.emails[0].value,
          });

          if (!user) {
            const newCart = new CartsModel();
            await newCart.save();
            const newUser = {
              first_name: profile.displayName.split(" ")[0],
              last_name: profile.displayName.split(" ")[1],
              email: profile?.emails[0]?.value,
              age: 18,
              password: Math.random().toString(36).substring(7),
              cart: newCart._id
            };
            let result;
            if (newUser.email === "adminCoder@coder.com"){
              newUser.role = "admin";
              result = await userService.create(newUser);
            }else{
              newUser.role = "user";
              result = await userService.create(newUser);
            }
            done(null, result);
          } else {
            done(null, user);
          }
        } catch (err) {
          done(err, null);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      let user = await userService.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
};


export default initializePassport;
