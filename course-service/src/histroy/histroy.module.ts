import { Module } from '@nestjs/common';
import { HistroyController } from './histroy.controller';
import { HistroyService } from './histroy.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {correlationEntity } from '../dao/correlationEntity'
import { courseEntity } from '../dao/courseEntity'
import { histroyEntity } from '../dao/histroyEntity'
import { opEntity } from '../dao/opEntity'


@Module({
  imports:[TypeOrmModule.forFeature([correlationEntity,courseEntity,histroyEntity,opEntity])],
  controllers: [HistroyController],
  providers: [HistroyService]
})
export class HistroyModule {}
