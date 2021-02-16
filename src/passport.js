import passport from 'passport';
import User from './models/User';
import passportGithub from 'passport-github';
import { githubLoginCallback } from './controllers/userController';
import dotenv from 'dotenv';

dotenv.config();

const GithubStrategey = passportGithub.Strategy;

passport.use(User.createStrategy());
passport.use(new GithubStrategey({
    clientID: process.env.GH_CLIENT_ID,
    clientSecret: process.env.GH_SECRET,
    callbackURL: "http://localhost:4000/auth/github/callback"
}, githubLoginCallback));

passport.serializeUser(function(user, done){
    done(null, user);
});
passport.deserializeUser(function(user, done){
    done(null, user);
});