import { FilesPreviewDto } from './dto/index.dto';
import { ConfigService } from '@nestjs/config';
import { AppName, AppSystem } from '@config';
import { Injectable } from '@nestjs/common';
import { reWriteObj } from '@utils/object';
import { LimitSize } from '@utils';
import { Files } from '@mysql';
import Sharp from 'sharp';
import path from 'path';
import fs from 'fs';

@Injectable()
export class FilesService {
  private readonly dirPath: string;

  constructor(private readonly config: ConfigService) {
    this.dirPath = path.resolve('./', this.config.get<AppSystem>(AppName).filesPath);
  }

  handlerFilePath(filePath: string) {
    return this.dirPath + filePath.split('|').join(path.sep);
  }

  getFiles(filePath: string): [boolean, any] {
    filePath = this.handlerFilePath(filePath);
    if (!fs.existsSync(filePath)) return [false, '文件不存在'];
    return [true, fs.readFileSync(filePath)];
  }

  async handlerFileBuffer(file: Buffer, query: FilesPreviewDto) {
    const height = query.height ? LimitSize(parseInt(query.height || '0'), 1, 300) : null;
    const width = query.width ? LimitSize(parseInt(query.width || '300'), 1, 300) : null;
    const quality = LimitSize(parseInt(query.quality || '80'), 1, 100);
    //
    return await Sharp(file).resize({ width, height }).png({ quality }).toBuffer();
  }

  handlerFileInfo(file: Files) {
    const info = reWriteObj(file, ['id', 'size', 'name', 'ext', 'width', 'height', 'mimetype', 'original_name']);
    info['fileName'] = [file.name, file.ext].join('');
    return info;
  }
}
