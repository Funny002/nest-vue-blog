const { existsSync, readFileSync, writeFileSync } = require('fs');
const { resolve } = require('path');

function ranStr(long, radix = 26) {
  if (long < 1) throw new Error('long lat 1');
  const getStr = () => Math.random().toString(radix).slice(2);
  let target = getStr();
  for (let i = target.length; i < long; i = target.length) {
    target += getStr();
  }
  return target.slice(0, long);
}

exports.ranStr = ranStr;

function handleNumber(str) {
  const val = parseInt(str);
  return isNaN(val) ? undefined : val;
}

exports.handleNumber = handleNumber;

function handleEnvFile(reg, value) {
  const path = resolve(__dirname, '../../.env');
  if (!existsSync(path)) return console.log('error: .env 文件不存在。');
  const fileStr = readFileSync(path, 'utf-8');
  writeFileSync(path, fileStr.replace(reg, value));
}

exports.handleEnvFile = handleEnvFile;
