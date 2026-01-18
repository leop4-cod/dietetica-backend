import { Test, TestingModule } from '@nestjs/testing';
import { AddressesService } from './addresses.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Address } from './address.entity';

describe('AddressesService', () => {
  let service: AddressesService;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressesService,
        {
          provide: getRepositoryToken(Address),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<AddressesService>(AddressesService);
  });

  it('debe estar definido', () => {
    expect(service).toBeDefined();
  });
});
