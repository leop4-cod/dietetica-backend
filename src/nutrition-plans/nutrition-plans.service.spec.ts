import { Test, TestingModule } from '@nestjs/testing';
import { NutritionPlansService } from './nutrition-plans.service';

const mockNutritionPlanModel = {
  create: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  updateOne: jest.fn(),
  deleteOne: jest.fn(),
};

describe('NutritionPlansService', () => {
  let service: NutritionPlansService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NutritionPlansService,
        {
          provide: 'NutritionPlanModel',
          useValue: mockNutritionPlanModel,
        },
      ],
    }).compile();

    service = module.get<NutritionPlansService>(NutritionPlansService);
  });

  it('debe estar definido', () => {
    expect(service).toBeDefined();
  });
});
