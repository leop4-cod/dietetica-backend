import { Test, TestingModule } from '@nestjs/testing';
import { AddressesController } from './addresses.controller';
import { AddressesService } from './addresses.service';

describe('NombreController', () => {
  let controller: AddressesController;

  const mockService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddressesController],
      providers: [
        { provide: AddressesService, useValue: mockService },
      ],
    }).compile();

    controller = module.get<AddressesController>(AddressesController);
  });

  it('debe estar definido', () => {
    expect(controller).toBeDefined();
  });
});
