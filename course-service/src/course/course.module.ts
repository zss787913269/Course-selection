import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {courseEntity} from '../dao/courseEntity'




@Module({
  imports:[TypeOrmModule.forFeature([courseEntity])],
  controllers: [CourseController],
  providers:[CourseService]
})
export class CourseModule {}



