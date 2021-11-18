import moment from 'moment';
import { Request, Response, NextFunction } from 'express';
import {ProductoInterface,
        NewProductoInterface} from '../models/productos.interfaces';
import {api} from '../apis/api';

class ClassProductos {
    //private lista: ProductoInterface[];
    
    constructor() {
        
    }

    // checkProduct(req:Request, res:Response, next: NextFunction) {
    //     const msg:string = this.validacion(req.body);

    //     if (msg) {
    //         res.json({error: msg})
    //     } else {
    //         next()
    //     }
    // }

    async getProductosAll(req: Request, res: Response) {
        try {
            const lista = await api.getProductosAll();
            res.json(lista);
        } catch (error: any) {
            console.log(error.message);
            res.json({error: error.message});
        }
    }

    async getProductosById(req: Request, res: Response) {
        try {
            const lista:any = await api.getProductosById(Number(req.params.id));

            if (lista.length) {
                res.json(lista);
            } else {
                res.json({error: "No se encuentra el producto"})
            }
        } catch (error: any) {
            res.json({error: error.message});
        }
    }

    async insertProducto(req: Request, res: Response) {
        //agregar try-catch;
        const obj: any = req.body;
        
        const respuesta = await api.insertProducto(obj);
        res.json(respuesta);
    }

    async deleteProducto(req:Request, res:Response) {
        //acá tengo que validar, antes de mandar
        let id:number|string;
        if (isNaN(Number(req.params.id))) {
            id = req.params.id;
        } else {
            id = Number(req.params.id);
        }
        
        await api.deleteProducto(id);
        res.json({id: id});
    }

    async updateProducto(req:Request, res: Response) {
        let id:number;
        id = Number(req.params.id);
        
        const data:any = req.body;
        //acá tengo que validar, antes de mandar
        await api.updateProducto(id, data);
        res.json({id: id});
    }

    // async addProducto(req: Request, res: Response) {
    //     try {
    //         this.lista = await db.read("productos")
    //         const prodId = this.generarId(this.lista);
            
    //         if (!prodId) {throw new Error('Problema para generar el ID. Comuniquese con el administrador')}
    //         if (this.validacion(req.body) != "") {throw new Error(this.validacion(req.body))};

    //         const prod = {
    //             id: prodId, 
    //             timestamp: moment().format('yy-MM-DD HH:mm:ss'),
    //             nombre: req.body.nombre,
    //             descripcion: req.body.descripcion,
    //             codigo: req.body.codigo,
    //             foto: req.body.foto,
    //             precio: req.body.precio,
    //             stock: req.body.stock
    //         }

    //         this.lista.push(prod);
    //         await db.write("productos", this.lista)
    //         const obj = {msg:"Producto agregado", id: prodId}
    //         res.json(obj);

    //     } catch(error: any) {
    //         res.json({error: error.message});
    //     }
    // }

    // generarId(productos:any) {
    //     const largo:number = productos.length;
    //     let max:number = 0;
    //     for (let i=0;i<largo;i++) {
    //         if (parseInt(productos[i].id) > max) {
    //             max = productos[i].id
    //         }
    //     }
    //     return max + 1;
    // }

    // async deleteProducto(req: Request, res: Response) {
    //     try {
    //         const id:number = parseInt(req.params.id);
    //         this.lista = await db.read("productos")
            
    //         const productos = this.lista.filter((prod:any)=>prod.id == id);
    //         if (!productos.length) { throw new Error('Id no disponible');} 

    //         const filtrada = this.lista.filter((prod:any)=> prod.id != id);
    //         await db.write("productos", filtrada);
            
    //         res.json({msg: "Producto eliminado"});
            
    //     } catch (error:any) {
    //         res.json({error: error.message});
    //     }
    // }

    // async getProductoById(req:Request, res:Response) {
    //     try {
    //         const id = req.params.id;
    //         this.lista = await db.read("productos");
    //         const prod = this.lista.filter((prod:any)=>prod.id == id);

    //         if (prod.length) {
    //             res.json(prod);
    //         } else {
    //             res.json({error: 'Producto no se encuentra'});
    //         }
    //     } catch (error:any) {
    //         res.json({error: error.message});
    //     }
    // }
    
    // async updateProducto(req:Request, res:Response) { //id:number, req: any
        
    //     try {
    //         const id: number = parseInt(req.params.id);
            

    //         this.lista = await db.read("productos");
            
    //         let productos = this.lista.filter((prod:any)=>prod.id == id);

    //         if (!productos.length) {throw new Error('No se encuentra el ID de producto')};
    //         if (this.validacion(req.body) != "") {throw new Error(this.validacion(req.body))};
    //         //console.log(prod)

    //         let obj: ProductoInterface = {
    //             id: id,
    //             nombre: req.body.nombre,
    //             descripcion: req.body.descripcion,
    //             codigo: req.body.codigo,
    //             foto: req.body.foto,
    //             precio: req.body.precio,
    //             stock: req.body.stock,
    //             timestamp: moment().format('yy-MM-DD HH:mm:ss')
    //         }
            
    //         productos = this.lista.filter((prod:any)=>prod.id != id);
    //         productos.push(obj);
    //         this.lista = productos;
    //         console.log(this.lista)
    //         await db.write("productos", this.lista);

    //         return {msg: "Actualizado", prod: obj};
    //     } catch (error:any) {
    //         return {error: error.message};
    //     }
    // }

    validacion(req: any) {
        let msg = "";

        if (typeof(req.nombre)!='string') { msg += `Nombre debe ser texto. Nombre ${req.nombre}. `};
        if (!req.nombre) { msg += `Nombre es un dato requerido.` };
        if (typeof(req.descripcion)!='string') { msg += `Descripción debe ser texto. Descripción ${req.descripcion}. `};
        if (!req.descripcion) { msg += `Descripción es un dato requerido. `};
        if (!req.codigo) { msg +=`Código es un dato requerido. `};
        if (!req.foto) { msg += `Foto es un dato requerido. `};
        if (typeof(req.foto) != 'string') { msg += `Foto debe ser texto. Foto ${req.foto}. `};
        if (isNaN(req.precio)) { msg += `Precio debe ser numérico. Precio ${req.precio}. `};
        if (!req.precio) { msg += `Precio es un dato requerido. `};
        if (!req.stock) { msg += `Stock es un dato requerido. `};
        if (req.precio<0) { msg += 'Precio no puede ser negativo. '}
        if (isNaN(req.stock)) { msg += `Stock debe ser numérico. Stock ${req.stock}. `};
        if (req.stock <0) { msg += 'Stock no puede ser negativo. '}

        return msg;
    }

    /* búsqueda
    async search(palabra:string) {
        const lista:any = await fs.readFile(this.url, 'utf-8');
        lista? this.lista = JSON.parse(lista) : this.lista = [];
        const filtrada = lista.filter((prod:any)=> prod.nombre.toUpperCase().indexOf(palabra.toUpperCase())>-1 ||
                                                    prod.descripcion.toUpperCase().indexOf(palabra.toUpperCase()>-1))
        return filtrada;
    }*/
    
}

/*
{
    "user": {"user": "admin",
    "password": "1234"},
        "product": {"nombre": "nombre2",
    "descripcion": "descripcion2",
                "codigo": "codigo",
            "foto": "req.foto",
            "precio": 1234,
            "stock": 10}
}

*/

export const Productos = new ClassProductos();