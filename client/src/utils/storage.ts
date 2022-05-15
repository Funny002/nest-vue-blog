import EncUtf8 from 'crypto-js/enc-utf8';
import { getType } from '@utils/verify';
import Aes from 'crypto-js/aes';

const arr: { [key: string]: NodeJS.Timeout } = {};

const setExpires = (key: string, value: number): void => {
  arr[key] = setTimeout(() => {
    removeStorage(key);
  }, value);
};

// const removeExpires = (key: string): void => clearTimeout(arr[key]);

const storageKey = 'asdasdayvuinjmjkl';

export const getStorageKeys = (): string[] => {
  const keys: string[] = [];
  for (let max = localStorage.length - 1; max >= 0; max--) {
    keys.push(localStorage.key(max) as string);
  }
  return keys;
};

export const hasStorage = (key: string): boolean => getStorageKeys().includes(key);

export const setStorage = (key: string, value: any, expires?: number, aec?: boolean): void => {
  expires = expires || 0;
  const j_value = !['string', 'number', 'date', 'null', 'undefined'].includes(getType(value));
  let s_value = {value: j_value ? JSON.stringify(value) : value, aec, json: j_value};
  if (aec) s_value.value = Aes.encrypt(s_value.value, storageKey).toString();
  localStorage.setItem(key, JSON.stringify(s_value));
  if (expires > 0) setExpires(key, expires);
};

export const getStorage = (key: string): any => {
  const value = localStorage.getItem(key);
  if (!value) return null;
  const data = JSON.parse(value);
  if (data.aec) data.value = Aes.decrypt(data.value, storageKey).toString(EncUtf8);
  return !data.json ? data.value : JSON.parse(data.value);
};

export const removeStorage = (...keys: string[]): void => {
  if (!keys.length) {
    localStorage.clear();
  } else {
    for (const key of keys) {
      localStorage.removeItem(key);
    }
  }
};
