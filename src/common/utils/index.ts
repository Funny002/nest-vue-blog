export default {};
// import { Component, h } from 'vue';
// import { NIcon } from 'naive-ui';

// export function handleIcon(icon: Component) {
//   return () => h(NIcon, null, { default: () => h(icon) });
// }

// export function handleMenuIcon(list: { [k: string]: any }[], label = 'icon') {
//   return list.map(item => {
//     const target = { ...item };
//     if (item[label]) target[label] = handleIcon(item[label]);
//     return target;
//   });
// }


export class BaseConfig {
  public title = '';
  public titleSuffix = '';
  //
  public port = 9871;
  public origin = 'http';
  public host = '127.0.0.1';

  public get baseApi() {
    const { host, port, origin } = this;
    if (!host) return '';
    return `${origin}://${host}${(!port || port === 80) ? '' : ':' + port}`;
  }

  constructor(title: string, host?: string, port?: number) {
    this.title = title;
    if (host) this.host = host;
    if (port) this.port = port;
  }
}
