import { ApiProperty } from '@nestjs/swagger'

export interface Author {
    id: string
    name: string
    avatar: string
    is_focused: boolean
}

export class FindDocDto {
    @ApiProperty({ description: '文档 id' })
    id: string

    @ApiProperty({ description: '文档标题' })
    title: string

    @ApiProperty({ description: '文档封面' })
    cover: string

    @ApiProperty({ description: '文档创建时间' })
    create_time: Date

    @ApiProperty({ description: '文档更新时间' })
    update_time: Date

    @ApiProperty({ description: '文档内容' })
    content: string

    @ApiProperty({ description: '文档分类 id' })
    category_id: string

    @ApiProperty({ description: '是否为私密' })
    is_private: boolean

    @ApiProperty({ description: '是否为收藏' })
    is_starred: boolean

    @ApiProperty({ description: '是否为点赞' })
    is_liked: boolean

    @ApiProperty({ description: '作者信息' })
    author: Author
}
