import myServer from './services/server';
import config from './config/config';
import {infoLogger, peligroLogger} from './services/logger';
import {apiLogin} from './apis/login';

const port = process.env.PORT || 8080;

myServer.listen(port, ()=> { infoLogger.info(`SERVER UP ${port}`)});   
myServer.on('error', (err:any)=> { peligroLogger.warn(`Error en server ${err.message}`)})

