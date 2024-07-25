import request from 'supertest';
import express from 'express';
import router from '../routes/propertyCardRoute.js';
import PropertyCard from '../models/propertyCardModel.js';
import Auth from '../middleware/auth.js';

// Initialize the app and use the router
const app = express();
app.use(express.json());
app.use('/property-cards', router);

// Mock the PropertyCard model
jest.mock('../models/propertyCardModel.js');
jest.mock('../middleware/auth.js', () => ({
  authenticateToken: (req, res, next) => next(),
}));

describe('Property Card Router', () => {
  beforeEach(() => {
    jest.resetAllMocks(); // Clear previous mock data
  });

  // Test GET /property-cards
  describe('GET /property-cards', () => {
    it('should retrieve all property cards successfully', async () => {
      const mockPropertyCards = [{ _id: 'card1', community: 'Community A', building: 'Building 1', unitNo: '101' }];
      PropertyCard.find.mockResolvedValue(mockPropertyCards);

      const response = await request(app).get('/property-cards');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockPropertyCards);
    });

    it('should return 500 if there is an error retrieving property cards', async () => {
      PropertyCard.find.mockRejectedValue(new Error('Database error'));

      const response = await request(app).get('/property-cards');

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Error retrieving property cards');
    });
  });

  // Test GET /property-cards/:id
  describe('GET /property-cards/:id', () => {
    it('should retrieve a single property card by ID', async () => {
      const mockPropertyCard = { _id: 'card1', community: 'Community A', building: 'Building 1', unitNo: '101' };
      PropertyCard.findById.mockResolvedValue(mockPropertyCard);

      const response = await request(app).get('/property-cards/card1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockPropertyCard);
    });

    it('should return 404 if the property card is not found', async () => {
      PropertyCard.findById.mockResolvedValue(null);

      const response = await request(app).get('/property-cards/card1');

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Property card not found');
    });

    it('should return 500 if there is an error retrieving the property card', async () => {
      PropertyCard.findById.mockRejectedValue(new Error('Database error'));

      const response = await request(app).get('/property-cards/card1');

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Error retrieving property card');
    });
  });

  // Test POST /property-cards
  describe('POST /property-cards', () => {
    it('should create a property card successfully', async () => {
      const newPropertyCard = { community: 'Community A', building: 'Building 1', unitNo: '101' };
      PropertyCard.prototype.save.mockResolvedValue(newPropertyCard);

      const response = await request(app).post('/property-cards').send(newPropertyCard);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Property card created successfully');
    });

    it('should return 500 if there is an error creating the property card', async () => {
      PropertyCard.prototype.save.mockRejectedValue(new Error('Database error'));

      const response = await request(app).post('/property-cards').send({ community: 'Community A', building: 'Building 1', unitNo: '101' });

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Error creating property card');
    });
  });

  // Test PUT /property-cards/:id
  describe('PUT /property-cards/:id', () => {
    it('should update a property card successfully', async () => {
      const updatedPropertyCard = { _id: 'card1', community: 'Community B', building: 'Building 2', unitNo: '102' };
      PropertyCard.findByIdAndUpdate.mockResolvedValue(updatedPropertyCard);

      const response = await request(app).put('/property-cards/card1').send({ community: 'Community B', building: 'Building 2', unitNo: '102' });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Property card updated successfully');
      expect(response.body.propertyCard).toEqual(updatedPropertyCard);
    });

    it('should return 404 if the property card is not found', async () => {
      PropertyCard.findByIdAndUpdate.mockResolvedValue(null);

      const response = await request(app).put('/property-cards/card1').send({ community: 'Community B', building: 'Building 2', unitNo: '102' });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Property card not found');
    });

    it('should return 500 if there is an error updating the property card', async () => {
      PropertyCard.findByIdAndUpdate.mockRejectedValue(new Error('Database error'));

      const response = await request(app).put('/property-cards/card1').send({ community: 'Community B', building: 'Building 2', unitNo: '102' });

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Error updating property card');
    });
  });

  // Test DELETE /property-cards/:id
  describe('DELETE /property-cards/:id', () => {
    it('should delete a property card successfully', async () => {
      const propertyCardToDelete = { _id: 'card1', community: 'Community A', building: 'Building 1', unitNo: '101' };
      PropertyCard.findByIdAndDelete.mockResolvedValue(propertyCardToDelete);

      const response = await request(app).delete('/property-cards/card1').set('Authorization', 'Bearer token');

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Property card deleted successfully');
    });

    it('should return 404 if the property card is not found', async () => {
      PropertyCard.findByIdAndDelete.mockResolvedValue(null);

      const response = await request(app).delete('/property-cards/card1').set('Authorization', 'Bearer token');

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Property card not found');
    });

    it('should return 500 if there is an error deleting the property card', async () => {
      PropertyCard.findByIdAndDelete.mockRejectedValue(new Error('Database error'));

      const response = await request(app).delete('/property-cards/card1').set('Authorization', 'Bearer token');

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Error deleting property card');
    });
  });
});
