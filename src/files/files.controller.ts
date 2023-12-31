import { Pagination, PaginationParams, PaginationRequest } from '@libs/pagination';
import { Controller, Get, Param, Query, Req, Res } from '@nestjs/common';
import { FilesListDto, FilesPreviewDto } from './dto/index.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ManualHttpException } from '@libs/error';
import { FilesService } from './files.service';
import { IsAdmin } from '@libs/jwtAuth';
import { Response } from 'express';
import { Files } from '@mysql';

@Controller('files')
@ApiTags('files 文件')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get('avatar/:uid?')
  @ApiOperation({ summary: '用户头像' })
  async Avatar(@Req() req: Request, @Param('uid') uid: string, @Query() query: FilesPreviewDto, @Res() res: Response) {
    uid = uid || req['user'].uid;
    const fileInfo = await Files.getInfoKeys({ uid, pid: 0, tags: 'avatar' });
    if (!fileInfo) return ManualHttpException('未设置头像');
    const [state, data] = this.filesService.getFiles(fileInfo.path);
    if (!state) return ManualHttpException(data);
    res.set({ 'Content-Type': 'image/png', 'Content-Disposition': `attachment; filename="${uid}-avatar.png"` });
    return res.send(await this.filesService.handlerFileBuffer(data, query));
  }

  @Get('list')
  @ApiOperation({ summary: '获取文件列表' })
  async list(@Req() req: Request, @PaginationParams() page: PaginationRequest, @Query() query: FilesListDto) {
    return await this.listUid(req['user'].uid, page, query);
  }

  @IsAdmin()
  @Get('list/:uid')
  @ApiOperation({ summary: '获取文件列表, 管理员。' })
  async listUid(@Param('uid') uid: string, @PaginationParams() page: PaginationRequest, @Query() query: FilesListDto) {
    const handlerList = (list: Files[]) => list.map(this.filesService.handlerFileInfo);
    const { count, list } = await Files.getList(page, { uid, pid: parseInt(query.folder || '0'), tags: 'files' }, handlerList);
    return Pagination.of(page, count, list, query);
  }

  @Get('preview/:id')
  @ApiOperation({ summary: '预览文件' })
  async preview(@Param('id') id: number, @Query() query: FilesPreviewDto, @Res() res: Response) {
    const fileInfo = await Files.getInfoKeys({ id, tags: 'files' });
    if (!fileInfo) return ManualHttpException('数据不存在');
    if (!query.width && !query.height) query.width = '300';
    const fileName = fileInfo.name + fileInfo.ext;
    if (fileInfo.format !== 'image') return ManualHttpException('无法生成预览图');
    //
    const [state, data] = this.filesService.getFiles(fileInfo.path);
    if (!state) return ManualHttpException(data);
    //
    res.set({ 'Content-Type': fileInfo.mimetype, 'Content-Disposition': `attachment; filename="${fileName}"` });
    return res.send(await this.filesService.handlerFileBuffer(data, query));
  }


  @Get('download/:id')
  @ApiOperation({ summary: '下载文件' })
  async download(@Req() req: Request, @Param('id') id: number, @Res() res: Response) {
    const fileInfo = await Files.getInfoKeys({ id, tags: 'files' });
    if (!fileInfo) return ManualHttpException('数据不存在');
    const fileName = fileInfo.name + fileInfo.ext;
    //
    const [state, data] = this.filesService.getFiles(fileInfo.path);
    if (!state) return ManualHttpException(data);
    //
    const end = req.headers['length'] ? parseInt(req.headers['length']) : null;
    const start = req.headers['range'] ? parseInt(req.headers['range']) : null;
    res.set({
      'Content-Disposition': `attachment; filename="${fileName}"`,
      'Content-Type': start || end ? 'application/octet-stream' : fileInfo.mimetype,
    });
    return start || end ? res.send((data as Buffer).slice(start, start + end)) : res.send(data);
  }
}
