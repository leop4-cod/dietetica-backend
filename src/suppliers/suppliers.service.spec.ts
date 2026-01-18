import { Test, TestingModule } from '@nestjs/testing';
import { SuppliersService } from './suppliers.service';

const mockSupplierRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('SuppliersService', () => {
  let service: SuppliersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SuppliersService,
        {
          // 👇 SI FALLA, CAMBIAS ESTE STRING por el que diga el error
          provide: 'SupplierRepository',
          useValue: mockSupplierRepository,
        },
      ],
    }).compile();

    service = module.get<SuppliersService>(SuppliersService);
  });

  it('debe estar definido', () => {
    expect(service).toBeDefined();
  });
});
