import { createTransport, Transporter } from 'nodemailer';
import Fs from 'fs';

interface EmailOption {
  host: string;
  port: number;
  secure?: boolean;
  auth?: { user: string; pass: string; };
}

interface EmailOptions {
  cc?: string;
  to?: string;
  bcc?: string;
  body: string;
  form?: string;
}

export class EmailService {
  private transport: Transporter;
  private opt: EmailOptions = Object.create(null);

  constructor({ auth, host, port, secure }: EmailOption) {
    this.transport = createTransport({ auth, host, port, secure });
    this.opt.form = auth.user;
  }

  template(src: string, object: { [key: string]: any }) {
    if (Fs.existsSync(src)) {
      const template = Fs.readFileSync(src, 'utf8');
      this.opt.body = template.replace(/{{([^{}]*)}}/g, (match, key) => object[key]);
    } else {
      throw new Error('Template not found');
    }
    return this;
  }

  body(body: string) {
    this.opt.body = body;
    return this;
  }

  cc(cc: string | string[]) {
    this.opt.cc = (Array.isArray(cc) ? cc : [cc]).join(',');
    return this;
  }

  bcc(bcc: string | string[]) {
    this.opt.bcc = (Array.isArray(bcc) ? bcc : [bcc]).join(',');
    return this;
  }

  to(to: string | string[]) {
    this.opt.to = (Array.isArray(to) ? to : [to]).join(',');
    return this;
  }

  send(subject: string, form?: string) {
    const { cc, bcc, to, body } = this.opt;
    if (!body) throw new Error('Email body is empty');
    const options = { to, cc, bcc, subject, html: body, from: form ? `"${form}" ${this.opt.form}` : this.opt.form };
    //
    return new Promise((resolve, reject) => {
      this.transport.verify(err => {
        if (!err) {
          this.transport.sendMail(options).then(resolve).catch(e => reject(e));
        } else {
          reject(err);
        }
      });
    });
  }
}
