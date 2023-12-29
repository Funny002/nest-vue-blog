import { FileFormat, Files, FilesFolder } from '@mysql';
import { Features, identify } from 'imagemagick';
import { ConfigService } from '@nestjs/config';
import { AppName, AppSystem } from '@config';
import { Injectable } from '@nestjs/common';
import { reWriteObj } from '@utils/object';
import { ranString } from '@utils/string';
import { sha256 } from '@libs/crypto';
import path from 'path';
import fs from 'fs';

@Injectable()
export class UploadService {
  private readonly dirPath: string;

  constructor(private readonly ConfigService: ConfigService) {
    this.dirPath = path.resolve('./', this.ConfigService.get<AppSystem>(AppName).filesPath);
  }

  async verifyFolder(uid: string, folder: number): Promise<[boolean, string]> {
    if (isNaN(folder)) return [false, '文件夹ID错误'];
    if (folder && (await FilesFolder.countBy({ uid, id: folder })) < 0) return [false, '文件夹不存在'];
    return [true, ''];
  }

  getHash(buffer: Buffer) {
    return sha256(buffer);
  }

  handlerFormat(mimetype: string): FileFormat[keyof FileFormat] {
    const image = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp', 'image/svg+xml', 'image/x-icon', 'image/vnd.microsoft.icon', 'image/x-ms-bmp'];
    if (image.includes(mimetype)) return FileFormat.Image;
    const video = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/x-ms-wmv', 'video/x-matroska', 'video/x-flv', 'video/ogg', 'video/webm'];
    if (video.includes(mimetype)) return FileFormat.Video;
    const audio = ['audio/mpeg', 'audio/x-wav', 'audio/x-ms-wma', 'audio/x-ms-wax', 'audio/x-flac', 'audio/x-aac', 'audio/x-aiff', 'audio/x-midi'];
    if (audio.includes(mimetype)) return FileFormat.Audio;
    const zip = ['application/zip', 'application/x-tar', 'application/rar', 'application/7z', 'application/x-zip-compressed', 'application/x-rar-compressed', 'application/x-7z-compressed'];
    if (zip.includes(mimetype)) return FileFormat.Zip;
    const word = ['application/msword'];
    if (word.includes(mimetype)) return FileFormat.Word;
    return FileFormat.Other;
  }

  createInfo(uid: string, file: Express.Multer.File) {
    const info = new Files();
    info.uid = uid;
    info.size = file.size;
    info.mimetype = file.mimetype;
    info.name = ranString(20);
    info.hash = this.getHash(file.buffer);
    info.original_name = file.originalname;
    info.format = this.handlerFormat(file.mimetype) as string;
    info.ext = '.' + file.originalname.split('.').pop();
    return info;
  }

  identify(file: string) {
    return new Promise<Features>((resolve, reject) => {
      identify(file, (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    });
  }

  async createFile(uid: string, file: Express.Multer.File, isAvatar: boolean): Promise<Files | null> {
    const fileInfo = this.createInfo(uid, file);
    const fileName = fileInfo.name + fileInfo.ext;
    fileInfo.tags = isAvatar ? 'avatar' : 'files';
    const dirPath = path.resolve(this.dirPath, uid, isAvatar ? 'avatar' : fileInfo.format);
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
    const filePath = [dirPath, fileName].join(path.sep);
    fileInfo.path = filePath.slice(this.dirPath.length);
    fs.writeFileSync(filePath, file.buffer);
    //
    try {
      if (fileInfo.format === 'image') {
        const info = await this.identify(filePath);
        fileInfo.height = info.height;
        fileInfo.width = info.width;
      }
      return fileInfo;
    } catch (e) {
      fs.rmSync(filePath);
      return null;
    }
  }

  removeFile(filePath: string) {
    fs.rmSync(this.dirPath + filePath);
  }

  handlerFileInfo(file: Files) {
    const info = reWriteObj(file, ['id', 'size', 'name', 'ext', 'width', 'height']);
    info['fileName'] = [file.name, file.ext].join('');
    return info;
  }
}
