import { FolderCreateDto, FolderDeleteDto, FolderGroupDto } from './dto/index.dto';
import { Pagination, PaginationParams, PaginationRequest } from '@libs/pagination';
import { Body, Controller, Delete, Get, Post, Query, Req } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Files, FilesFolder, Users } from '@mysql';
import { ManualHttpException } from '@libs/error';
import { FolderService } from './folder.service';
import { reWriteDiffObj } from '@utils/object';
import { IsAdmin } from '@libs/jwtAuth';
import { In } from 'typeorm';

@Controller('folder')
@ApiTags('folder 文件夹')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @Post()
  @ApiOperation({ summary: '创建文件夹' })
  async create(@Req() req: Request, @Body() body: FolderCreateDto) {
    const uid = req['user'].uid;
    let parent: FilesFolder;
    //
    const where: any = { uid, name: body.name };
    if (body.parent) where.pid = body.parent;
    if (await FilesFolder.countBy(where)) return ManualHttpException('文件夹已存在');
    //
    const info = this.folderService.createFolder(req['user'].uid, body);
    if (body.parent) {
      parent = await FilesFolder.getInfoKeys({ uid, id: body.parent });
      if (!parent) return ManualHttpException('父级文件夹不存在');
      info.pid = body.parent;
      info.parent = parent;
    }
    return this.folderService.handlerFolder(await FilesFolder.save(info));
  }

  @Delete()
  @ApiOperation({ summary: '删除文件夹' })
  async delete(@Req() req: Request, @Body() body: FolderDeleteDto) {
    const uid = req['user'].uid;
    if (!(await FilesFolder.getInfoKeys({ uid, id: body.id }))) return ManualHttpException('文件夹不存在');
    const isChild = await this.folderService.isFolder(body.id);
    if (!body.deleteChild && isChild) return ManualHttpException('文件夹下有子文件夹，无法删除');
    const folderIds = (await this.folderService.getChildFolder(body.id)).map((item) => item.id);
    const isFiles = await this.folderService.isFiles(folderIds);
    if (!body.deleteContent && isFiles) return ManualHttpException('文件夹内存在文件，无法删除');
    //
    if (body.deleteContent) {
      await Files.delete({ pid: In(folderIds) });
    } else {
      await Files.update({ pid: In(folderIds) }, { pid: 0 });
    }
    return (await FilesFolder.delete({ id: In(folderIds) })).affected;
  }

  @Get('tree')
  @ApiOperation({ summary: '文件夹列表' })
  async tree(@Req() req: Request) {
    const list = await FilesFolder.getKeys({ uid: req['user'].uid });
    return list.map(this.folderService.handlerFolder);
  }

  @IsAdmin()
  @Get('group')
  @ApiOperation({ summary: '文件夹列表' })
  async list(@PaginationParams() page: PaginationRequest, @Query() query: FolderGroupDto) {
    if (query.uid) return await FilesFolder.getKeys({ uid: query.uid });
    const listMap = await FilesFolder.createQueryBuilder('folder').select('uid').groupBy('uid').getRawMany();
    const { count, list } = await Users.getList(page, { uid: In(listMap.map(v => v.uid)) });
    return Pagination.of(page, count, list.map(item => reWriteDiffObj(item, ['pass', 'update_time', 'role'])), {});
  }
}
