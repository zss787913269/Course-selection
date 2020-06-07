import { Entity, PrimaryGeneratedColumn, Column,BaseEntity } from "typeorm";

@Entity()
export class correlationEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    // 课程编号
    courseNo: number;

    @Column()
    // 学生id
    studentNo: number;
 
}