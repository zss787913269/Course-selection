import { Entity, PrimaryGeneratedColumn, Column,BaseEntity } from "typeorm";

@Entity()
export class courseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    // 课程编号
    courseNo: number;

    @Column()
    // 课程名称
    courseName: string;

    @Column()
    // 授课老师
    courseTeacher: string;

    @Column()
    // 学分
    credit:number;

    @Column()
    // 人数
    stuNum:number;

    @Column()
    // 上课时间
    courseTime:string;

    @Column()
    // 开课学院
    courseCollege:string;

    @Column()
    // 课程地点
    address:string;

    @Column()
    //课程分类Id
    typeID:number;

    @Column()
    // 图片地址
    icon:string;

    @Column()
    //课程描述
    courseInfo:string;

    @Column()
    //授课老师的id
    courseTeacherId:number;

    @Column()
    // 已经参加的学生人数
    stuNo:string;

}