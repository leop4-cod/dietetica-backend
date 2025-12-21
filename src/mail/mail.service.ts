import * as nodemailer from 'nodemailer';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SendMailDto } from './dto/send-mail.dto';

@Injectable()
export class MailService {
    constructor(private readonly configService: ConfigService) { }

    async sendMail(dto: SendMailDto) {
        const mailUser = this.configService.get<string>('MAIL_USER');
        const mailPass = this.configService.get<string>('MAIL_PASS');

        if (!mailUser || !mailPass) {
            console.error('Credenciales de correo faltantes en .env');
            console.error(`MAIL_USER: ${mailUser ? 'DEFINIDO' : 'FALTANTE'}`);
            console.error(`MAIL_PASS: ${mailPass ? 'DEFINIDO' : 'FALTANTE'}`);
            throw new InternalServerErrorException('Configuración de correo incompleta en el servidor.');
        }

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,         
            secure: true,       
            auth: {
                user: mailUser,
                pass: mailPass,
            },
            tls: {
                rejectUnauthorized: false, 
                minVersion: 'TLSv1.2',
            },
        });

        try {
            const info = await transporter.sendMail({
                from: mailUser,
                to: dto.to,
                subject: dto.subject,
                html: dto.message,
            });

            return { messageId: info.messageId };
        } catch (error) {
            console.error('Error al enviar correo:', error);
            throw new InternalServerErrorException(
                `No se pudo enviar el correo: ${error.message || 'Error desconocido'}`
            );
        }
    }
}
