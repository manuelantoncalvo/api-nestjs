import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { AuthService } from './auth.service';

describe('AuthController (functional)', () => {
  let app: INestApplication;
  let authService: AuthService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    authService = app.get<AuthService>(AuthService);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /auth/login', () => {
    it('should return an access token when valid credentials are provided', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ username: 'mcalvo', password: '123456' })
        .expect(HttpStatus.OK);

      expect(response.body).toHaveProperty('access_token');
    });

    it('should return an error when invalid credentials are provided', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ username: 'invalid-username', password: 'invalid-password' })
        .expect(HttpStatus.UNAUTHORIZED);

      expect(response.body).toEqual({
        message: 'Unauthorized',
        statusCode: 401,
      });
    });
  });
});
