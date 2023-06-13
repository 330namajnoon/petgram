import { Test, TestingModule } from '@nestjs/testing';
import { PetgramService } from './petgram.service';

describe('PetgramService', () => {
  let service: PetgramService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PetgramService],
    }).compile();

    service = module.get<PetgramService>(PetgramService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
