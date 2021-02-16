import express from 'express';
import logger from 'morgan';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import passport from 'passport';
import './passport';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import {localsMiddleware} from './middlewares';
import userRouter from './routers/userRouter';
import videoRouter from './routers/videoRouter';
import globalRouter from './routers/globalRouter';
import apiRouter from './routers/apiRouter';
import routes from './routes';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const CookieStore = MongoStore(session);
const app = express();

app.use(helmet({contentSecurityPolicy: false}));
app.set("view engine", "pug");
app.set('views', path.join(__dirname, 'views'));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: new CookieStore({mongooseConnection: mongoose.connection})
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(logger('tiny'));
app.use(localsMiddleware);

app.use('/images', express.static('images'));
app.use('/uploads', express.static('uploads'));
app.use('/static', express.static(path.join(__dirname, "static")));
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter);
 

export default app;
