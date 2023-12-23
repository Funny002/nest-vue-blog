const path = require('path');
const fs = require('fs');

function main(src, name, SymbolMap, Filter) {
  name = name || 'App';
  SymbolMap = SymbolMap || ['┣', '┃', '┗'];
  Filter = Filter || ['dist', 'node_modules', '.DS_Store', '.env', '.git', '.idea'];

  function isDirectory(dir) {
    return fs.statSync(dir).isDirectory();
  }

  function handlerSort(a, b) {
    const [newA, newB] = [typeof a === 'string', typeof b === 'string'];
    if (!newA && !newB) return a[0].localeCompare(b[0]);
    if (newA && newB) return a.localeCompare(b);
    if (newB) return -1;
    if (newA) return 1;
    return 0;
  }

  function bootstrap(dir, name = 'App') {
    const child = [];
    for (const item of fs.readdirSync(dir)) {
      if (!Filter.includes(item)) {
        const newPath = path.resolve(dir, item);
        if (isDirectory(newPath)) {
          child.push(bootstrap(newPath, item));
        } else {
          child.push(item);
        }
      }
    }
    return [name, child.sort(handlerSort)];
  }

  function exportStructure(name, structure, tree = 0) {
    const target = [];
    const prefix = (prefix => prefix ? `${prefix}  ` : prefix)(Array.from(new Array(tree), () => SymbolMap[1]).join('  '));
    target.push([prefix, tree ? SymbolMap[0] + ' ' : '', name].join('').slice(tree ? 3 : 0));
    for (let i = 1, max = structure.length; i <= max; i++) {
      const item = structure[i - 1];
      if (Array.isArray(item)) {
        target.push(...exportStructure(item[0], item[1], tree + 1));
      } else {
        target.push([prefix, SymbolMap[i === max ? 2 : 0], ' ', item].join(''));
      }
    }
    return target;
  }

  // start
  const structure = bootstrap(src, name);
  return exportStructure(structure[0], structure[1]);
}

const start = Date.now();
const dir = path.resolve(__dirname);
//
const Filter = ['dist', 'node_modules', '.DS_Store', '.env', '.git', '.idea', 'cli', 'directoryStructure.js', 'structure.txt', 'tsconfig.build.json', 'tsconfig.json', 'tsconfig.lib.json', 'backup.7z'];
const content = main(dir, 'App', null, Filter).join('\r\n');
fs.writeFileSync(path.resolve(dir, './structure.txt'), content + '\r\n', { encoding: 'utf-8' });
//
console.log(`运行时间<%s>ms`, Date.now() - start);
