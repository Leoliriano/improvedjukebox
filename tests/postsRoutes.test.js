const request = require('supertest');
const app = require('../../src/app');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

describe('Posts API', () => {
  beforeAll(async () => {
    // Optional: Reset the database before running tests
  });

  afterAll(() => {
    prisma.$disconnect();
  });

  test('GET /api/posts should return all posts', async () => {
    const response = await request(app).get('/api/posts');
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test('POST /api/posts should create a new post', async () => {
    const newPost = { title: 'Test Post', content: 'This is a test post' };
    const response = await request(app)
      .post('/api/posts')
      .send(newPost);

    expect(response.statusCode).toBe(201);
    expect(response.body.title).toEqual(newPost.title);
  });
});
