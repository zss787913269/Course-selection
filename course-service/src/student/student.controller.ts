import {
    Controller,
    Get,
    Body,
    Post
} from '@nestjs/common';

import {
    StudentService
} from './student.service';

@Controller('api')
export class StudentController {

    constructor(private readonly studentService: StudentService) {}

    /**
     * 登录接口
     * @api {GET} /api/users/:id 获得某个用户
     * @apiDescription 根据数据库判断是否有这个人的存在
     * @apiName login
     * @apiParam (path参数) {Number} account
     * @apiParam (path参数) {Number} password
     * @apiSampleRequest /api/login
     * @apiGroup User
     * @apiVersion 1.0.0
     */
    @Post("login")
    login(@Body() body) {
        return this.studentService.login(body)
    }
    
    /**
     * 课程分类接口
     * @api {GET}  获得滑动菜单内容
     * @apiName getCourse
     * @apiSampleRequest /api/getCourse
     * @apiGroup User
     * @apiVersion 1.0.0
     */

    @Get("h")
    h(){
        return {code:200}
    }

    @Get("getCourse")
    getCourse(){
        return this.studentService.getCourse()
    }

      /**
     * 学生个人信息
     * @api {GET}  获取学生个人信息
     * @apiName getCourse
     * @apiSampleRequest /api/getCourse
     * @apiGroup User
     * @apiVersion 1.0.0
     */

    @Post("editStu")
    editStu(@Body() body){
        return this.studentService.editStu(body)
    }

    @Post("cancelCouse")
    cancelCouse(@Body() body){
        return this.studentService.cancelCouse(body)
    }

    @Post("getStuInfo")
    getStuInfo(@Body() body){
        return this.studentService.getStuInfo(body)
    }
    
       /**
     * 课程搜索
     * @api {GET}  获取学生个人信息
     * @apiName getCourse
     * @apiSampleRequest /api/getCourse
     * @apiGroup User
     * @apiVersion 1.0.0
     */
    @Post("searchCourse")
     searchCourse(@Body() body){
        return this.studentService.searchCourse(body)
     }

    //  查询这门课的详细信息
     @Post("getCourseOneInfo")
     getCourseOneInfo(@Body() body){
        return this.studentService.getCourseOneInfo(body)
     }

    //  查找学生已选课程列表
     @Post("getCourseStudentCount")
     getCourseStudentCount(@Body() body){
        return this.studentService.getCourseStudentCount(body)
     }

    //  加入课程
    @Post("studentJoinCourse")
       studentJoinCourse(@Body() body){
        return this.studentService.studentJoinCourse(body)
     }
    // 学生收藏课程
    @Post("studentlLikeCourse")
     studentlLikeCourse(@Body() body){
        return this.studentService.studentlLikeCourse(body)
     }
    
    //  查找学生已收藏课程列表
     @Post("studentLikeList")
     studentLikeList(@Body() body){
        return this.studentService.studentLikeList(body)
     }

    //  学生是否加入到了这门课程
    @Post("getStudenthasCourse")
      getStudenthasCourse(@Body() body){
        return this.studentService.getStudenthasCourse(body)
     } 
     //  学生是否加入收藏了课程
    @Post("studentifLikeCourse")
    studentifLikeCourse(@Body() body){
        return this.studentService.studentifLikeCourse(body)
     } 
      //  取消收藏
    @Post("studentLikeCanel")
    studentLikeCanel(@Body() body){
        return this.studentService.studentLikeCanel(body)
     }

   
   
}