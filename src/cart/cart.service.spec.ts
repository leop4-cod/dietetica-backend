import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from './cart.service';
import { ProductsService } from '../products/products.service';

const mockCartModel = {
  create: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  updateOne: jest.fn(),
  deleteOne: jest.fn(),
};

const mockProductsService = {
  findOne: jest.fn(),
};

describe('CartService', () => {
  let service: CartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartService,
        {
          provide: 'CartModel',
          useValue: mockCartModel,
        },
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
      ],
    }).compile();

    service = module.get<CartService>(CartService);
  });

  it('debe estar definido', () => {
    expect(service).toBeDefined();
  });
});
