import { Test, TestingModule } from '@nestjs/testing';
import { HistoryService } from './history.service';

const mockHistoryLogModel = {
  create: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  updateOne: jest.fn(),
  deleteOne: jest.fn(),
};

describe('HistoryService', () => {
  let service: HistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HistoryService,
        {
          provide: 'HistoryLogModel',
          useValue: mockHistoryLogModel,
        },
      ],
    }).compile();

    service = module.get<HistoryService>(HistoryService);
  });

  it('debe estar definido', () => {
    expect(service).toBeDefined();
  });
});
