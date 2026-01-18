import { Test, TestingModule } from '@nestjs/testing';
import { SaleDetailsController } from './sale-details.controller';
import { SaleDetailsService } from './sale-details.service';

const mockSaleDetailsService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('SaleDetailsController', () => {
  let controller: SaleDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SaleDetailsController],
      providers: [
        {
          provide: SaleDetailsService,
          useValue: mockSaleDetailsService,
        },
      ],
    }).compile();

    controller = module.get<SaleDetailsController>(SaleDetailsController);
  });

  it('debe estar definido', () => {
    expect(controller).toBeDefined();
  });
});
