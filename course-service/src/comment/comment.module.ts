import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { commentEntity } from '../dao/commentEntity'
import {teacherEntity} from '../dao/teacherEntity'
import {studentEntity} from '../dao/studentEntity'



@Module({
  imports:[TypeOrmModule.forFeature([commentEntity,teacherEntity,studentEntity])],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule {}
