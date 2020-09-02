import { IMailProvider, IMessage } from "../IMailProvider";
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer'; 

export class MailtrapMailProvider implements IMailProvider{
    private transporter: Mail;
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.mailtrap.io',
            port: 2525,
            auth: {
                user: 'your_key',
                pass: 'your_key'
            }
        })
    }

    async sendMail(message: IMessage):Promise<void> {
        await this.transporter.sendMail({
            to: {
                name: message.to.name,
                email: message.to.email,
            },
            from: {
                name: message.from.name,
                email: message.from.email,
            },
            subject: message.subject,
            body: message.body
        })
    }
}