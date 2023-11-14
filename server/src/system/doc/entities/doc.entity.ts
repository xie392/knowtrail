import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'

import { UserEntity } from 'src/system/users/entities/user.entity'
import { CategoryEntity } from 'src/system/category/entities/category.entity'

@Entity('sys_doc')
export class DocEntity {
    @ApiProperty({ type: String, description: 'id' })
    @PrimaryGeneratedColumn({ type: 'bigint' })
    public id: string

    @ApiProperty({ type: String, description: '文档标题' })
    @Column({ type: 'varchar', comment: '文档标题' })
    public title: string

    @ApiProperty({ type: String, description: '封面' })
    @Column({ type: 'varchar', default: null, comment: '封面' })
    public cover: string

    @ApiProperty({ type: String, description: '状态 1 正常 0 私有 2需要密码' })
    @Column({ type: 'int', comment: '状态 1 正常 0 私有 2需要密码', default: 1 })
    public status: number

    @ApiProperty({ type: String, description: '文档密码，私有时可能需要' })
    @Exclude({ toPlainOnly: true })
    @Column({ type: 'varchar', comment: '文档密码，私有时可能需要', default: null })
    public password: string

    @ApiProperty({ type: Date, description: '创建时间' })
    @CreateDateColumn({ type: 'timestamp', name: 'create_time', comment: '创建时间' })
    public create_time: Date

    @ApiProperty({ type: Date, description: '更新时间' })
    @UpdateDateColumn({ type: 'timestamp', name: 'update_time', comment: '更新时间' })
    public update_time: Date

    @ApiProperty({ type: String, description: '作者 id' })
    @Column({ type: 'varchar', comment: '用户名' })
    public user_id: string

    @ApiProperty({ type: Number, description: '文章内容' })
    @Column({ type: 'varchar', comment: '文章内容' })
    public content: string

    @ApiProperty({ type: String, description: '知识库 id' })
    @Column({ type: 'bigint', comment: '知识库 id' })
    public category_id: string

    @ApiProperty({ type: Number, description: '是否隐藏' })
    @Column({ type: 'int', default: 1, comment: '是否隐藏' })
    public hidden: number

    @ApiProperty({ type: Number, description: '点赞数' })
    @Column({ type: 'int', default: 1, comment: '点赞数' })
    public like_count: number

    @ApiProperty({ type: Number, description: '收藏数' })
    @Column({ type: 'int', default: 1, comment: '收藏数' })
    public started_count: number

    @ApiProperty({ type: Number, description: '文档父级 id' })
    @Column({ type: 'bigint', default: null, comment: '文档父级 id' })
    public p_id: string

    @ApiProperty({ type: String, description: '标签类型' })
    @Column({ type: 'varchar', default: null, comment: '标签类型' })
    public tag_type: string

    @ApiProperty({ type: String, description: '作者' })
    @ManyToOne(() => UserEntity, (dto) => dto.doc)
    @JoinColumn({ name: 'user_id' })
    public user: UserEntity

    @ApiProperty({ type: String, description: '所属知识库' })
    @ManyToOne(() => CategoryEntity, (dto) => dto.doc)
    @JoinColumn({ name: 'category_id' })
    public category: CategoryEntity
}
