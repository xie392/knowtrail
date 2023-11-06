import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'

@Entity('sys_user')
export class UserEntity {
    @ApiProperty({ type: String, description: 'id' })
    @PrimaryGeneratedColumn({ type: 'bigint' })
    public id: string

    @ApiProperty({ type: String, description: '用户邮箱' })
    @Column({ type: 'varchar', comment: '用户邮箱' })
    public email: string

    @ApiProperty({ type: String, description: '用户密码' })
    @Exclude({ toPlainOnly: true }) // 输出屏蔽密码
    @Column({ type: 'varchar', length: 200, nullable: false, comment: '用户密码' })
    public password: string

    @ApiProperty({ type: String, description: '用户头像' })
    @Column({ type: 'varchar', comment: '用户头像' })
    public avatar: string

    @ApiProperty({ type: Date, description: '创建时间' })
    @CreateDateColumn({ type: 'timestamp', name: 'create_time', comment: '创建时间' })
    public create_time: Date

    @ApiProperty({ type: Date, description: '更新时间' })
    @UpdateDateColumn({ type: 'timestamp', name: 'update_time', comment: '更新时间' })
    public update_time: Date

    @ApiProperty({ type: String, description: '用户名' })
    @Column({ type: 'varchar', comment: '用户名' })
    public nick_name: string

    @ApiProperty({ type: Number, description: '存储容量，每个人最大值为 5G，默认为 0' })
    @Column({ type: 'int', default: 0, comment: '存储容量，每个人最大值为 5G，默认为 0' })
    public storage: number

    @ApiProperty({ type: Number, description: 'vip等级，默认0' })
    @Column({ type: 'int', default: 0, comment: 'vip等级，默认0' })
    public vip: number
}
