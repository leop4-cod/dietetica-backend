import { Test, TestingModule } from '@nestjs/testing';
import { SaleDetailsService } from './sale-details.service';

const mockSaleDetailRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('SaleDetailsService', () => {
  let service: SaleDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SaleDetailsService,
        {
          provide: 'SaleDetailRepository',
          useValue: mockSaleDetailRepository,
        },
      ],
    }).compile();

    service = module.get<SaleDetailsService>(SaleDetailsService);
  });

  it('debe estar definido', () => {
    expect(service).toBeDefined();
  });
});
