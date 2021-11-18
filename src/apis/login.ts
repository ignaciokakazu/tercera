import {Request, Response} from 'express';
import {TipoPersistencia} from '../models/login.factory';
import {LoginFactory} from '../models/login.factory';
import {UserI} from '../models/login.interfaces';
/**
 * Con esta variable elegimos el tipo de persistencia
 */
// const tipo = TipoPersistencia.sqlite;
const tipo = TipoPersistencia.mongodbAtlas;

class ApiLogin {
    private user:any;

    constructor() {
        this.user = LoginFactory.get(tipo);
    }

    async addUser(user:any) {
        /* Registración */
        // return this.productos.insertProducto(data);
        return await this.user.addUser(user);
    }

    async getByEmail(email:string) : Promise<UserI>{
        /* El Id del user es el username*/
        return await this.user.getByEmail(email);
    }

    async getAll(): Promise<UserI[]> {
        return await this.user.getAll();
    }

    async get(id:string): Promise<UserI[]> {
        return await this.user.get(id);
    }

    async userExists(email:string): Promise<boolean> {
        return await this.user.userExists(email);
    }
    
    async validatePassword(email:string, password:string) : Promise<boolean> {
        console.log('validate password, linea 38 api/login ' + email + " " + password)
        return await this.user.validatePassword(email, password)
    }
    
    async findById(id:any) {
        return await this.user.findById(id)
    }
    /* No hago el update*/
}

export const apiLogin = new ApiLogin();