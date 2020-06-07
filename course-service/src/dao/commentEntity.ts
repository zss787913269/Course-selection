import { Entity, PrimaryGeneratedColumn, Column,BaseEntity } from "typeorm";

@Entity()
export class commentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    // 评论内容
    msg: string;

    @Column()
    // 学生id
    studentNo: number;

  
    @Column()
    // 评论时间
    createTime:string;

    @Column()
    // 课程id 属于哪个课程的评论
    courseNo:number;
 
}