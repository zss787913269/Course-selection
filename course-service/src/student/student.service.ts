import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { studentEntity } from '../dao/studentEntity'
import { Repository, Code, AdvancedConsoleLogger } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { teacherEntity } from '../dao/teacherEntity'
import { adminEntity } from '../dao/adminEntity'
import { courseTypeEntity } from '../dao/courseTypeEntity'
import {courseEntity} from '../dao/courseEntity';
import {correlationEntity} from '../dao/correlationEntity';
import {likeEntity} from '../dao/likeEntity';

@Injectable()
export class StudentService {
 
 
  constructor(

    @InjectRepository(studentEntity)
    private readonly studentRepository: Repository<studentEntity>,

    @InjectRepository(adminEntity)
    private readonly adminRepository: Repository<adminEntity>,

    @InjectRepository(courseTypeEntity)
    private readonly typeRepository: Repository<courseTypeEntity>,

    @InjectRepository(courseEntity)
    private readonly courseRepository: Repository<courseEntity>,
    
    @InjectRepository(teacherEntity)
    private readonly teacherRepository: Repository<teacherEntity>,
    
    @InjectRepository(correlationEntity)
    private readonly correlationRepository: Repository<correlationEntity>,

    @InjectRepository(likeEntity)
    private readonly likeEntity: Repository<likeEntity>,
    

   ) { }


    // 修改头像信息

    async editStu(body){

      // console.log(body)
      let msg = await this.studentRepository.update(body.id,body)
      return {
        code:200,
        msg:"编辑成功"
      }  
      
    }




  async login(body) {

    console.log(body);

    let { account, password, role } = body //从body上获取账号密码

    // 从数据库读取账号密码  然后相互匹对

    // 1-->代表学生
    // 2-->代码老师
    // 3-->代表管理员


  function returnMsg(msg) {
      if (msg.account == account && msg.password == password) {
        return {
          code: 200,
          msg: "登录成功"
        }
      } else {
        throw new HttpException('用户编号错误', HttpStatus.BAD_REQUEST);
       
      }
    }



    if (role == 1) {

      let msg = await this.studentRepository.findOne({ account: account })

      if (msg) {
        return {
          id:msg.id,
          data:returnMsg(msg)
        }
      } else {
        throw new HttpException('用户编号错误', HttpStatus.BAD_REQUEST);
      
      }

    } else if (role == 2) {

      let msg = await this.teacherRepository.findOne({ account: account })

      if (msg) {
        return {
          id:msg.id,
          data:returnMsg(msg)
        }
      } else {
        throw new HttpException('用户编号错误', HttpStatus.BAD_REQUEST);
       
      }

    } else if (role == 3) {
      let msg = await this.adminRepository.findOne({ account: account })
      if (msg) {
        return {
          id:msg.id,
          data:returnMsg(msg)
        }
      } else {
        throw new HttpException('用户编号错误', HttpStatus.BAD_REQUEST);
        
      }
    }
   

  }

  async getCourse() {
    
    let list = await this.typeRepository.find()

    
    let arr=[]
    for(var i = 0; i< list.length;i++) {
      let course = await this.courseRepository.find({typeID: list[i].id})

          // console.log(course.id)

          for(let i of course){
          
          
      
           i.stuNo = await this.getStudentNum({id:i.id})

           console.log(i)

          }

        


      arr.push({name: list[i].name,list:course})

      // console.log(arr)

    }
    
      let aaa = await this.getStudentNum({id:1})

      console.log(aaa)
   

    return arr
  }


  // 获取数量
  async getStudentNum(body){

  
    // 传递一个课程的id下来
    let list = await this.correlationRepository.find({courseNo:body.id})

  

    let studentMsg  = []
    for(let i in list){
       studentMsg.push(await this.studentRepository.findOne({id:list[i].studentNo}))
    }


    return String(studentMsg.length)
    


  }

  // 查询登录的个人信息
  async getStuInfo(body) {

    let msg:any;

    if(body.role == 1){
        msg =  await this.studentRepository.findOne({id:body.id})
    }else if(body.role == 2){
      msg = await this.teacherRepository.findOne({id:body.id})
    }else if(body.role == 3){
      msg = await this.adminRepository.findOne({id:body.id})
    }
      
   

    return msg

    }

