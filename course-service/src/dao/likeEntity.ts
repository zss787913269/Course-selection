import { Entity, PrimaryGeneratedColumn, Column,BaseEntity } from "typeorm";

@Entity()
export class likeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    // 课程编号
    courseNo: number;

    @Column()
    // 学生学号
    studentNo: number;
 
}