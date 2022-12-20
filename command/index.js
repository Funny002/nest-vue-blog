const { UseUserCommand } = require('./user');
const { UseJwtCommand } = require('./jwt');
const { Command } = require('commander');

// new command
const program = new Command();

// init command
program.name('basic').description('简单的辅助脚本').version('0.0.1');

// use user
UseUserCommand(program);

// use jwt
UseJwtCommand(program);

// run command
program.parse();
