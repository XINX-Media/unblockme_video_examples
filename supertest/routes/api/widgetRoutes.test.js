const request = require('supertest');

const app = require('../../app');

describe('widgetRoutes', () => {
    describe('GET /widget', () => {
        it('should return expected widgets', async () => {
            const response = await request(app)
                .get('/api/widget');

            expect(response.status).toEqual(200);
            expect(response.body.length).toEqual(5);
            expect(response.body[0]).toEqual({
                "available": true,
                "description": "Displays the current weather conditions and forecast.",
                "id": 1,
                "name": "Weather Widget",
                "price": 19.99,
            });
        });
    });

    describe('POST /widget', () => {
        it('should add expected widgets', async () => {
            let response = await request(app)
               .post('/api/widget')
               .send({
                    name: 'Test Widget',
                    description: 'This is a test widget',
                    price: 9.99,
                    available: false,
                })
                .set('Authentication', 'mytoken');

            expect(response.status).toEqual(200);

            response = await request(app)
                .get('/api/widget');

            expect(response.status).toEqual(200);
            expect(response.body.length).toEqual(6);
        });

        it('should fail if no auth provided', async () => {
            const response = await request(app)
               .post('/api/widget')
               .send({
                    name: 'Test Widget',
                    description: 'This is a test widget',
                    price: 9.99,
                    available: false,
                });

            expect(response.status).toEqual(401);
        });

        it('should fail if no name provided', async () => {
            const response = await request(app)
               .post('/api/widget')
               .send({
                    description: 'This is a test widget',
                    price: 9.99,
                    available: false,
                })
                .set('Authentication', 'mytoken');

            expect(response.status).toEqual(400);
            expect(response.body).toEqual({ message: "Widget name is required" });
        });
    });
});