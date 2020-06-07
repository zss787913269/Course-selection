import { Controller, Body, Post, Get } from '@nestjs/common';
import {NoticeService} from './notice.service'

@Controller('notice')
export class NoticeController {
    constructor(private readonly noticeService: NoticeService) {}

    // 老师发布公告
    @Post("teacherNotice")
    teacherNotice(@Body() body){
        return this.noticeService.teacherNotice(body)
    }

    // 学生查看所有的公告
    @Get("findNoticeAll")
    findNoticeAll(){
        return this.noticeService.findNoticeAll()
    }

    // 老师麾下的公告
    @Post("findNoticesByTeacher")
    findNoticesByTeacher(@Body() body){
        return this.noticeService.findNoticesByTeacher(body)
    }

    // 删除公告
    @Post("deletcNotice")
    deletcNotice(@Body() body){
        return this.noticeService.deletcNotice(body);
    }

    // 编辑公告
    @Post("updateNootice")
    updateNootice(@Body() body){
        return this.noticeService.updateNootice(body)
    }

    @Post("getNoticeById")
    getNoticeById(@Body() body){
        return this.noticeService.getNoticeById(body)
    }

    // 获取老师自己发布的公告列表
    @Post("findMyTeacherNotice")
    findMyTeacherNotice(@Body() body){
        return this.noticeService.findMyTeacherNotice(body)
    }
}
