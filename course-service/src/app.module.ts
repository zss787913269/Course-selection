import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';
import { CourseModule } from './course/course.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import {courseEntity} from './dao/courseEntity';
import {studentEntity} from './dao/studentEntity';
import {teacherEntity} from './dao/teacherEntity';
import {adminEntity} from './dao/adminEntity';
import {correlationEntity} from './dao/correlationEntity'
import {courseTypeEntity} from './dao/courseTypeEntity'
import {likeEntity} from './dao/likeEntity'
import {tearelationEntity} from './dao/tearelationEntity'
import { NoticeModule } from './notice/notice.module';
import { noticeEntity } from './dao/noticeEntity'
import { CommentModule } from './comment/comment.module';
import { commentEntity } from './dao/commentEntity'
import { HistroyModule } from './histroy/histroy.module';
import { histroyEntity } from './dao/histroyEntity'
import { opEntity } from './dao/opEntity'


@Module({
  imports: [TypeOrmModule.forRoot({
    type:'mysql',
    port:3306,
    username:'root',
    host:'127.0.0.1',
    password:'530802',
    database:'hzxy_course',
    entities:[studentEntity,teacherEntity,courseEntity,correlationEntity,adminEntity,courseTypeEntity,likeEntity,tearelationEntity,noticeEntity,commentEntity,histroyEntity,opEntity],
    synchronize:true
  }),StudentModule,TeacherModule,CourseModule, NoticeModule, CommentModule, HistroyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection:Connection){}
}
