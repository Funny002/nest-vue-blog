import { SentMessageInfo } from 'nodemailer/lib/smtp-transport';
import { Options as SendOptions } from 'nodemailer/lib/mailer';
import { createTransport, Transporter } from 'nodemailer';

// import { EmailName, EmailOptions } from '@config';
// import { ConfigService } from '@nestjs/config';
// import { Injectable } from '@nestjs/common';
//
// @Injectable()
// export class EmailService {
//   private readonly emailRes: Transporter<SentMessageInfo>;
//
//   constructor(private readonly configService: ConfigService) {
//     const { user, pass, ...conf } = this.configService.get<EmailOptions>(EmailName);
//     this.emailRes = createTransport({ ...conf, auth: { user, pass }, jsonTransport: true });
//   }
//
//   getRes() {
//     return this.emailRes;
//   }
//
//   send(options: SendOptions) {
//     return this.emailRes.sendMail(options);
//   }
// }

import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {

}
