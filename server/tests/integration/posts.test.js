
const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
let app;
let mongoServer;
const User = require('../../src/models/User');
const Post = require('../../src/models/Post');
const { generateToken } = require('../../src/utils/auth');

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
  app = require('../../src/app'); // require after mongoose connect

  // create user
  const user = await User.create({ username: 'test', email: 'test@example.com', password: 'password' });
  global.__TEST_USER__ = user;
  global.__TOKEN__ = generateToken(user);
  const post = await Post.create({ title: 'Test Post', content: 'content', author: user._id });
  global.__POST_ID__ = post._id.toString();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Post.deleteMany({});
});

describe('POST /api/posts', () => {
  it('creates post when authenticated', async () => {
    const res = await request(app)
      .post('/api/posts')
      .set('Authorization', `Bearer ${global.__TOKEN__}`)
      .send({ title: 'Hello', content: 'World' })
      .expect(201);
    expect(res.body.title).toBe('Hello');
  });

  it('returns 401 when not authenticated', async () => {
    await request(app).post('/api/posts').send({ title: 'x' }).expect(401);
  });

  it('returns 400 when validation fails', async () => {
    await request(app).post('/api/posts').set('Authorization', `Bearer ${global.__TOKEN__}`).send({}).expect(400);
  });
});

describe('GET /api/posts', () => {
  it('lists posts', async () => {
    await Post.create({ title: 'One', content: 'a', author: global.__TEST_USER__._id });
    const res = await request(app).get('/api/posts').expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });
});

describe('GET /api/posts/:id', () => {
  it('returns a post by id', async () => {
    const post = await Post.create({ title: 'FindMe', content: 'x', author: global.__TEST_USER__._id });
    const res = await request(app).get(`/api/posts/${post._id}`).expect(200);
    expect(res.body.title).toBe('FindMe');
  });
});
