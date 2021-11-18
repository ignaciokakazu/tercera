import moment from 'moment';
import {Request, Response} from 'express';
import {api} from '../apis/api';
import {CarritoArray, CarritoInterface, NewCarritoInterface} from '../models/carrito.interfaces';
import {UserI} from '../models/login.interfaces';
import {infoLogger, peligroLogger} from '../services/logger';
import {Login} from './ClassLogin';
import { apiLogin } from '../apis/login';
import {SmsService} from '../services/twilio';
import EmailService from '../services/email';


class ClassCarrito {
    private sqlite:any;
    private lista:any;

    constructor() {

    }

    async getCarritoById(req:Request, res:Response) {//id:number) {
        try {
            const id: string= req.params.id;
            const carrito = await api.getCarritoById(id);
            
            res.json(carrito);
            
        } catch(error: any) {
            peligroLogger.warn(error.message);
            res.json ({error: error.message})
        }
    }

    async getCarritoAll(req:Request, res:Response) {
        try {
            const carritoAll = await api.getCarritoAll();
            res.json(carritoAll);
        } catch (error:any) {
            res.json({error: error.message});
        }
    }

    async addCarritoPrueba(req:Request, res:Response) {
        const cart = await api.addCarritoPrueba();
        console.log('soy el carrito prueba')
        res.json(cart)
    }

    async deleteCarritoById(req:Request, res:Response){//id:number) {
        try {
            await api.deleteCarritoById(req.body.id);
            
            res.json({msg: `Eliminado ${req.body.id}`});

        } catch (err:any) {
            res.json({error: err.message});
        }
    }

    async setCarritoNuevo(id: string): Promise<string>{

        return await api.setCarritoNuevo(id);
        
        
    }

    async setCarrito(req:Request, res:Response) {
        try {
        /* Corroborar que haya stock */

        const carrito: CarritoInterface = await api.setCarrito(req.body);

        res.json(carrito);

 
    } catch (e:any) {
        res.json({msg:e.message})
    }
    }

    async checkout(req:Request, res:Response) {
        /*
            {recibe del body el carrito}
            cierra el carrito. Cambia de abierto a false
        */
       try {
        let carrito:CarritoInterface = await api.getCarritoById(req.body._id)
        const userId:string = carrito.user;
        const user: UserI[] = await apiLogin.get(userId);
        
        carrito.abierto = false;
        await api.checkout(carrito)
        //enviar mail a admin
        const mail = new EmailService()
        console.log('enviado')
        await mail.sendEmail(user[0].email, `Nuevo pedido de ${user[0].name}`, `${carrito}`)
        await SmsService.sendMessage(`Nuevo pedido de ${user[0].name}`)
            res.json({msg: 'cerrado', carrito: carrito})
        } catch(e:any) {
            res.json({msg: e.message})
        }
        //enviar sms a admin

        //enviar sms a user
    }


    async addCarritoById(req:Request, res:Response) {
        try {
            //Productos
            const id:number = Number(req.params.body);
            const lista = await api.getProductosById(id);
            
            console.log(lista);
               
        } catch (error:any) {
            return {error: error.message}
        }
    }

}

export const Carrito = new ClassCarrito();