  //模糊查询 -- 搜索功能
  async searchCourse(body: any) {
   

    console.log(body)
  
    let sql = `select * from course_entity where courseName like '%${body.courseName}%'`
    let msg = await this.studentRepository.query(sql)

    console.log(msg)

    if(msg.length == 0 ){
      
      return {
          code:400,
          data:[]
      }
   }else{
        return {
          code:200,
          data:msg
        }
    }
  
  } 

  async getCourseOneInfo(body:any){
  
    let sql = `
      select *
      from course_entity 
      where  id=${body.id}
    `
    let msg = await this.studentRepository.query(sql)

    if(msg.length == 0 ){
      throw new HttpException('查找失败', HttpStatus.BAD_REQUEST);
   }else{
        return msg
    }
  }


   // 学生取消课程
   async cancelCouse(body){
        
    let  msg=  await this.correlationRepository.delete({studentNo:body.studentNo,courseNo:body.courseNo});
    
    
    return {
      code:200,
      msg:"退出课程成功"
    } 
  }



    // 学生加入课程
  async studentJoinCourse(body){
      // 要加入课程的id 
      // 学生的id

      let courseMsg = await this.courseRepository.findOne({id:body.courseNo})


      if(courseMsg == undefined){
        throw new HttpException('查找失败', HttpStatus.BAD_REQUEST);
      }

      let joinList = new correlationEntity()
  
        joinList.studentNo = body.studentNo
        joinList.courseNo = body.courseNo
        let  exist=  await this.correlationRepository.findOne(joinList);
        if(exist){
  
          return {
            code:401,//已经存在
            msg:"已加入"
          }
        }else{
          this.correlationRepository.save(joinList)
          return {
            code:200,
            msg:"加入成功"
          }
        }
        // 如果这个学生已经加入过 则提示已存在
        return exist
  
      }
  
 
  

  // 学生加入课程的列表
  async getCourseStudentCount(body:any){

      // 找出关联表 
      let msg = await this.correlationRepository.find({studentNo:body.id})

      // let studentMsg = await this.studentRepository.find({id:body.id})
     
      let arr = []
      // 找出学生下面的对应课程
      for(let i in msg ){
        let course = await this.courseRepository.findOne({id:msg[i].courseNo})
        arr.push(course)

      }

      console.log(arr);


      // console.log(arr);

      let cid = []
      for(let i of arr){
        cid.push(i.courseTeacherId)  
      }

     

      return arr

      // if(arr.length == 0){
      //   return {
      //     code:400,
      //     msg:"还没加入任何课程"
      //   }
      // }else{
        
      // }
     
  }

  // 学生是否已经加入课程
  async getStudenthasCourse(body:any){
    let  msg=  await this.correlationRepository.findOne({studentNo:body.studentNo,courseNo:body.courseNo});
 
      if(msg == undefined){
        return false
      }else{
        return true
      }
   
  }

  // 学生收藏课程
  async studentlLikeCourse(body){
       // 要收藏课程的id 
      // 学生的id

    
  

      let courseMsg = await this.courseRepository.findOne({id:body.courseNo})


      if(courseMsg == undefined){
        throw new HttpException('查找失败', HttpStatus.BAD_REQUEST);
      }


      let likeList = new likeEntity()

        likeList.studentNo = body.studentNo
        likeList.courseNo = body.courseNo
        let  exist=  await this.likeEntity.findOne(likeList);
        if(exist){
  
          return {
            code:401,//已经存在
            msg:"已收藏"
          }
        }else{
          this.likeEntity.save(likeList)
          return {
            code:200,
            msg:"收藏成功"
          }
        }
  
  }
  // 学生收藏课程的列表
  async studentLikeList(body){


   
        // 找出关联表
        let msg = await this.likeEntity.find({studentNo:body.id})
    
        let arr = []
        // 找出学生下面的对应课程
        for(let i in msg ){
          let course = await this.courseRepository.findOne({id:msg[i].courseNo})
          arr.push(course)
        }

      
       
        if(arr.length == 0){
          return {
            code:400,
            msg:[],
          }
        }else{
          return {
            code:200,
            msg:arr
          }
        }
  }

  //学生是否收藏课程
  async studentifLikeCourse(body){
    let  msg=  await this.likeEntity.findOne({studentNo:body.studentNo,courseNo:body.courseNo});
 
    if(msg == undefined){
      return false
    }else{
      return true
    }
  }

  // 取消收藏
  async studentLikeCanel(body){


    let  msg=  await this.likeEntity.delete({studentNo:body.studentNo,courseNo:body.courseNo});
    

    return {
      code:200,
      msg:"取消收藏成功"
    } 
  }


}
