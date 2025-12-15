import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { resetDatabase } from '../../util/database-util';
import { PrismaClient, User } from '@autotest-poc/prisma-client';
import { UserForCreate, UserForUpdate } from '@autotest-poc/api-contract';

const prisma = new PrismaClient();

describe('User API', () => {
  let app: INestApplication;
  let existingUser: User;

  beforeAll(async () => {
    app = globalThis.__APP__;

    resetDatabase();

    // This record is to act as an existing user, it should not be touched by tests
    existingUser = await prisma.user.create({
      data: { name: 'Existing User', email: 'existing@example.com' },
    });
  });

  afterAll(async () => {
    await prisma.user.deleteMany({
      where: { email: 'existing@example.com' },
    });
  });

  describe('POST /users', () => {
    it('should create a user (success)', async () => {
      const data: UserForCreate = {
        name: 'Alice',
        email: 'alice@example.com',
      };

      const res = await request(app.getHttpServer()).post('/users').send(data);
      expect(res.status).toBe(201);
      expect(res.body.name).toBe(data.name);
      expect(res.body.email).toBe(data.email);

      // DB validation
      const user = await prisma.user.findUnique({
        where: { email: data.email },
      });
      expect(user).not.toBeNull();

      // Clean up
      await prisma.user.delete({ where: { id: res.body.id } });
    });

    it('should fail to create user with invalid email (error)', async () => {
      const data: UserForCreate = {
        name: '',
        email: 'not-an-email',
      };

      const res = await request(app.getHttpServer()).post('/users').send(data);
      expect(res.status).toBe(400);
    });

    it('should fail to create user with duplicate email (error)', async () => {
      const data: UserForCreate = {
        name: 'Charlie',
        email: existingUser.email,
      };

      const res = await request(app.getHttpServer()).post('/users').send(data);
      expect(res.status).toBe(400);
    });
  });

  describe('PUT /users/:id', () => {
    it('should update a user (success)', async () => {
      const user = await prisma.user.create({
        data: { name: 'Dave', email: 'dave@example.com' },
      });

      const data: UserForUpdate = {
        id: user.id,
        name: 'Dave Updated',
        email: 'dave.updated@example.com',
      };
      const res = await request(app.getHttpServer())
        .put(`/users/${user.id}`)
        .send(data);
      expect(res.status).toBe(200);
      expect(res.body.name).toBe(data.name);
      expect(res.body.email).toBe(data.email);

      // DB validation
      const updated = await prisma.user.findUnique({ where: { id: user.id } });
      expect(updated?.name).toBe(data.name);
      expect(updated?.email).toBe(data.email);

      // Clean up
      await prisma.user.delete({ where: { id: user.id } });
    });

    it('should update a user without changing email (success)', async () => {
      const user = await prisma.user.create({
        data: { name: 'Dave', email: 'dave@example.com' },
      });
      const data: UserForUpdate = {
        id: user.id,
        name: 'Dave Updated',
        email: 'dave@example.com',
      };
      const res = await request(app.getHttpServer())
        .put(`/users/${user.id}`)
        .send(data);
      expect(res.status).toBe(200);
      expect(res.body.name).toBe(data.name);
      expect(res.body.email).toBe(data.email);

      // DB validation
      const updated = await prisma.user.findUnique({ where: { id: user.id } });
      expect(updated?.name).toBe(data.name);
      expect(updated?.email).toBe(data.email);

      // Clean up
      await prisma.user.delete({ where: { id: user.id } });
    });

    it('should return null for non-existent user (error)', async () => {
      const res = await request(app.getHttpServer()).put('/users/999999').send({
        id: 999999,
        name: 'Non Existent',
        email: 'non.existent@example.com',
      });
      expect(res.status).toBe(404);
    });

    it('should fail to update user with invalid data (error)', async () => {
      const user = await prisma.user.create({
        data: { name: 'Eve', email: 'eve@example.com' },
      });

      const res = await request(app.getHttpServer())
        .put(`/users/${user.id}`)
        .send({ id: user.id, name: '', email: 'bad' });

      expect(res.status).toBe(400);

      // Clean up
      await prisma.user.delete({ where: { id: user.id } });
    });

    it('should fail to update user with duplicate email (error)', async () => {
      const user = await prisma.user.create({
        data: { name: 'Eve', email: 'eve@example.com' },
      });

      const res = await request(app.getHttpServer())
        .put(`/users/${user.id}`)
        .send({ id: user.id, name: 'Eve Updated', email: existingUser.email });

      expect(res.status).toBe(400);

      // Clean up
      await prisma.user.delete({ where: { id: user.id } });
    });
  });

  describe('DELETE /users/:id', () => {
    it('should delete a user (success)', async () => {
      const user = await prisma.user.create({
        data: { name: 'Frank', email: 'frank@example.com' },
      });

      const res = await request(app.getHttpServer()).delete(
        `/users/${user.id}`
      );
      expect(res.status).toBe(200);
      expect(res.body.id).toBe(user.id);

      // DB validation
      const deleted = await prisma.user.findUnique({ where: { id: user.id } });
      expect(deleted).toBeNull();
    });

    it('should return error for deleting non-existent user (error)', async () => {
      const res = await request(app.getHttpServer()).delete('/users/999999');
      expect(res.status).toBe(404);
    });
  });

  describe('GET /users/:id', () => {
    it('should get a user by id (success)', async () => {
      const res = await request(app.getHttpServer()).get(
        `/users/${existingUser.id}`
      );
      expect(res.status).toBe(200);
      expect(res.body.id).toBe(existingUser.id);
      expect(res.body.name).toBe(existingUser.name);
      expect(res.body.email).toBe(existingUser.email);
    });

    it('should return null for non-existent user (error)', async () => {
      const res = await request(app.getHttpServer()).get('/users/999999');
      expect(res.status).toBe(404);
    });
  });

  describe('GET /users', () => {
    it('should get list of users (success)', async () => {
      const res = await request(app.getHttpServer()).get('/users');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      // Base seeded data count (1) + existingUser (1)
      expect(res.body.length).toBe(2);
    });
  });
});
