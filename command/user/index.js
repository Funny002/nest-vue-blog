const { dateFormat, getUUID, md5 } = require('../tools');
const mysql = require('mysql2');

function createPassword(pass, user) {
  return md5(md5(user) + pass);
}

function handleUserRes(func, ...args) {
  const mysqlConf = {
    host: process.env['MYSQL_HOST'] || '127.0.0.1',
    port: parseInt(process.env['MYSQL_PORT'] || '3306'),
    user: process.env['MYSQL_USER'],
    password: process.env['MYSQL_PASS'],
    database: process.env['MYSQL_DB'],
  };

  const conn = mysql.createConnection({
    ...mysqlConf,
    charset: 'utf8mb4',
    connectionLimit: 10,
  });

  return new Promise(success => {
    conn.connect(async function (err) {
      if (err) return console.error('error connecting: ' + err.stack);
      try {
        await func(conn, ...args);
      } catch (e) {
        console.log(e);
      }
      conn.end(() => success());
    });
  });
}

function UseUserCommand(program) {
  program
    .command('user')
    .description('最高权限用户操作')
    .option('-c, --create [user...]', '创建用户, -create <user> <pass>')
    .option('-s, --save <pass>', '修改密码')
    .option('-d, --delete', '删除')
    .option('-i, --info', '查询')
    .action((...args) => handleCommand(...args));
}

async function handleCommand(options) {
  const keys = Object.keys(options)[0];
  if (!keys) return console.log('操作不能为空.\r\nps: command user -h');
  if (keys === 'create') return handleUserRes(createCommand, ...options.create);
  if (keys === 'save') return handleUserRes(saveCommand, options.save);
  if (keys === 'delete') return handleUserRes(deleteCommand);
  if (keys === 'info') return handleUserRes(infoCommand);
}

function handleQuery(conn, sql, val) {
  return new Promise((resolve, reject) => {
    conn.query(sql, val, function (error, results) {
      if (error) return reject(error);
      resolve(results);
    });
  });
}

function hasUserInfo(conn) {
  return handleQuery(conn, `SELECT * FROM users WHERE rower LIKE ?`, 'all');
}

async function createCommand(conn, user, pass) {
  if (user.length < 6) return console.log('用户名不能小于6位');
  if (pass.length < 8) return console.log('密码不能小于8位');
  // =================================================================
  const res = await hasUserInfo(conn);
  if (res.length) return console.log('最高权限账号已存在');
  // =================================================================
  const time = dateFormat('Y-M-D H:I:S.00000');
  const value = [time, time, getUUID(true), user, createPassword(pass, `${user}@email.com`), `${user}@email.com`];
  await handleQuery(conn, "INSERT INTO users (`id`, `create_time`, `update_time`, `uid`, `name`, `pass`, `email`, `avatar`, `href`, `explain`, `login_time`, `rower`, `state`) VALUES(null, ?, ?, ?, ?, ?, ?, null, null, null, null, 'all', '1')", value);
  console.log('用户创建成功');
}

async function saveCommand(query, pass) {
  if (pass.length < 8) return console.log('密码不能小于8位');
  // =================================================================
  const info = await hasUserInfo(query);
  if (!info.length) return console.error('未查询到数据');
  const value = [createPassword(pass, info[0].email), dateFormat('Y-M-D H:I:S.00000')];
  await handleQuery(query, "UPDATE users SET pass = ?, update_time = ? WHERE rower LIKE 'all'", value);
  console.log('密码修改成功');
}

async function deleteCommand(query) {
  await handleQuery(query, "DELETE FROM users WHERE rower LIKE 'all'");
  console.log('删除成功');
}

function infoCommand(query) {
  hasUserInfo(query).then(console.log);
}

exports.UseUserCommand = UseUserCommand;

exports.default = UseUserCommand;
