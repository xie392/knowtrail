import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Inject } from '@nestjs/common'
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

    @Get('query/:id')
    @ApiOperation({ summary: '查询公开文档' })
    @ApiResult(DocEntity)
    @AllowAnon()
    findOne(@Param('id') id: string) {
        return this.docService.findOne(id)
    }

    @Post('query/:id')
    @ApiOperation({ summary: '查询私有文档' })
    @ApiResult(DocEntity)
    @AllowAnon()
    findOneByPrivate(@Body('password') password: string, @Param('id') id: string) {
        return this.docService.findOne(id, password)
    }

    @Post('create')
    @ApiOperation({ summary: '创建文档' })
    @ApiBody({ type: CreateDocDto })
    @AllowAnon()
    create(@Body() dto: CreateDocDto, @Req() req) {
        // return '11'
        return this.docService.create(dto, req.headers.authorization)
    } 

    // @Get('update/:id')
    // @ApiOperation({ summary: '更新文档' })
    // @ApiBody({ type: UpdateDocDto })
    // @AllowAnon()
    // update(@Param('id') id: string, @Body() updateDocDto: UpdateDocDto) {
    //     return this.docService.update(id, updateDocDto)
    // }
}
