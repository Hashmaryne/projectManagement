import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import Auth from '../middleware/auth.js';
import Lead from '../models/leadModel.js';
import PropertyCard from '../models/propertyCardModel.js';
import router from '../routes/leadRoute.js';

const app = express();
app.use(express.json());
app.use('/leads', router);

// Mock models and middleware
jest.mock('../models/leadModel.js');
jest.mock('../models/propertyCardModel.js');
jest.mock('../middleware/auth.js');

describe('Lead Router', () => {
    beforeAll(async () => {
        mongoose.connect = jest.fn().mockResolvedValue(true);
        mongoose.connection.close = jest.fn().mockResolvedValue(true);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    describe('POST /leads', () => {
        it('should create a new lead successfully', async () => {
            Auth.authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 'userId' };
                next();
            });
            Lead.prototype.save.mockResolvedValueOnce();
            PropertyCard.updateMany.mockResolvedValueOnce();

            const response = await request(app)
                .post('/leads')
                .send({ name: 'John Doe', email: 'john@example.com', propertyCardIds: ['card1', 'card2'] });

            console.log(response.body); // Debugging information

            expect(response.status).toBe(201);
            expect(response.body.message).toBe('Lead created successfully');
        });

        it('should return 500 if there is an error creating the lead', async () => {
            Auth.authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 'userId' };
                next();
            });
            Lead.prototype.save.mockRejectedValueOnce(new Error('Database error'));

            const response = await request(app)
                .post('/leads')
                .send({ name: 'John Doe', email: 'john@example.com', propertyCardIds: ['card1', 'card2'] });

            console.log(response.body); // Debugging information

            expect(response.status).toBe(500);
            expect(response.body.message).toBe('Error creating lead');
        });
    });

    describe('PUT /leads/:id', () => {
        it('should update an existing lead successfully', async () => {
            Auth.authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 'userId' };
                next();
            });
            Lead.findByIdAndUpdate.mockResolvedValueOnce({ _id: '66a06edf54cb58e60f9cbbe3', name: 'John Doe', email: 'john@example.com', propertyCards: ['card1', 'card2'] });

            const response = await request(app)
                .put('/leads/leadId')
                .send({ name: 'John Doe', email: 'john@example.com', propertyCardIds: ['card1', 'card2'] });

            console.log(response.body); // Debugging information

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Lead updated successfully');
            expect(response.body.lead.name).toBe('John Doe');
            expect(response.body.lead.email).toBe('john@example.com');
        });

        it('should return 404 if the lead is not found', async () => {
            Auth.authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 'userId' };
                next();
            });
            Lead.findByIdAndUpdate.mockResolvedValueOnce(null);

            const response = await request(app)
                .put('/leads/leadId')
                .send({ name: 'John Doe', email: 'john.updated@example.com', propertyCardIds: ['card1', 'card2'] });

            console.log(response.body); // Debugging information

            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Lead not found');
        });

        it('should return 500 if there is an error updating the lead', async () => {
            Auth.authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 'userId' };
                next();
            });
            Lead.findByIdAndUpdate.mockRejectedValueOnce(new Error('Database error'));

            const response = await request(app)
                .put('/leads/leadId')
                .send({ name: 'John Doe', email: 'john.@example.com', propertyCardIds: ['card1', 'card2'] });

            console.log(response.body); // Debugging information

            expect(response.status).toBe(500);
            expect(response.body.message).toBe('Error updating lead');
        });
    });

    describe('DELETE /leads/:id', () => {
        it('should delete an existing lead successfully', async () => {
            Auth.authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 'userId' };
                next();
            });
            Lead.findByIdAndDelete.mockResolvedValueOnce({ _id: 'leadId', propertyCards: ['card1', 'card2'] });
            PropertyCard.updateMany.mockResolvedValueOnce();

            const response = await request(app).delete('/leads/leadId');

            console.log(response.body); // Debugging information

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Lead deleted successfully');
        });

        it('should return 404 if the lead is not found', async () => {
            Auth.authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 'userId' };
                next();
            });
            Lead.findByIdAndDelete.mockResolvedValueOnce(null);

            const response = await request(app).delete('/leads/leadId');

            console.log(response.body); // Debugging information

            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Lead not found');
        });

        it('should return 500 if there is an error deleting the lead', async () => {
            Auth.authenticateToken.mockImplementation((req, res, next) => {
                req.user = { id: 'userId' };
                next();
            });
            Lead.findByIdAndDelete.mockRejectedValueOnce(new Error('Database error'));

            const response = await request(app).delete('/leads/leadId');

            console.log(response.body); // Debugging information

            expect(response.status).toBe(500);
            expect(response.body.message).toBe('Error deleting lead');
        });
    });

    describe('GET /leads/:id', () => {
        it('should retrieve an existing lead successfully', async () => {
            Lead.findById.mockResolvedValueOnce({ _id: 'leadId', name: 'John Doe', email: 'john@example.com', propertyCards: ['card1', 'card2'] });

            const response = await request(app).get('/leads/leadId');

            console.log(response.body); // Debugging information

            expect(response.status).toBe(200);
            expect(response.body.name).toBe('John Doe');
            expect(response.body.email).toBe('john@example.com');
        });

        it('should return 404 if the lead is not found', async () => {
            Lead.findById.mockResolvedValueOnce(null);

            const response = await request(app).get('/leads/leadId');

            console.log(response.body); // Debugging information

            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Property card not found');
        });

        it('should return 500 if there is an error retrieving the lead', async () => {
            Lead.findById.mockRejectedValueOnce(new Error('Database error'));

            const response = await request(app).get('/leads/leadId');

            console.log(response.body); // Debugging information

            expect(response.status).toBe(500);
            expect(response.body.message).toBe('Error retrieving property card');
        });
    });

    describe('GET /leads', () => {
        it('should retrieve all leads successfully', async () => {
            Lead.find.mockResolvedValueOnce([{ _id: 'leadId', name: 'John Doe', email: 'john@example.com', propertyCards: ['card1', 'card2'] }]);
      
            const response = await request(app).get('/leads');
            console.log(response.error);
            expect(response.status).toBe(200);
            expect(response.body.length).toBeGreaterThan(0);
          });

        it('should return 500 if there is an error retrieving the leads', async () => {
            const response = await request(app).get('/leads');

            expect(response.status).toBe(500);
            expect(response.body.message).toBe('Error retrieving leads');
        });
    });
});
