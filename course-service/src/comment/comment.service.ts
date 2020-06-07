import { Injectable, Body } from '@nestjs/common';

import { teacherEntity } from '../dao/teacherEntity';
import { commentEntity } from '../dao/commentEntity'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { studentEntity } from '../dao/studentEntity'

@Injectable()
export class CommentService {
    constructor(
       
        @InjectRepository(teacherEntity)
        private readonly teacherRepository: Repository<teacherEntity>,

         @InjectRepository(commentEntity)
        private readonly commentRepository: Repository<commentEntity>,

        @InjectRepository(studentEntity)
        private readonly studentRepository: Repository<studentEntity>,
        
      ) {}


    //  发表评论
    async publishComment(body){
        
        let comments = new commentEntity

        comments.msg = body.msg  //评论内容
        comments.studentNo = body.studentNo //学生id
        comments.createTime = body.createTime // 发表时间
        comments.courseNo = body.courseNo  //课程id

        await this.commentRepository.save(comments)

        return {
            code:200,
            data:comments
        }

    }
    // 删除评论,老师可以删除评论？
    async deleteComment(body){
        await this.commentRepository.delete({id:body.id})
        return {
            code:"200",
            data:"删除成功"
        }
    }
 // 获取某个课程下的所有评论
    async getCourseCommentBy(body){

        let msg =  await this.commentRepository.find({courseNo:body.courseNo})
        let arr = []
            for(var i = 0; i< msg.length;i++) {
                let list = await this.studentRepository.find({id: msg[i].studentNo})
                arr.unshift({studentMsg:list[0],commentMsg:msg[i]})
            }
            
        //    console.log( arr.sort((a,b)=>b-a));

        return {
            code:200,
            data:arr
        }
    }

   
}
