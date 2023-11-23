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

    @Post('create')
    @ApiOperation({ summary: '创建文档' })
    @ApiBody({ type: CreateDocDto })
    create(@Body() dto: CreateDocDto, @Req() req) {
        return this.docService.create(dto, req.user)
    }

    @Get(':id')
    @ApiOperation({ summary: '查询文档' })
    @ApiResult(DocEntity)
    @AllowAnon()
    findOneById(@Param('id') id: string, @Query('password') password?: string) {
        return this.docService.findOne(id, password)
    }

    @Patch(':id')
    @ApiOperation({ summary: '更新文档' })
    @ApiBody({ type: UpdateDocDto })
    update(@Param('id') id: string, @Body() dto: UpdateDocDto, @Req() req) {
        return this.docService.update(id, dto, req.user)
    }

    @Delete(':id')
    @ApiOperation({ summary: '删除文档' })
    remove(@Param('id') id: string, @Req() req) {
        return this.docService.remove(id, req.user)
    }

    @Get('list')
    @ApiOperation({ summary: '查询文档列表' })
    @ApiResult(DocEntity)
    @AllowAnon()
    findAll(@Query('page') page: number, @Query('limit') limit: number) {
        return this.docService.findAll(page, limit)
    }

    @Get('search')
    @ApiOperation({ summary: '模糊查询文档' })
    @ApiResult(DocEntity)
    @AllowAnon()
    search(@Query('keyword') keyword: string, @Query('page') page: number, @Query('limit') limit: number) {
        return this.docService.search(keyword, page, limit)
    }
}
