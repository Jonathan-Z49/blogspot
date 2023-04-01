const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("../models/userModel");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        const { id, given_name, family_name } = profile;
        const photo_url = profile.photos[0].value;
        const existing_user = await User.findOne({ googleId: id });
        if (!existing_user) {
          const new_user = new User({
            googleId: id,
            first_name: given_name,
            last_name: family_name,
            photo: photo_url,
          });

          await new_user.save();
          return done(null, new_user);
        }
        return done(null, existing_user);
      } catch (error) {
        console.error(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const currentUser = await User.findOne({ _id: id });
  done(null, currentUser);
});
