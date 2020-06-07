import { Injectable } from '@nestjs/common';
import { teacherEntity } from '../dao/teacherEntity'
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {courseEntity} from '../dao/courseEntity'
import {correlationEntity} from '../dao/correlationEntity'
import {studentEntity} from '../dao/studentEntity'



@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(teacherEntity)
    private readonly teacherRepository: Repository<teacherEntity>,

    @InjectRepository(courseEntity)
        private readonly courseRepository: Repository<courseEntity>,

  @InjectRepository(correlationEntity)
        private readonly correlationRepository: Repository<correlationEntity>,

  @InjectRepository(studentEntity)
        private readonly studentepository: Repository<studentEntity>,
  ) { }

  // 老师发布课程
  async teacherAddCourse(body){

      let courseMsg = new courseEntity

      // 根据id找老师

      let teacherName = await (await this.teacherRepository.findOne({id:body.courseTeacherId})).teacherName

      courseMsg.courseNo = this.getTime() //课程编号 根据时间毫秒来生成
      courseMsg.courseName = body.name //课程名字
      courseMsg.courseTeacherId = body.courseTeacherId //授课老师id
      courseMsg.courseTeacher = teacherName //授课老师名字
      courseMsg.credit = body.credit //课程学分
      courseMsg.courseCollege = body.college //开课学院
      courseMsg.address = body.address //上课地址
      courseMsg.typeID = body.typeId // 课程类型
      courseMsg.icon = body.imgpath //课程图片
      courseMsg.courseTime = body.time //上课时间
      courseMsg.courseInfo = body.info //课程详情
      courseMsg.stuNum = body.stuNum //规定人数
      courseMsg.stuNo = "0";

      console.log("课程人数为---"+courseMsg.stuNum)

      await this.courseRepository.save(courseMsg)
      return {
        code:200,
        msg:"发布成功"
      }
  }

  getTime(){

    let time = new Date()

    let y = time.getFullYear();
    let m = time.getMonth();
    let d = time.getDate()
    let s = time.getMilliseconds();
    
    return Number(y+""+m+""+d+""+s)

  }

  // 老师课程列表
  async teacherCourseList(body){

    
      let msg = await this.courseRepository.find({courseTeacherId:body.id})

      if(msg.length == 0){
        return {
          code:401
        }
      }else{
        return {msg,code:200}
      }

    

    }
  //  获取该课程下的学生人数
  async getStudentNum(body){

  
    // 传递一个课程的id下来
    let list = await this.correlationRepository.find({courseNo:body.id})

    let studentMsg  = []
    for(let i in list){
       studentMsg.push(await this.studentepository.findOne({id:list[i].studentNo}))
    }

   

    return {
        length:studentMsg.length
    }


  }

  // 老师查看某个课程下的所有学生
  async coureseByStudent(body){

    // 传递一个课程的id下来
    let list = await this.correlationRepository.find({courseNo:body.id})

    let studentMsg  = []
    for(let i in list){
       studentMsg.push(await this.studentepository.findOne({id:list[i].studentNo}))
    }



    return {
        data:studentMsg,
        count:studentMsg.length
    }

  }

  // 老师删除课程
  async teacherRemoveCourse(body){

    let msg = await this.courseRepository.delete({id:body.courseNo})

    return {
      code:200,
      msg:"删除成功"
    } 
  }

  // 老师编辑课程

  async teacherEditCourse(body){
    
    console.log(body)
      let msg = await this.courseRepository.update(body.id,body)

      return {
        code:200,
        msg:"编辑成功"
      }  

  }

  // 老师发布公告
  async teachernotice(body){

    let teacherName = await (await this.teacherRepository.findOne({id:body.id})).teacherName
      
    return {
      data:{
        name:teacherName,
        notice:"2020年1月21号放假，请各位同学注意安全。2月1号收假，请大家准时回学校",
        time:"2020 1月13 日"
      }
      
    }
  }

  // 所有老师的课程

  async allTeacherCourse(){
    
    let msg = await this.courseRepository.find()

    if(msg.length == 0){
      return {
        code:401
      }
    }else{
      return {msg,code:200}
    }
  }
}
