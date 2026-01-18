import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';

const mockCategoryRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('CategoriesService', () => {
  let service: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: 'CategoryRepository',
          useValue: mockCategoryRepository,
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  it('debe estar definido', () => {
    expect(service).toBeDefined();
  });
});
