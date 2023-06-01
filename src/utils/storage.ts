import { Aes } from '@utils/crypto';

interface StorageConf {
  value: any;
  aes?: boolean;
  exceed?: number;
}

export type varStorageEvent = CustomEvent<{ type: 'set' | 'remove'; prefix: string; key: string; value?: any; } | { type: 'clear', prefix: string; keys: string[] }>

export class Storage {
  private readonly AppKey: string;
  private readonly prefix: string;

  constructor(key: string, prefix?: string) {
    this.prefix = prefix || 'varStorage';
    this.AppKey = key;
  }

  private handleKey(key: string) {
    return this.prefix + '|' + key;
  }

  keys(handleKey = true) {
    const keys: string[] = [];
    for (let long = localStorage.length; long > 0; long -= 1) {
      const key = localStorage.key(long - 1) as string;
      if (key.indexOf(this.prefix + '|') === 0) {
        keys.push(key);
      }
    }
    return handleKey ? keys.map(key => key.slice(this.prefix.length + 1)) : keys;
  }

  has(key: string) {
    const data = localStorage.getItem(this.handleKey(key));
    if (data) {
      const { exceed } = JSON.parse(data || '{}') as StorageConf;
      if (exceed && exceed < Date.now()) {
        this.remove(key);
        return false;
      }
      return true;
    }
    return false;
  }

  get(key: string) {
    const { value, exceed, aes } = JSON.parse(localStorage.getItem(this.handleKey(key)) || '{}') as StorageConf;
    if (exceed && exceed < Date.now()) {
      return this.remove(key);
    }
    if (value && aes) {
      return Aes.decrypt(this.AppKey, value);
    }
    return value;
  }

  set(key: string, value: any, exceed?: number, aes?: boolean) {
    const keys = this.handleKey(key);
    const data: StorageConf = { value };
    // 开启超时
    if (exceed) {
      data.exceed = Date.now() + exceed;
    }
    // 开启加密
    if (aes) {
      data.aes = true;
      data.value = Aes.encrypt(this.AppKey, value);
    }
    // 写入
    localStorage.setItem(keys, JSON.stringify(data));
    // 添加写入事件
    window.dispatchEvent(new CustomEvent('varStorage', { detail: { prefix: this.prefix, type: 'set', key, value } }));
  }

  remove(key: string) {
    // 删除
    localStorage.removeItem(this.handleKey(key));
    // 添加删除事件
    window.dispatchEvent(new CustomEvent('varStorage', { detail: { prefix: this.prefix, type: 'remove', key } }));
  }

  clear() {
    const keys = this.keys();
    for (let long = keys.length; long > 0; long -= 1) {
      localStorage.removeItem(this.prefix + '|' + keys[long - 1]);
    }
    window.dispatchEvent(new CustomEvent('varStorage', { detail: { prefix: this.prefix, type: 'clear', keys } }));
  }
}

export default new Storage(window.location.origin);
