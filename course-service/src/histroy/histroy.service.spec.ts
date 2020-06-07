import { Test, TestingModule } from '@nestjs/testing';
import { HistroyService } from './histroy.service';

describe('HistroyService', () => {
  let service: HistroyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistroyService],
    }).compile();

    service = module.get<HistroyService>(HistroyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
