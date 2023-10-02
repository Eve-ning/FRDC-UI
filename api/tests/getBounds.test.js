const request = require('supertest');
const express = require('express');
const router = require('../routes/getBounds');  // replace with actual path to your router

const app = express();
app.use(router);

describe('Bounds route handlers', () => {
    test('should respond with data for GET /', async () => {
        const response = request(app).get('/');
        expect(response.statusCode).toBe(200);
        // Here, you can add more assertions based on your expected response
        // For example: expect(response.body).toEqual(expectedData);
    });
});