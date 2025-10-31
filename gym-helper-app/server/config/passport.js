import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import { User } from "../models/User";

passport.use(
    new Strategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: `${process.env.URL}/api/auth/google/callback`
        },
        async(accessToken, refreshToken, profile, done) => {
            try {
                const user = await User.findOne({
                    googleId: profile.id
                });

                if(!user){
                    return done(null, false, {
                        message: "Account not found"
                    });
                }
                done(null, user);
            } catch (error) {
                done(error, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => done(null, user))
    .catch((error) => done(error, null))
})

export default passport;

