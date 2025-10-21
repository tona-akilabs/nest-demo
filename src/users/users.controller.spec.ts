import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

describe('Users Controller', () => {
  let usersController: UsersController;

  const repoMock = {
    create: jest.fn().mockImplementation((dto) => ({ ...dto })),
    save: jest.fn().mockImplementation((dto) => ({
      id: 'test-id',
      ...dto,
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      /*imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: '123456',
          database: 'nest_demo',
          autoLoadEntities: true, // dev only
          synchronize: true,
          logging: ['error', 'warn'],
        }),
        TypeOrmModule.forFeature([User]),
      ],*/
      controllers: [UsersController],
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: repoMock },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
  });

  describe('root', () => {
    it('should return "User Info!"', async () => {
      const res = await usersController.create({
        email: 'admin@gmail.com',
        name: 'Admin',
      });
      expect(res).toEqual({
        id: 'test-id',
        email: 'admin@gmail.com',
        name: 'Admin',
      });
    });
  });
});
