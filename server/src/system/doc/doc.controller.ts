import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Req,
    Inject,
    UseGuards,
    Query
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger'

import { DocService } from './doc.service'
import { CreateDocDto } from './dto/create-doc.dto'
import { UpdateDocDto } from './dto/update-doc.dto'

import { ApiResult } from '../../common/decorators/api-result.decorator'
import { AllowAnon } from '../../common/decorators/allow-anon.decorator'
import { DocEntity } from './entities/doc.entity'

@ApiTags('文档相关')
@Controller('doc')
export class DocController {
    constructor(private readonly docService: DocService) {}

    @Post('')
    @ApiOperation({ summary: '创建文档' })
    @ApiBody({ type: CreateDocDto })
    async create(@Body() dto: CreateDocDto, @Req() req) {
        return await this.docService.create(dto, req.user)
    }

    @Get(':id')
    @ApiOperation({ summary: '查询文档' })
    @ApiResult(DocEntity)
    @AllowAnon()
    async findOneById(@Param('id') id: string, @Query('password') password?: string) {
        return await this.docService.findOne(id, password)
    }

    @Patch(':id')
    @ApiOperation({ summary: '更新文档' })
    @ApiBody({ type: UpdateDocDto })
    async update(@Param('id') id: string, @Body() dto: UpdateDocDto, @Req() req) {
        return await this.docService.update(id, dto, req.user)
    }

    @Delete(':id')
    @ApiOperation({ summary: '删除文档' })
    async remove(@Param('id') id: string, @Req() req) {
        return await this.docService.remove(id, req.user)
    }

    @Get('')
    @ApiOperation({ summary: '查询文档列表' })
    @ApiResult(DocEntity)
    @AllowAnon()
    async findAll(@Query('page') page: number, @Query('limit') limit: number) {
        return await this.docService.findAll(page, limit)
    }

    @Get('search/doc')
    @ApiOperation({ summary: '模糊查询文档' })
    @ApiResult(DocEntity)
    @AllowAnon()
    async search(
        @Query('keyword') keyword: string,
        @Query('page') page: number,
        @Query('limit') limit: number
    ) {
        return await this.docService.search(keyword, page, limit)
    }

    @Get('search/recommend')
    @ApiOperation({ summary: '推荐查询文档' })
    @ApiResult(DocEntity)
    @AllowAnon()
    async recommend(@Query('page') page: number, @Query('limit') limit: number) {
        return await this.docService.recommend(page, limit)
    }

    @Get('search/me')
    @ApiOperation({ summary: '查询我的文档' })
    @ApiResult(DocEntity)
    async searchMyDoc(
        @Req() req,
        @Query('keyword') keyword: string,
        @Query('page') page: number,
        @Query('limit') limit: number
    ) {
        return await this.docService.searchMyDoc(keyword, req.user, page, limit)
    }

    @Get('doc/last')
    @ApiOperation({ summary: '查询最新文档列表' })
    @ApiResult(DocEntity)
    async getLastDocList(@Req() req) {
        return await this.docService.getLastDocList(req)
    }
}
