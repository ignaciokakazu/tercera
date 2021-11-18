import myServer from './services/server';
import config from './config/config';
import {infoLogger, peligroLogger} from './services/logger';
import {apiLogin} from './apis/login';

const port = process.env.PORT || config.PORT;


// apiLogin.get('ignaciokakazu1@gmail.com')
//     .then((result) => {console.log(result)})

// apiLogin.getByEmail('ignaciokakazu1@gmail.com')
//     .then((result) => {console.log(result)})

myServer.listen(port, ()=> { infoLogger.info(`SERVER UP ${port}`)});   
myServer.on('error', (err:any)=> { peligroLogger.warn(`Error en server ${err.message}`)})

