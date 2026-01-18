import { Test, TestingModule } from '@nestjs/testing';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';

const mockHistoryService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  remove: jest.fn(),
};

describe('HistoryController', () => {
  let controller: HistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistoryController],
      providers: [
        {
          provide: HistoryService,
          useValue: mockHistoryService,
        },
      ],
    }).compile();

    controller = module.get<HistoryController>(HistoryController);
  });

  it('debe estar definido', () => {
    expect(controller).toBeDefined();
  });
});
