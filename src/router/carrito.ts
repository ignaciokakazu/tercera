import express from 'express';
import {Carrito} from '../controllers/ClassCarrito';

const router = express.Router();

router.get('/listar', Carrito.getCarritoAll);

router.get('/listar/:id', Carrito.getCarritoById);

/* Ejemplo de objeto del Response {
"_id": "61924f8b74ebb19a086840d0", 
"producto": {
    "_id": "614a81044110e52a0702bf81", 
    "nombre": "OsobucoModif",
    "descripcion": "Descripcion osobuco",
    "codigo": "Oso",
    "foto": "foto",
    "precio": 50,
    "stock": 10,
    "timestamp": "Tue Sep 21 2021 22:04:04 GMT-0300 (hora estándar de Argentina)"
}
*/

router.post('/agregar', Carrito.setCarrito); //acá recibe _id del usuario y ProductoInterface

router.post('/checkout', Carrito.checkout);

// router.post('/agregar/:id_producto', Carrito.addCarritoById)
// async (req: Request,res:Response)=> {
//     res.json(await Carrito.addCarritoById(Number(req.params.id_producto)))
// })

// router.delete('/borrar/producto/:id_producto', async (req,res)=> {
//     res.json(await Carrito.deleteCarritoByIdProducto(req.params.id_producto))
// })

router.post('/agregarPrueba', Carrito.addCarritoPrueba);

router.delete('/borrar/todo', Carrito.deleteCarritoById);
// async (req:Request, res:Response)=> {
//     res.json(await Carrito.deleteCarritoAll());
// })

//router.delete('/borrar/:id', Carrito.deleteCarritoById);
// async (req: Request,res:Response)=> {
//     res.json(await Carrito.deleteCarritoById(Number(req.params.id)))
// })

router.get('/', (req, res)=> {
    res.render('crud')
})

export default router;