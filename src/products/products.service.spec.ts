import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { InventoryService } from '../inventory/inventory.service';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: 'ProductRepository',
          useValue: {}, // mock repo
        },
        {
          provide: InventoryService,
          useValue: {}, // mock inventory
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('debe estar definido', () => {
    expect(service).toBeDefined();
  });
});
