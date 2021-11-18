import passport from 'passport';
import {
  Strategy,
  VerifyFunctionWithRequest,
  IStrategyOptionsWithRequest,
} from 'passport-local';
import { Request, Response, NextFunction } from 'express';
import { apiLogin } from '../apis/login';
// import { userJoiSchema } from '../models/users/users.interface';
import { infoLogger, peligroLogger } from '../services/logger';

const admin = true;

export const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
   infoLogger.info('EJECUTANDO MIDDLEWARE');
  if (admin) next();
  else {
    peligroLogger.warn('No autorizado')
    res.status(401).json({
      msg: 'No estas autorizado',
    });
  }
};

const strategyOptions: IStrategyOptionsWithRequest = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
};

const loginFunc: VerifyFunctionWithRequest = async (
  req,
  username,
  password,
  done
) => {
  console.log('loginFunc')
  const user = await apiLogin.getByEmail(username);
  console.log(user);
  if (!user) {
    infoLogger.warn(`user does not exists ${username}`);
    return done(null, false, { message: 'User does not exist' });
  }

  const check = await apiLogin.validatePassword(username, password);
  console.log(check);
  if (!check) {
    infoLogger.warn('Login Fail for username ${username}: Password is not valid');
    return done(null, false, { message: 'Password is not valid.' });
  }
  console.log('login exitoso 50')
  infoLogger.info(`User ${username} logged in at ${new Date()}`);
  return done(null, user);
};

const signUpFunc: VerifyFunctionWithRequest = async (
  req,
  username,
  password,
  done
) => {
  try {
    // await userJoiSchema.validateAsync(req.body);

    const { email } = req.body;
    const user = await apiLogin.getByEmail(username);

    if (user) {
        infoLogger.warn(
        `Signup Fail for username ${username}: Username or email already exists`
      );
      return done(null, {
        error: `Invalid Username/email`,
      });
    } else {
      const newUser = await apiLogin.addUser(req.body);
      return done(null, newUser);
    }
  } catch (err) {
    if (err instanceof Error) {
        infoLogger.error(err.message);
      return done(null, {
        error: err.message,
      });
    }
  }
};

passport.use('login', new Strategy(strategyOptions, loginFunc));
passport.use('signup', new Strategy(strategyOptions, signUpFunc));

// passport.serializeUser((user:any, done) => {
//   // console.log(user);
//   done(null, user._id);
// });

// passport.deserializeUser((userId, done) => {
//   UserModel.findById(userId, function (err:any, user:any) {
//     done(err, user);
//   });
// });

passport.serializeUser((user: any, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (userId: string, done) => {
  try {
    const result = await apiLogin.getByEmail(userId);
    done(null, result);
    // const result = await apiLogin.get(userId);
    // done(null, result[0]);
  } catch (err) {
    done(err);
  }
});

export const pruebaFuncionamiento = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.session);
  console.log(req.user);
  next()
}

export const isLoggedIn = (req: Request, res: Response, done: NextFunction) => {
  console.log('is logged in');
  console.log(req.body)
  console.log(req.user);
  console.log(req.session);
  if (!req.session) return res.status(401).json({ msg: 'Unathorized' });

  done();
};

export const isAdmin = (req: Request, res: Response, done: NextFunction) => {
  if (!req.user) return res.redirect('/admin')//res.status(401).json({ msg: 'Unathorized' });

  done();
};

export default passport;
