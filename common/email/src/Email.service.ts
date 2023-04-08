import { SentMessageInfo } from 'nodemailer/lib/smtp-transport';
import { createTransport, Transporter } from 'nodemailer';
import { Email_Name, EmailOptions } from '@app/config';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

interface EmailContentOptions {
  to: string[];
  body: string;
  subject: string;
  form: { name: string, email: string };
}

@Injectable()
export class EmailService {
  private readonly serve?: Transporter<SentMessageInfo>;
  private readonly content: Partial<EmailContentOptions>;

  constructor(private readonly configService: ConfigService) {
    const { user, pass, ...options } = this.configService.get<EmailOptions>(Email_Name);
    this.serve = createTransport({ ...options, auth: { user, pass } });
    this.content = { form: { email: user, name: '' } };
  }

  subject(title: string) {
    this.content['subject'] = title;
    return this;
  }

  form(name: string, email?: string) {
    this.content['form'] = { name, email: email || this.content.form['email'] };
    return this;
  }

  setTo(...emails: string[]) {
    this.content['to'] = emails;
    return this;
  }

  addTo(...emails: string[]) {
    if (!this.content['to']) this.content['to'] = [];
    this.content['to'] = [...new Set(this.content['to'].concat(emails))];
    return this;
  }

  setBody(body: string) {
    this.content[body] = body;
    return this;
  }

  send() {
    const { form, to, body, subject } = this.content;
    const data = { body, subject, to: to.join(', '), form: form.name ? `"${form.name}" <${form.email}}>` : form.email };
    return this.serve.sendMail(data);
  }

  close() {
    if (this.serve) this.serve.close();
  }
}
