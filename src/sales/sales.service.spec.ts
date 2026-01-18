import { Test, TestingModule } from '@nestjs/testing';
import { SalesService } from './sales.service';
import { InventoryService } from '../inventory/inventory.service';
import { CouponsService } from '../coupons/coupons.service';
import { CartService } from '../cart/cart.service';
import { DataSource } from 'typeorm';

const mockSaleRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const mockSaleDetailRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const mockInventoryService = {};

const mockCouponsService = {};

const mockCartService = {};

const mockDataSource = {};

describe('SalesService', () => {
  let service: SalesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SalesService,

        { provide: 'SaleRepository', useValue: mockSaleRepository },
        { provide: 'SaleDetailRepository', useValue: mockSaleDetailRepository },

        { provide: InventoryService, useValue: mockInventoryService },
        { provide: CouponsService, useValue: mockCouponsService },
        { provide: CartService, useValue: mockCartService },

        { provide: DataSource, useValue: mockDataSource },
      ],
    }).compile();

    service = module.get<SalesService>(SalesService);
  });

  it('debe estar definido', () => {
    expect(service).toBeDefined();
  });
});
