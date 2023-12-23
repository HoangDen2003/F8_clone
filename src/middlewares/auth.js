const express = require("express");
const passport = require("passport"); // ! đứng trước router
const router = express.Router();
const User = require("../app/models/User");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async function (accessToken, refreshToken, profile, done) {
      const newUser = {
        googleId: profile.id,
        fullName: profile.displayName,
        first_name: profile.name.givenName,
        last_name: profile.name.familyName,
        email: profile.emails[0].value,
        image: profile.photos[0].value,
        password: profile.emails[0].value.slice(
          0,
          profile.emails[0].value.length - 10
        ),
      };

      try {
        let user = await User.findOne({ googleId: profile.id });
        if (user) {
          done(null, user);
        } else {
          user = await User.create(newUser);
          done(null, user);
        }
      } catch (error) {
        console.log(error);
      }
    }
  )
);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login-failure",
    successRedirect: "/home",
  })
);

router.get("/login-failure", function (req, res) {
  res.send("Some thing went wrong...");
});

/**
 *
 * todo -> serializeUser:  Lưu thông tin người dùng vào session
 */
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

/**
 * todo -> deserializeUser: Tải thông tin của người dùng từ session, từ đó cho phép ứng dụng xử lý các yêu cầu của người dùng
 */
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = router;
