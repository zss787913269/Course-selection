import { Test, TestingModule } from '@nestjs/testing';
import { HistroyController } from './histroy.controller';

describe('Histroy Controller', () => {
  let controller: HistroyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistroyController],
    }).compile();

    controller = module.get<HistroyController>(HistroyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
