import { Entity, PrimaryGeneratedColumn, Column,BaseEntity } from "typeorm";

@Entity()
export class opEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    // 反馈内容
    msg: string;

    @Column()
    // 反馈人的联系方式
    phone:string;

    
    @Column()
    // 反馈时间
    createTime:string;

 
 
}