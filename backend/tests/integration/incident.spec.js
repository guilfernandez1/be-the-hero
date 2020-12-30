const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('Incident', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
       await connection.destroy();
    });

    it('should be able to create a new Incident', async () => {
        const response = await request(app)
        .post('/incidents')
        .set('Authorization', '9ba12b1e')
        .send({
            title: "Caso 12",
            description: "Cadelinha machucada",
            value: 179,
        });
        expect(response.body).toHaveProperty('id');
    });
});