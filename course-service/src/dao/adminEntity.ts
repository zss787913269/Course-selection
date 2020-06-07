import { Entity, PrimaryGeneratedColumn, Column,BaseEntity } from "typeorm";

@Entity()
export class adminEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    // 账号
    account: number;
    
    @Column()
    //密码
    password:string;



}