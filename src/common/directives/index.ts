// v{Name}Directive
import { App, Directive } from '@vue/runtime-core';

type DirectiveOptions = { name: string, directive: Directive; default: Directive & { name: string } }

export const UseDirective = {
  // use 挂载
  install(app: App<Element>, ...args: DirectiveOptions[]) {
    for (const arg of args) {
      const directiveName = arg.name || arg.default?.name;
      const directive = arg.directive || arg.default;
      app.directive(directiveName, directive);
    }
  },
};

export default UseDirective;
