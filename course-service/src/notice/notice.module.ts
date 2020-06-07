import { Module } from '@nestjs/common';
import { NoticeController } from './notice.controller';
import { NoticeService } from './notice.service';
import { noticeEntity } from '../dao/noticeEntity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { teacherEntity } from '../dao/teacherEntity'
import {correlationEntity } from '../dao/correlationEntity'
import { courseEntity } from '../dao/courseEntity'

@Module({
  imports:[TypeOrmModule.forFeature([noticeEntity,teacherEntity,correlationEntity,courseEntity])],
  controllers: [NoticeController],
  providers: [NoticeService]
})
export class NoticeModule {}
