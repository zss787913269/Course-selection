import { Entity, PrimaryGeneratedColumn, Column,BaseEntity } from "typeorm";

@Entity()
export class courseTypeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    //类型名字，根据名字来分
    name:string;



}