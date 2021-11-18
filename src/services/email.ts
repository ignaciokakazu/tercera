//import config from '../config/config';
import nodemailer from 'nodemailer';

export default class EmailService {
  private owner:any;
  private transporter:any;

  constructor() {
      const name:string = process.env.GMAIL_NAME || '';
      const address:string = process.env.GMAIL_USERNAME || '';
      const host:string = process.env.GMAIL_HOST || '';
      const port:number = Number(process.env.GMAIL_PORT) || 10;
      const username:string = process.env.GMAIL_USERNAME || '';
      const password:string = process.env.GMAIL_PASS || '';

      this.owner = {
        name: name,
        address: address,
      };

      this.transporter = nodemailer.createTransport({
        host: host,
        port: port,
        secure:false,
        auth: {
          user: username,
          pass: password,
        },
      });
  }
  

  async sendEmail(dest: string, subject: string, content: string) {
    const mailOptions = {
      from: this.owner,
      to: dest,
      subject,
      html: content,
    };

    await this.transporter.sendMail(mailOptions);
    
  }
}
