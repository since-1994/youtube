import express from 'express';
import routes from '../routes.js';
import passport from 'passport';
import {home, search} from '../controllers/videoController';
import { getJoin, getLogin, logout, postJoin, postLogin } from '../controllers/userController.js';

const globalRouter = express.Router();

globalRouter.get(routes.home, home);

globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin, postLogin);

globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);

globalRouter.get('/auth/github', passport.authenticate('github'));
globalRouter.get('/auth/github/callback', passport.authenticate('github', {failureRedirect: '/login'}), (req, res) => {
    res.redirect(routes.home);
});

globalRouter.get(routes.logout, logout);
globalRouter.get(routes.search, search);

export default globalRouter;