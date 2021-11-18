import express from 'express';
import routerProductos from './productos';
import routerCarrito from './carrito';
import routerHB from './hb';
import routerLogin from './login';
import { isLoggedIn } from '../middleware/passportLocal';

const mainRouter = express.Router();

mainRouter.use('/api/productos', routerProductos);
// mainRouter.use('/api/carrito', routerCarrito);
mainRouter.use('/', routerHB);
mainRouter.use('/api/login', routerLogin);
mainRouter.use('/api/carrito', isLoggedIn, routerCarrito);
mainRouter.get('*', (req, res) => {
    res.status(404).json({error: 'Ruta no implementada'});
  });


export default mainRouter;
