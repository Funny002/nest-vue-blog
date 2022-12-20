function UseUserCommand(program) {
  program
    .command('user')
    .description('最高权限用户操作')
    .option('-c, --create [user...]', '创建用户, -create <user> <pass>')
    .option('-s, --save <pass>', '修改密码')
    .option('-d, --delete', '删除')
    .option('-i, --info', '查询')
    .action(handleCommand);
}

function handleCommand(options) {
  const keys = Object.keys(options)[0];
  if (!keys) return console.log('操作不能为空.\r\nps: command user -h');
  if (keys === 'create') return createCommand(...options.create);
  if (keys === 'save') return saveCommand(options.save);
  if (keys === 'delete') return deleteCommand();
  if (keys === 'info') return infoCommand();
}

function createCommand(user, pass) {
  console.log('create command', user, pass);
}

function saveCommand(pass) {
  console.log('save command', pass);
}

function deleteCommand() {
  console.log('delete command');
}

function infoCommand() {
  console.log('info command');
}

exports.UseUserCommand = UseUserCommand;

exports.default = UseUserCommand;
