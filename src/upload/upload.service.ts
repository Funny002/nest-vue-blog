import { Injectable } from '@nestjs/common';
import { FileFormat, Files } from '@mysql';
import { ranString } from '@utils/string';
import { sha256 } from '@libs/crypto';

@Injectable()
export class UploadService {
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

  createInfo(file: Express.Multer.File) {
    const info = new Files();
    info.size = file.size;
    info.mimetype = file.mimetype;
    info.hash = sha256(file.buffer);
    info.name = ranString(20);
    info.original_name = file.originalname;
    info.format = this.handlerFormat(file.mimetype) as string;
    info.ext = '.' + file.originalname.split('.').pop();
    return info;
  }
}
