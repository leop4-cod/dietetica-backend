import { Test, TestingModule } from '@nestjs/testing';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';

const mockSalesService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('SalesController', () => {
  let controller: SalesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalesController],
      providers: [
        {
          provide: SalesService,
          useValue: mockSalesService,
        },
      ],
    }).compile();

    controller = module.get<SalesController>(SalesController);
  });

  it('debe estar definido', () => {
    expect(controller).toBeDefined();
  });
});
