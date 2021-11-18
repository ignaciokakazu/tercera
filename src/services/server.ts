import config from '../config/config'
import express from 'express';
import MongoStore from 'connect-mongo';
import passport from '../middleware/passportLocal';
import mainRouter from '../router/index';
import handlebars from 'express-handlebars';
import session from 'express-session';
import * as http from 'http';
import path from 'path';
import { infoLogger } from './logger';
import {Request, Response, NextFunction} from 'express'
import cookieParser from 'cookie-parser'

const app = express();

/* Passport */
const StoreOptions = {
  store: MongoStore.create({
    mongoUrl: config.MONGO_ATLAS_SRV,
  }),

  secret: config.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: Number(config.SESSION_COOKIE_TIMEOUT_MIN) * 60 * 1000,
  },
};
app.use(cookieParser())
app.use(session(StoreOptions));



/* express configuration */

app.use(express.json());
app.use(express.urlencoded({extended: false}))



app.use(passport.initialize());
app.use(passport.session());

app.use((req:Request, res:Response, next:NextFunction)=> {
  infoLogger.info(`req.user=> ${JSON.stringify(req.user)}`);
  next();
})
/*public*/
const publicPath = path.resolve(__dirname, "../../public")
app.use(express.static(publicPath))

/* Handlebars */
app.set('view engine', 'handlebars');
const layoutsPath = path.resolve(__dirname, '../../views/layouts');
const defaultPath = path.resolve(__dirname, '../../views/layouts/index.handlebars');

app.engine(
    'handlebars',
    handlebars({
      layoutsDir: layoutsPath,
      defaultLayout: defaultPath,
    })
  );

/* Router */
app.use('/', mainRouter);

const myServer = new http.Server(app);

export default myServer;