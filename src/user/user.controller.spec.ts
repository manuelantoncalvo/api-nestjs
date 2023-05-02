import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { AuthGuard } from '../auth/auth.guard';
import { AuthGuardMock } from '../auth/auth.guard.mock';
describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(AuthGuard)
      .useClass(AuthGuardMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /users', () => {
    it('should return all users', async () => {
      const response = await request(app.getHttpServer())
        .get('/users')
        .expect(200);

      expect(response.body).toEqual([
        {
          id: 1,
          username: 'mcalvo',
          first_name: 'Manuel',
          last_name: 'Calvo',
          address: {
            street: 'Sgo del estero 1289',
            city: 'Buenos Aires',
            country: 'Argentina',
          },
        },
      ]);
    });
  });

  describe('GET /users/:id', () => {
    it('should return a user by id', async () => {
      const response = await request(app.getHttpServer())
        .get(`/users/1`)
        .expect(200);

      expect(response.body).toEqual({
        id: 1,
        username: 'mcalvo',
        first_name: 'Manuel',
        last_name: 'Calvo',
        address: {
          street: 'Sgo del estero 1289',
          city: 'Buenos Aires',
          country: 'Argentina',
        },
      });
    });
  });
});
