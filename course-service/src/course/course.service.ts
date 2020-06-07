import { Injectable } from '@nestjs/common';
import {courseEntity} from '../dao/courseEntity'
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(courseEntity)
        private readonly photoRepository: Repository<courseEntity>,
      ) {}

      
}
