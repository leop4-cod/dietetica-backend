import { Test, TestingModule } from '@nestjs/testing';
import { CouponsService } from './coupons.service';

const mockCouponRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('CouponsService', () => {
  let service: CouponsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CouponsService,
        {
          provide: 'CouponRepository',
          useValue: mockCouponRepository,
        },
      ],
    }).compile();

    service = module.get<CouponsService>(CouponsService);
  });

  it('debe estar definido', () => {
    expect(service).toBeDefined();
  });
});
