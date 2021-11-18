import express from 'express';
import {Productos} from '../controllers/ClassProductos';
import { isLoggedIn, pruebaFuncionamiento } from '../middleware/passportLocal';
import {Carrito} from '../controllers/ClassCarrito';

const router = express.Router();

router.get('/', (req,res)=> {
    res.render('main');
})

router.get('/', pruebaFuncionamiento, isLoggedIn, (req,res)=> {
    res.render('main');
})

router.get('/admin', (req,res)=> {
    res.render('login');
})

router.get('/admin/error', (req, res)=> {
     res.render('error');
})

router.get('/register', (req, res)=> {
    res.render('register');
})

router.get('/admin/index', async (req, res)=> {
     const prod = await Productos.getProductosAll(req, res);
     const datos = {
         prod: prod //solo se puede mandar un objeto, no arrays
     }
     res.render('crud', datos);
 })

 router.get('/checkout', async (req, res)=> {
    //  const carrito = await Carrito.getCarritoById(req.body._id);
    //  const datos = {
    //      carrito: carrito
    //  }
     res.render('checkout'); //, datos);
 })




export default router;