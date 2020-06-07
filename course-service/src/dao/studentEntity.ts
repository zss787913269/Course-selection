import { Entity, PrimaryGeneratedColumn, Column,BaseEntity } from "typeorm";

@Entity()
export class studentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    // 学号
    account: number;

    @Column()
    // 学生姓名
    studetName: string;

    @Column()
    // 学生性别
    gender: string;

    @Column()
    // 学生年龄
    age:number;

    @Column()
    // 学生班级
    studentClass:string;
  
    @Column()
    // 学生所在院系
    college:string;

    @Column()
    //学生所在大学
    university:string

    @Column()
    //学生密码
    password:string

    @Column()
    // 学生头像
    icon:string;

}