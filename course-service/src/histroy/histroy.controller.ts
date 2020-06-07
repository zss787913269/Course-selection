import { Controller, Post, Body, Get } from '@nestjs/common';
import {HistroyService } from './histroy.service'

@Controller('histroy')
export class HistroyController {

    constructor(private readonly histroyService: HistroyService) {}


    @Post("histroyAddforStudent")
    histroyAddforStudent(@Body() body){
        return this.histroyService.histroyAddforStudent(body)
    }

     @Post("createOp")
     createOp(@Body() body){
        return this.histroyService.createOp(body)
    }
    
    @Get("getHistroyListMsg")
    getHistroyListMsg(){
        return this.histroyService.getHistroyListMsg()
    }



}
