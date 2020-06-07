import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity
} from "typeorm";

@Entity()
export class teacherEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    // 教师账号
    account: number;

    @Column()
    // 教师名字
    teacherName: string;

    @Column()
    // 教师性别
    gender: string;

    @Column()
    // 教师职称
    professor: string;

    @Column()
    // 所属学院
    college: string;

    @Column()
    //头像
    authorUrl: string;

    @Column()
    //老师密码
    password: string;



}