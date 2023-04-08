export function FileToBase64(file: File): Promise<string> {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = function () {
      resolve(reader.result as string);
    };
    reader.readAsDataURL(file);
  });
}

export function getFile() {
  return new Promise<File>(resolve => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = function () {
      resolve((input.files as FileList)[0]);
      input.remove();
    };
    input.click();
  });
}

export function getDragFile({ dataTransfer }: { dataTransfer: DataTransfer }) {
  // 获取拖放的文件夹
  const items = dataTransfer.items;
  const files: File[] = [];

  // 递归遍历文件夹并获取所有文件
  function traverseFileTree(item: any, path?: string) {
    path = path || '';
    if (item.isFile) {
      // 如果是文件，则将其添加到文件列表中
      item.file(function (file: File) {
        files.push(file);
      });
    } else if (item.isDirectory) {
      // 如果是文件夹，则遍历其中的所有子文件和子文件夹
      const directoryReader = item.createReader();
      directoryReader.readEntries(function (entries: string | any[]) {
        for (let i = 0; i < entries.length; i++) {
          traverseFileTree(entries[i], path + item.name + '/');
        }
      });
    }
  }

  // 遍历数据
  for (let i = 0; i < items.length; i++) {
    const item = items[i].webkitGetAsEntry();
    if (item) traverseFileTree(item);
  }

  // 返回
  return files;
}
