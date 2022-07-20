const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { Strategy: JWTStrategy, ExtractJwt } = require("passport-jwt");
const bcrypt = require("bcrypt");
const models = require("../models");

const { JWT_SECRET } = process.env;

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (formMail, formPassword, done) => {
      try {
        models.users.findOneByMail(formMail).then(([result]) => {
          if (!result.length)
            return done(null, false, { msg: "Wrong username!" });

          const users = result[0];
          const isPasswordOK = bcrypt.compareSync(formPassword, users.password);
          if (!isPasswordOK) return done(null, false, "Wrong password!");

          delete users.password;
          return done(null, users);
        });
      } catch (err) {
        console.warn(err);
        return done(err);
      }
      return null;
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
    },
    (jwtPayload, done) => {
      const users = jwtPayload;
      return done(null, users);
    }
  )
);

passport.serializeUser((users, done) => {
  done(null, users);
});

passport.deserializeUser((users, done) => {
  done(null, users);
});
