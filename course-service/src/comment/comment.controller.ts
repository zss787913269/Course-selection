import { Controller, Post, Body } from '@nestjs/common';
import { CommentService } from './comment.service'


@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    // 学生发布评论
    @Post("publishComment")
    publishComment(@Body() body){
        return this.commentService.publishComment(body)
    }

    // 查看课程下面的评论、
    @Post("getCourseCommentBy")
    getCourseCommentBy(@Body() body){
        return this.commentService.getCourseCommentBy(body)
    }

    @Post("deleteComment")
    deleteComment(@Body() body){
        return this.commentService.deleteComment(body)
    }
}
