import { Command, CommandOptions, emailReg } from '../common/command';
import { Injectable } from '@nestjs/common';
import { Users, UserState } from '@mysql';
import { createPass } from '@libs/crypto';

interface UserOptions {
  email?: string;
  pass?: string;
  role?: string;
  info?: string;
}

@Injectable()
@Command({ name: 'user', description: '用户管理' })
export class UsersService {

  @CommandOptions([
    { flags: 'email', alias: 'e', values: '<email>', description: '用户邮箱' },
    { flags: 'pass', alias: 'p', values: '<password>', description: '用户密码' },
    { flags: 'info', alias: 'i', values: '<email>', description: '用户信息，json 格式' },
    { flags: 'role', alias: 'r', values: '<role>', default: 'user', description: '用户角色' },
  ])
  async options() {}

  // 创建用户
  @CommandOptions([{ flags: 'create', alias: 'c', description: '创建用户' }])
  async create({ email, pass, role }: UserOptions) {
    role = role || 'user';
    if (!pass) return console.log('<pass>不能为空');
    if (!email) return console.log('<email>不能为空');
    if (pass.length < 6) return console.log('<%s>长度不能小于6', pass);
    if (!emailReg.test(email)) return console.log('<%s>格式不正确', email);
    //
    const uid = await Users.getUid();
    const newPass = createPass(email, pass);
    console.log(await Users.save({ role, email, name: email, pass: newPass, uid: String(uid), state: UserState.ENABLE }));
  }

  // 修改用户
  @CommandOptions([{ flags: 'save', alias: 's', description: '修改用户' }])
  async save({ email, pass, role, info }: UserOptions) {
    if (!email) return console.log('<email>不能为空');
    const infoJson = JSON.parse(info || '{}');
    pass = pass || infoJson.pass;
    role = role || infoJson.role;
    //
    if (pass) {
      if (pass.length < 6) return console.log('<%s>长度不能小于6', pass);
      infoJson.pass = createPass(email, pass);
    }
    if (role) infoJson.role = role;
    //
    if (!(await Users.hasKeys({ email }))) return console.log('<%s>用户不存在', email);
    console.log(await Users.update({ email }, infoJson));
  }

  // 删除用户
  @CommandOptions([{ flags: 'delete', alias: 'd', description: '删除用户' }])
  async delete({ email }: UserOptions) {
    if (!email) return console.log('<email>不能为空');
    if (!emailReg.test(email)) return console.log('<%s>格式不正确', email);
    if (!(await Users.hasKeys({ email }))) return console.log('<%s>用户不存在', email);
    console.log(await Users.delete({ email }));
  }
}
