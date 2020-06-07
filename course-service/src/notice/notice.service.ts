import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { noticeEntity } from '../dao/noticeEntity';
import { teacherEntity } from '../dao/teacherEntity';
import {correlationEntity } from '../dao/correlationEntity'
import { courseEntity } from '../dao/courseEntity'



@Injectable()
export class NoticeService {
    constructor(
        @InjectRepository(noticeEntity)
        private readonly noticeRepository: Repository<noticeEntity>,
        
        @InjectRepository(teacherEntity)
        private readonly teacherRepository: Repository<teacherEntity>,
        
          @InjectRepository(correlationEntity)
        private readonly correlationRepository: Repository<correlationEntity>,

         @InjectRepository(courseEntity)
        private readonly courseRepository: Repository<courseEntity>,
        
      ) {}



    //   老师发布公告
      async teacherNotice(body){
        console.log(body);
        // 根据id找老师到老师名字
        let Name = await (await this.teacherRepository.findOne({id:body.uid})).teacherName
        

        let noticeMsg = new noticeEntity
        noticeMsg.createTime = body.createTime
        noticeMsg.msg = body.msg
        noticeMsg.uid = body.uid
        noticeMsg.title = body.title
        noticeMsg.createName = Name
        noticeMsg.type = body.type
        noticeMsg.isSelected = "false"
        await this.noticeRepository.save(noticeMsg)

        return {
          code:200,
          data:noticeMsg
        }
        
      }

    // 学生查看所有公告 
    async findNoticeAll(){
        let msg = await this.noticeRepository.find()

        return {
            code:200,
            data:msg
        }
    }

    //学生查看已经加入课程的老师的公告
    async findMyTeacherNotice(body){

  
      // 找出关联表 
            let msg = await this.correlationRepository.find({studentNo:body.id})
            let arr = []
            // 找出学生下面的对应课程
            for(let i in msg ){
              let course = await this.courseRepository.findOne({id:msg[i].courseNo})
              arr.push(course)
            }

            if(arr.length == 0){
              return {
                code:200,
                data:[]
              }
            }else{
              let cid = []
              for(let i of arr){
                cid.push(i.courseTeacherId)  
              }
              let qc = [...new Set(cid)].toString()
             let sql = `SELECT * FROM notice_entity WHERE uid in(${qc})`
             let res = await this.noticeRepository.query(sql)

             console.log("通知")

             console.log(res);

              return {
                code:200,
                data:res
              }
            }
            
          
          
      

    }

    // 老师查看自己发布的公告
    async findNoticesByTeacher(body){
        
      
        let msg = await this.noticeRepository.find({uid:body.uid});

        return {
            code:200,
            data:msg
        }
    }

    // 老师删除公告
    async deletcNotice(body){

      console.log(body.id);
      let str = body.id
        let sql = `DELETE  FROM notice_entity WHERE id in(${str})`
        await this.noticeRepository.query(sql)

        return {
            code:200,
            msg:"删除成功"
        }
    }

    // 老师修改公告
    async updateNootice(body){
        
        await this.noticeRepository.update(body.id,body)

            return {
            code:200,
            msg:"修改成功"
            }  
    }

    // 查看详细公告
    async getNoticeById(body){


      let res = await this.noticeRepository.find({id:body.id})

      return {
        code:200,
        data:res
      }
      
    }


}
