// import { NewProductoInterface, ProductoInterface } from '../models/interfaces';
// import { ProductQuery } from '../models/interfaces';
import {ProductosFactoryDAO} from '../models/productos.factory';
import {TipoPersistencia} from '../models/productos.factory';
import {CarritoFactoryDAO} from '../models/carrito.factory';
import {ProductoInterface} from '../models/productos.interfaces';
import Mongoose from 'mongoose';

import {NewCarritoInterface, CarritoInterface} from '../models/carrito.interfaces';
/**
 * Con esta variable elegimos el tipo de persistencia
 */
// const tipo = TipoPersistencia.sqlite;
const tipo = TipoPersistencia.mongodbAtlas;

class capaAPIProductos { //incluye productos y carrito
  private productos: any;


  constructor() {
    this.productos = ProductosFactoryDAO.get(tipo);
  }

  //PRODUCTOS
  async getProductosAll(): Promise<ProductoInterface>{//id: string | undefined = undefined){//: Promise<ProductI[]> {
    //if (id) return this.productos.getProductosById(id);

    return this.productos.getProductosAll();
  }

  async getProductosById(id:number) {
      return this.productos.getProductosById(id);
  }

  async insertProducto(data:any) {
      return this.productos.insertProducto(data);
  }

  async deleteProducto(data:any) {
    return this.productos.deleteProducto(data);
   }

   async updateProducto(id:number, data:any) {
    return this.productos.updateProducto(id, data);
   }
   
}

class capaAPICarrito { //incluye productos y carrito
  
  private carrito: any;

  constructor() {
    
    this.carrito = CarritoFactoryDAO.get(tipo);
  }

   //carrito

   async getCarritoAll() {
       return this.carrito.getCarritoAll();
   }
   
   async getCarritoById(id:string) {
    return this.carrito.getCarritoById(id);
   }

   async addCarritoPrueba() {
     return this.carrito.addCarritoPrueba();
   }


   async setCarritoNuevo(id:string) {
    return this.carrito.setCarritoNuevo(id);
  }

  async setCarrito(data:CarritoInterface) { 
    //en realidad acá le debería pasar el producto. En el DAO debería hacer la lógica de Mongo, para que sea útil para otras BD
    return this.carrito.setCarrito(data);
  }

   async deleteCarritoById(id:number) {
    return this.carrito.deleteCarritoById(id);
   }

   async checkout(data:CarritoInterface) {
     return this.carrito.checkout(data);
   }

}
export const api = new capaAPIProductos();
export const apiCarrito = new capaAPICarrito();