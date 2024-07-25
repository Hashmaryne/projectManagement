import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Auth from '../middleware/auth'; 

jest.mock('jsonwebtoken');
jest.mock('bcryptjs');

describe('Auth Class', () => {
  describe('authenticateToken', () => {
    it('should return 401 if no token is provided', () => {
      const req = { header: jest.fn().mockReturnValue(null) };
      const res = { sendStatus: jest.fn() };
      const next = jest.fn();

      Auth.authenticateToken(req, res, next);
      
      expect(res.sendStatus).toHaveBeenCalledWith(401);
      expect(next).not.toHaveBeenCalled();
    });

    it('should return 403 if token is invalid', () => {
      const req = { header: jest.fn().mockReturnValue('Bearer invalidtoken') };
      const res = { sendStatus: jest.fn() };
      const next = jest.fn();

      jwt.verify.mockImplementation((token, secret, callback) => callback(new Error('Invalid token')));

      Auth.authenticateToken(req, res, next);
      
      expect(res.sendStatus).toHaveBeenCalledWith(403);
      expect(next).not.toHaveBeenCalled();
    });

    it('should call next() if token is valid', () => {
      const req = { header: jest.fn().mockReturnValue('Bearer validtoken') };
      const res = {};
      const next = jest.fn();

      jwt.verify.mockImplementation((token, secret, callback) => callback(null, { id: 1 }));

      Auth.authenticateToken(req, res, next);

      expect(req.user).toEqual({ id: 1 });
      expect(next).toHaveBeenCalled();
    });
  });

  describe('hashPassword', () => {
    it('should return a hashed password', () => {
      const password = 'password123';
      const hashedPassword = 'hashedpassword';
      bcrypt.hashSync.mockReturnValue(hashedPassword);

      const result = Auth.hashPassword(password);

      expect(result).toBe(hashedPassword);
      expect(bcrypt.hashSync).toHaveBeenCalledWith(password, 8);
    });
  });

  describe('comparePassword', () => {
    it('should return true if password matches', () => {
      const password = 'password123';
      const hashedPassword = 'hashedpassword';
      bcrypt.compareSync.mockReturnValue(true);

      const result = Auth.comparePassword(password, hashedPassword);

      expect(result).toBe(true);
      expect(bcrypt.compareSync).toHaveBeenCalledWith(password, hashedPassword);
    });

    it('should return false if password does not match', () => {
      const password = 'password123';
      const hashedPassword = 'hashedpassword';
      bcrypt.compareSync.mockReturnValue(false);

      const result = Auth.comparePassword(password, hashedPassword);

      expect(result).toBe(false);
      expect(bcrypt.compareSync).toHaveBeenCalledWith(password, hashedPassword);
    });
  });
});
