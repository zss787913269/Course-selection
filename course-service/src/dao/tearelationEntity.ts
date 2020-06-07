
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity()
export class tearelationEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    // 课程编号
    courseNo: number;

    @Column()
    // 老师id
    teacherNo:number;
    
    
}