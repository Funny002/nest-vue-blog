import { CommandName, CommandOptionsName } from '../common/command';
import { CommandOption, CommandOptions } from '../common/command';
import { ModulesContainer } from '@nestjs/core';
import { Injectable } from '@nestjs/common';
import { Command } from 'commander';

@Injectable()
export class AppService {
  private program: Command;

  constructor(private readonly container: ModulesContainer) {
    const version = '0.0.1';
    const name = 'NestBlog Cli';
    const description = 'Cli 工具将为 NestBlog 辅助命令行工具。';
    //
    this.program = this.createCommand(name, version, description);
  }

  createCommand(name: string, version = '', description = '') {
    const program = new Command();
    program.name(name);
    if (version) program.version(version);
    if (description) program.description(description);
    return program;
  }

  async run() {
    const modules = Array.from(this.container.values()).map(module => module.providers.values());
    for (const providerModule of modules) {
      for (const provider of providerModule) {
        const { instance } = provider;
        if (!instance || !instance.constructor) {
          continue;
        }
        const meta = Reflect.getMetadata(CommandName, instance.constructor) as CommandOption;
        if (meta) this.addCommand(instance, meta);
      }
    }
    // @ts-ignore
    await this.program.parseAsync();
  }

  addCommand(instance: any, meta: CommandOption) {
    const proto = Object.getPrototypeOf(instance);
    const commandMap: { [name: string]: () => Promise<void> } = {};
    const newCommand = this.createCommand(meta.name, meta.version, meta.description);
    const methodNames = Object.getOwnPropertyNames(proto).filter(v => v !== 'constructor');

    /* 方法遍历 */
    for (const command of methodNames) {
      const options = Reflect.getMetadata(CommandOptionsName, proto[command]) as CommandOptions[] || [];
      if (options.length === 1) options[0].isCommand = true;
      if (!options.length) continue;

      /* 参数遍历 */
      for (const opt of options) {
        const flags = opt.alias && opt.flags ? `-${opt.alias}, --${opt.flags}` : `-${opt.alias || opt.flags}`;
        newCommand.option([flags, opt.values].join(' '), opt.description, opt.handler || undefined, opt.default || undefined);
        if (opt.isCommand) commandMap[(opt.flags).toLowerCase()] = instance[command];
      }
    }

    newCommand.action(async function (items) {
      const keys = Object.keys(items).map(v => v.toLowerCase());
      for (const key of keys) {
        if (commandMap.hasOwnProperty(key)) {
          /* 生命周期 */
          await commandMap[key].apply(instance, [items]);
        }
      }
    });
    this.program.addCommand(newCommand);
  }
}
