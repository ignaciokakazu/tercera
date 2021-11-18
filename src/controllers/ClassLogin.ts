import {Request, Response, NextFunction} from 'express';
import {apiLogin} from '../apis/login';
import {UserI, NewUserI} from '../models/login.interfaces';
import Joi from 'joi';
import bcrypt from 'bcrypt';
import {infoLogger, peligroLogger} from '../services/logger';

//el controller está en medio de API y models (donde también están las interfaces)
//por ende, usa la API de Login, y la API usa la BD
//el Req/Res sale de acá: 
/*  Req/res-> Controller. Maneja la lógica
    API->Maneja la interacción con la BD (que está en models). Por eso los métodos de API son iguales a los del DAO
*/

export interface NewUser {
    name: string,
    username: string,
    password: string,
    avatar: string,
    direccion: string,
    telefono: number,
    edad: number,    
}


class ClassLogin {
    private user: string;
    private password: string;
    private admin: boolean;
    private saltRounds:number;

    constructor() {
        this.user = "";
        this.password = "";
        this.admin = false;
        this.saltRounds = 10;
    }

    async addUser(req:Request, res:Response) {
        try {
        const password = req.body.password;
        const passwordConfirmation = req.body.passwordConfirmation;

        const flagPassword: boolean = password === passwordConfirmation? true : false;
        
        if (!flagPassword) {throw new Error("Error en confirmación de password")}
        console.log("file" + req.body.file)
        
        //acá tiene que usar joi
        if (!req.body.name) {throw new Error("Error. Falta name")};

        if (!req.body.tel) {throw new Error("Error. Falta tel")};
        
        const userArr = await apiLogin.getByEmail(req.body.email);
                
        if (userArr) {throw new Error("Error. Usuario existente")};

        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(req.body.password, salt, async function(err, hash) {
                if (!err) {
                    //guarda en la BD
                     await apiLogin.addUser({
                        name: req.body.name,
                        email: req.body.email,
                        password: hash,
                        avatar: req.body.avatar,
                        direction: req.body.direction,
                        tel: req.body.tel,
                        age: req.body.age,  
                    }) 
                }
            });
        });

            infoLogger.info(`Usuario ${req.body.email} dado de alta ${new Date()}`);
            res.json({msg: `Usuario ${req.body.email} dado de alta ${new Date()}`, success:true})
        
        } catch(e:any) {
            infoLogger.info(`${e.message}`);
            res.json({msg: e.message, success:false});
        }
    }
   
    async auth(req:Request, res:Response) {
        //auth por Mongo

        const email:string = req.body.email;
        const password:string = req.body.password;

        // buscar en Mongo
        const userMongo = await apiLogin.getByEmail(req.body.email);
        const validate = await apiLogin.validatePassword(email, password);
        console.log(validate);
        if (validate) {
            res.redirect('/carrito');
            // res.json({msg: 'ok', success:true});
        } else {
            res.json({msg:'no', success:false});
        }
    
    }

    async getIdByEmail(email: string): Promise<string> {
        const userMongo:UserI = await apiLogin.getByEmail(email);
        return userMongo._id
    }


}

    // async fbAuth() {

    // }

    // async fbLogout() {

    // }


export const Login = new ClassLogin()