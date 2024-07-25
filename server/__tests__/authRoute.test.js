import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import Auth from '../middleware/auth.js';
import User from '../models/userModel.js';
import router from '../routes/authRoute.js';

const app = express();
app.use(express.json());
app.use('/auth', router);

// Mock User model
jest.mock('../models/userModel.js');
jest.mock('../middleware/auth.js');

describe('Auth Router', () => {
  beforeAll(async () => {
    mongoose.connect = jest.fn();
    mongoose.connection.close = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('POST /auth/register', () => {
    it('should register an admin successfully', async () => {
      Auth.hashPassword.mockReturnValue('hashedpassword');
      User.prototype.save.mockResolvedValueOnce();

      const response = await request(app)
        .post('/auth/register')
        .send({ username: 'admin', password: 'password', role: 'Admin' });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Admin registered successfully');
    });

    it('should return 403 if role is not Admin', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({ username: 'admin', password: 'password', role: 'User' });

      expect(response.status).toBe(403);
      expect(response.body.message).toBe('Only admins can register');
    });

    it('should return 500 if there is an error during registration', async () => {
      Auth.hashPassword.mockReturnValue('hashedpassword');
      User.prototype.save.mockRejectedValueOnce(new Error('Database error'));

      const response = await request(app)
        .post('/auth/register')
        .send({ username: 'admin', password: 'password', role: 'Admin' });

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Error registering admin');
    });
  });

  describe('POST /auth/login', () => {
    it('should log in an admin successfully', async () => {
      Auth.comparePassword.mockReturnValue(true);
      User.findOne.mockResolvedValueOnce({ _id: '123', username: 'admin', password: 'hashedpassword', role: 'Admin' });
      jwt.sign = jest.fn().mockReturnValue('token');

      const response = await request(app)
        .post('/auth/login')
        .send({ username: 'admin', password: 'password' });

      expect(response.status).toBe(200);
      expect(response.body.token).toBe('token');
    });

    it('should return 401 if credentials are invalid', async () => {
      User.findOne.mockResolvedValueOnce(null);

      const response = await request(app)
        .post('/auth/login')
        .send({ username: 'admin', password: 'wrongpassword' });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Invalid credentials');
    });

    it('should return 401 if password is incorrect', async () => {
      User.findOne.mockResolvedValueOnce({ _id: '123', username: 'admin', password: 'hashedpassword', role: 'Admin' });
      Auth.comparePassword.mockReturnValue(false);

      const response = await request(app)
        .post('/auth/login')
        .send({ username: 'admin', password: 'wrongpassword' });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Invalid credentials');
    });
  });
});
