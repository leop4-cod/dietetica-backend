import { Test, TestingModule } from '@nestjs/testing';
import { NutritionPlansController } from './nutrition-plans.controller';
import { NutritionPlansService } from './nutrition-plans.service';

const mockNutritionPlansService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('NutritionPlansController', () => {
  let controller: NutritionPlansController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NutritionPlansController],
      providers: [
        {
          provide: NutritionPlansService,
          useValue: mockNutritionPlansService,
        },
      ],
    }).compile();

    controller = module.get<NutritionPlansController>(NutritionPlansController);
  });

  it('debe estar definido', () => {
    expect(controller).toBeDefined();
  });
});
