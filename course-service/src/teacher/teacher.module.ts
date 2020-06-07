import { Module } from '@nestjs/common';
import {TeacherService} from './teacher.service'
import {TeacherController} from './teacher.controller'
import { TypeOrmModule } from '@nestjs/typeorm';
import {teacherEntity} from '../dao/teacherEntity'
import {courseEntity} from '../dao/courseEntity'
import {tearelationEntity} from '../dao/tearelationEntity'
import {correlationEntity} from '../dao/correlationEntity'
import {studentEntity} from '../dao/studentEntity'

@Module({
    imports:[TypeOrmModule.forFeature([teacherEntity,courseEntity,tearelationEntity,correlationEntity,studentEntity])],
    controllers:[TeacherController],
    providers:[TeacherService]
})
export class TeacherModule {}
