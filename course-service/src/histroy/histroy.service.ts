import { Injectable } from '@nestjs/common';
import {correlationEntity } from '../dao/correlationEntity'
import { courseEntity } from '../dao/courseEntity'
import { histroyEntity } from '../dao/histroyEntity'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {opEntity} from '../dao/opEntity';

@Injectable()
export class HistroyService {

    constructor(
        
        @InjectRepository(histroyEntity)
        private readonly histroyRepository: Repository<histroyEntity>,
        
          @InjectRepository(correlationEntity)
        private readonly correlationRepository: Repository<correlationEntity>,

         @InjectRepository(courseEntity)
        private readonly courseRepository: Repository<courseEntity>,

         @InjectRepository(opEntity)
        private readonly opRepository: Repository<opEntity>,

        
      ) {}


     async histroyAddforStudent(body){

        let histroyList = new histroyEntity()

        histroyList.courseNo = body.courseNo
        histroyList.studentNo = body.studentNo

        let list = await this.histroyRepository.find({studentNo:body.studentNo,courseNo:body.courseNo})

        
        console.log(list)

        if(list.length == 0){
            await this.histroyRepository.save(histroyList)
        }else{
            for(let i of list){
                if(i.studentNo == body.studentNo && i.courseNo == body.courseNo){
                    return {
                        msg:"已经存在",
                        data:histroyList
                    }
                }else{
                    await this.histroyRepository.save(histroyList)
                    return {
                        msg:"添加成功",
                        data:histroyList
                    }
                }
            }
        }

       

      

     

       

     }
  

    //  获取历史记录
     async getHistroyListMsg(){
         let list = await this.histroyRepository.find()


        let arr = []
         for(let i in list ){
             let msg = await this.courseRepository.findOne({id:list[i].courseNo})
             arr.unshift(msg)
         }

         console.log(arr)
         

         return {
             code:200,
             data:arr
         }
     }


     getTime(){

        let time = new Date()
    
        let y = time.getFullYear();
        let m = time.getMonth();
        let d = time.getDate()
        
        return y+"年"+m+"月"+d+"日"
    
      }
    //  创建反馈意见
    async createOp(body){
        

        let list = new opEntity()

        list.createTime = this.getTime();
        list.msg = body.msg;
        list.phone = body.phone

        await this.opRepository.save(list)


        return {
            msg:"反馈成功",
            code:200
        }



    }
    


}
