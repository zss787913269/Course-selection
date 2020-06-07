import { Controller, Get, Body, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { TeacherService} from './teacher.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { createWriteStream } from 'fs';
import { join } from 'path';


@Controller('teacher')
export class TeacherController {
    constructor(private readonly TeacherService: TeacherService) {}

    // 老师发布课程
    @Post("teacherAddCourse")
    teacherAddCourse(@Body() body){
        return this.TeacherService.teacherAddCourse(body)
    }

    //  上传图片
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file) {


      const writeImage = createWriteStream(join(__dirname, '../../', 'public/img', `${file.originalname}`))
      writeImage.write(file.buffer)
      return {
        imgpath:file.originalname
      }
    }

    // 老师的课程别表
    @Post("teacherCourseList")
    teacherCourseList(@Body() body){
        return this.TeacherService.teacherCourseList(body)
    }

    // 老师查看某个课程下面的所有学生
    @Post("coureseByStudent")
    coureseByStudent(@Body() body){
            return this.TeacherService.coureseByStudent(body)
        }
    
    // 老师删除课程
     @Post("teacherRemoveCourse")
     teacherRemoveCourse(@Body() body){
            return this.TeacherService.teacherRemoveCourse(body)
    } 

    // 老师修改课程
     @Post("teacherEditCourse")
     teacherEditCourse(@Body() body){
            return this.TeacherService.teacherEditCourse(body)
    }

    // 老师公告  
    @Post("teachernotice")
    teachernotice(@Body() body){
            return this.TeacherService.teachernotice(body)
    }
    // 获取所有老师的课程
    @Get("allTeacherCourse")
    allTeacherCourse(){
            return this.TeacherService.allTeacherCourse()
    }

    // 获取课程下面的学生长度
    @Post("getStudentNum")
    getStudentNum(@Body() body){
            return this.TeacherService.getStudentNum(body)
    }

}
