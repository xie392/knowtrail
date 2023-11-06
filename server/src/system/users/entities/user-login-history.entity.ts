import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

@Entity('sys_user_login_history')
export class UserLoginHistoryEntity {
    @ApiProperty({ type: String, description: 'id' })
    @PrimaryGeneratedColumn({ type: 'bigint' })
    public id: string

    @ApiProperty({ type: String, description: '用户ID' })
    @Column({ type: 'bigint', nullable: false, comment: '用户ID' })
    public userId: string

    @ApiProperty({ type: Date, description: '登录时间' })
    @CreateDateColumn({ type: 'timestamp', name: 'login_time', comment: '登录时间' })
    public loginTime: Date

    @ApiProperty({ type: String, description: '登录IP地址' })
    @Column({ type: 'varchar', length: 15, nullable: false, comment: '登录IP地址' })
    public ipAddress: string

    @ApiProperty({ type: String, description: '登录设备' })
    @Column({ type: 'varchar', length: 50, nullable: true, comment: '登录设备' })
    public device: string

    @ApiProperty({ type: String, description: '操作系统' })
    @Column({ type: 'varchar', length: 50, nullable: true, comment: '操作系统' })
    public operatingSystem: string

    @ApiProperty({ type: String, description: '浏览器' })
    @Column({ type: 'varchar', length: 50, nullable: true, comment: '浏览器' })
    public browser: string

    @ApiProperty({ type: String, description: '登录状态' })
    @Column({ type: 'varchar', length: 20, nullable: false, comment: '登录状态' })
    public loginStatus: string

    @ApiProperty({ type: String, description: '登录方式' })
    @Column({ type: 'varchar', length: 50, nullable: true, comment: '登录方式' })
    public loginMethod: string

    @ApiProperty({ type: String, description: '设备唯一标识符' })
    @Column({ type: 'varchar', length: 100, nullable: true, comment: '设备唯一标识符' })
    public deviceID: string
}
