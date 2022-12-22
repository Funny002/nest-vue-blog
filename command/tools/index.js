const { existsSync, readFileSync, writeFileSync } = require('fs');
const { createHash } = require('crypto');
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

function getType(target) {
  return Object.prototype.toString.call(target).slice(8, -1).toLocaleLowerCase();
}

function dateFormat(format = 'y-m-d', value = new Date()) {
  const date = getType(value) === 'Date' ? value : new Date(value);
  const hasPad = (state, value) => value.toString().padStart(state ? 2 : 1, '0');
  return format.replace(/\w/g, function (val) {
    if (['y', 'Y'].includes(val)) {
      return date.getFullYear().toString().slice(val === 'y' ? 2 : 0);
    } else if (['m', 'M'].includes(val)) {
      return hasPad(val === 'M', date.getMonth() + 1);
    } else if (['d', 'D'].includes(val)) {
      return hasPad(val === 'D', date.getDate());
    } else if (['h', 'H'].includes(val)) {
      return hasPad(val === 'H', date.getHours());
    } else if (['i', 'I'].includes(val)) {
      return hasPad(val === 'I', date.getMinutes());
    } else if (['s', 'S'].includes(val)) {
      return hasPad(val === 'S', date.getSeconds());
    } else if (val === 't') {
      return date.getMilliseconds().toString();
    }
    return val;
  });
}

exports.dateFormat = dateFormat;

function md5(value) {
  const md5 = createHash('md5');
  md5.update(value);
  return md5.digest('hex');
}

exports.md5 = md5;
