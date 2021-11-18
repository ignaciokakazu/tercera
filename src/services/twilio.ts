//import config from '../config/config';
import twilio from 'twilio';
import {infoLogger} from './logger';

class Twilio {
  private twilio;

  constructor() {
    this.twilio = twilio(process.env.TWILIO_ACCOUNT_ID, process.env.TWILIO_TOKEN);
  }

  async sendMessage(message: string, to?:string) {
    const params = {
      body: message,
      from: process.env.TWILIO_CELLPHONE,
      to: to || process.env.TWILIO_ADMIN,
    };
    const receiver = to || process.env.TWILIO_ADMIN;
    
    await this.twilio.messages.create(params);
    infoLogger.info(`SMS enviado a ${receiver}`)
    //return response;
  }
}

export const SmsService = new Twilio();
