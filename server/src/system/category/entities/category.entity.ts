import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToOne,
    JoinColumn
} from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'
import { DocEntity } from '../../doc/entities/doc.entity'
import { UserEntity } from '../../users/entities/user.entity'

@Entity('sys_category')
export class CategoryEntity {
    @ApiProperty({ type: String, description: '知识库 id' })
    @PrimaryGeneratedColumn({ type: 'bigint' })
    public id: string

    @ApiProperty({ type: String, description: '知识库标题' })
    @Column({ type: 'varchar', comment: '知识库标题' })
    public title: string

    @ApiProperty({ type: String, description: '封面' })
    @Column({ type: 'varchar', comment: '封面', default: null })
    public cover: string

    @ApiProperty({ type: String, description: '简介' })
    @Column({ type: 'varchar', comment: '简介', default: null })
    public description: string

    @ApiProperty({ type: String, description: '状态 1 正常 0 私有 2需要密码' })
    @Column({ type: 'int', comment: '状态 1 正常  0 私有 2需要密码', default: 0 })
    public status: number

    @ApiProperty({ type: String, description: '知识库密码，私有时可能需要' })
    @Exclude({ toPlainOnly: true })
    @Column({ type: 'varchar', comment: '知识库密码，私有时可能需要', default: null })
    public password: string

    @ApiProperty({ type: Date, description: '创建时间' })
    @CreateDateColumn({ type: 'timestamp', name: 'create_time', comment: '创建时间' })
    public create_time: Date

    @ApiProperty({ type: Date, description: '更新时间' })
    @UpdateDateColumn({ type: 'timestamp', name: 'update_time', comment: '更新时间' })
    public update_time: Date

    @ApiProperty({ type: String, description: '作者 id' })
    @Column({ type: 'varchar', comment: '作者 id' })
    public user_id: string

    @ApiProperty({ type: Number, description: '收藏数' })
    @Column({ type: 'int', default: 0, comment: '收藏数' })
    public started_count: number

    @ApiProperty({ type: Number, description: '是否默认知识库' })
    @Column({ type: 'int', default: 0, comment: '是否默认知识库' })
    public default: number

    @ApiProperty({ type: Number, description: '是否隐藏' })
    @Column({ type: 'int', default: 1, comment: '是否隐藏' })
    @Exclude({ toPlainOnly: true })
    public hidden: number

    @ApiProperty({ type: String, description: '协作者 id' })
    @Column({ type: 'varchar', comment: '协作者 id', default: '' })
    public coauthor_id: string

    @ApiProperty({ type: String, description: '作者' })
    @ManyToOne(() => UserEntity, (dto) => dto.category)
    @JoinColumn({ name: 'user_id' })
    public user: UserEntity

    @ApiProperty({ type: String, description: '文档列表' })
    @OneToMany(() => DocEntity, (doc) => doc.category)
    doc: DocEntity[]
}
