import express from 'express';
import {Request, Response, NextFunction} from 'express';
import { Login } from '../controllers/ClassLogin';
import {Productos} from '../controllers/ClassProductos';
//import {middleAdm} from './middleware.js';

const router = express.Router();
let admin=false;
/*hacer mensajes de error*/

router.get('/listar', Productos.getProductosAll);

router.get('/listar/:id', Productos.getProductosById);

// router.get('/listar/:search', async (req, res)=> {
//     res.json(await Productos.search(req.params.search));
// })

// const adm = (user, password) => {
//     admin = Login.validacion(user, password);
// }

// router.post('/login', (req, res) => {
//     admin = Login.validacion(req.body)
//     console.log(admin)
//     admin? res.json({ url: "http://localhost:8080/admin/index" }) : res.json({url: "http://localhost:8080/admin/error"});
// });


router.delete('/borrar/:id', Productos.deleteProducto);

router.post('/agregar', Productos.insertProducto);

router.put('/actualizar/:id', Productos.updateProducto);

// const middleAdmin = (request: Request, response: Response, next: NextFunction) => {
//     console.log("middleware admin")
//     console.log(admin)
//     admin? next() : response.status(403).json({error: "Error de autenticación"})
// }

// router.use(middleAdmin) //lo de acá abajo es afectado por el middleWare

/*
{
    "product": {"nombre": "nombre1",
    "descripcion": "descripcion2",
                "codigo": "codigo",
            "foto": "req.foto",
            "precio": 1234,
            "stock": 10}
}

{
    "user": {"user": "admin",
    "password": "1234"}
}

*/

/*
{
    "user": {"user": "admin1234",
    "password": "1234"},
        "product": {"nombre": "nombre1",
    "descripcion": "descripcion2",
                "codigo": "codigo",
            "foto": "req.foto",
            "precio": 1234,
            "stock": 10}
}

*/

export default router;