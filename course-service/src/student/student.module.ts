import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {studentEntity} from '../dao/studentEntity'
import {teacherEntity} from '../dao/teacherEntity'
import {adminEntity} from '../dao/adminEntity';
import {courseTypeEntity} from '../dao/courseTypeEntity';
import {courseEntity} from '../dao/courseEntity';
import {correlationEntity} from '../dao/correlationEntity'
import {likeEntity} from '../dao/likeEntity'

@Module({
  imports:[TypeOrmModule.forFeature([studentEntity,teacherEntity,adminEntity,courseTypeEntity,courseEntity,correlationEntity,likeEntity])],
  controllers: [StudentController],
  providers: [StudentService]
})
export class StudentModule {}
