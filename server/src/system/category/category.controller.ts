import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common'
import { CategoryService } from './category.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ApiResult } from 'src/common/decorators/api-result.decorator'
import { AllowAnon } from 'src/common/decorators/allow-anon.decorator'
import { CategoryEntity } from './entities/category.entity'

@ApiTags('知识库相关')
@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post('create')
    @ApiOperation({ summary: '创建知识库' })
    create(@Body() dto: CreateCategoryDto, @Req() req) {
        return this.categoryService.create(dto, req.user)
    }

    @Get('doc/:id')
    @ApiOperation({ summary: '查询知识库' })
    @ApiResult(CategoryEntity)
    findOneById(@Param('id') id: string, @Req() req, @Query('password') password?: string) {
        return this.categoryService.findOne(id, req.user, password)
    }

    // @Patch('doc/:id')
    // @ApiOperation({ summary: '更新文档' })
    // @ApiBody({ type: UpdateDocDto })
    // update(@Param('id') id: string, @Body() dto: UpdateDocDto, @Req() req) {
    //     return this.categoryService.update(id, dto, req.user)
    // }

    // @Delete('doc/:id')
    // @ApiOperation({ summary: '删除文档' })
    // remove(@Param('id') id: string, @Req() req) {
    //     return this.categoryService.remove(id, req.user)
    // }

    @Get('list')
    @ApiOperation({ summary: '查询所有知识库' })
    @ApiResult(CategoryEntity)
    findAll(@Query() params: { page: number; limit: number }, @Req() req) {
        return this.categoryService.findUserAll(params, req.user)
    }

    // @Get('search')
    // @ApiOperation({ summary: '模糊查询文档' })
    // @ApiResult(DocEntity)
    // @AllowAnon()
    // search(@Query('keyword') keyword: string, @Query('page') page: number, @Query('limit') limit: number) {
    //     return this.categoryService.search(keyword, page, limit)
    // }
}
