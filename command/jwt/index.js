const { ranStr, handleNumber, handleEnvFile } = require('../tools');

function UseJwtCommand(program) {
  program
    .command('jwt')
    .description('jwt的一些操作')
    .option('-c, --create <long>', '随机生成一个令牌', handleNumber, '16')
    .action(handleCommand);
}

function handleCommand(options) {
  const keys = Object.keys(options)[0];
  if (!keys) return console.log('操作不能为空.\r\nps: command jwt -h');
  if (keys === 'create') createCommand(options.create);
}

function createCommand(long) {
  if (long < 8) return console.log('error: 长度不能小于8');
  handleEnvFile(/JWT_SECRET=[^\n\r]+/, `JWT_SECRET='${ranStr(long)}'`);
  console.log('[%s]: 替换成功, 重启后令牌生效', new Date());
}

exports.UseJwtCommand = UseJwtCommand;

exports.default = UseJwtCommand;
