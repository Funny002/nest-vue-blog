import { FolderCreateDto } from './dto/index.dto';
import { reWriteDiffObj } from '@utils/object';
import { Injectable } from '@nestjs/common';
import { Files, FilesFolder } from '@mysql';
import { In } from 'typeorm';

@Injectable()
export class FolderService {
  createFolder(uid: string, body: FolderCreateDto) {
    const info = new FilesFolder();
    info.uid = uid;
    info.name = body.name;
    info.sort = body.sort;
    info.description = body.description;
    return info;
  }

  handlerFolder(info: FilesFolder) {
    return reWriteDiffObj(info, ['update_time', 'uid', 'parent']);
  }

  /* 判断文件夹下是否有文件夹 */
  isFolder(id: number) {
    return FilesFolder.countBy({ pid: id });
  }

  /* 判断文件夹下是否有文件 */
  isFiles(ids: number[]) {
    return Files.countBy({ pid: In(ids) });
  }

  /* 获取所有文件夹 */
  async getChildFolder(id: number) {
    const folder = await FilesFolder.getInfoKeys({ id });
    return await FilesFolder.getTreeRepository().findDescendants(folder);
  }

  /* 获取所有文件 */
  async getChildFiles(ids: number[]) {
    return await Files.getKeys({ pid: In(ids) });
  }
}
