import { Entity, PrimaryGeneratedColumn, Column,BaseEntity } from "typeorm";

@Entity()
export class noticeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    // 标题
    title: string;
    
    @Column()
    //内容
    msg:string;
    
    @Column()
    // 发布者id
    uid:number;

    @Column()
    // 发布者名字
    createName:string;

    @Column()
    // 类型
    type:string;

    @Column()
    // 时间
    createTime:string;

    @Column()
    // 是否选择
    isSelected:string;



}