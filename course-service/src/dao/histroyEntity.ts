import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity()
export class histroyEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    studentNo:number;

    @Column()
    courseNo:number;
    
}