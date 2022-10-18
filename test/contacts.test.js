const app = require('../app.js')
const request = require('supertest')

//need for testing routes protected
let adminToken = ''

//get user token with roleId 1 (admin). User is based in demo user created with seeder.
beforeAll(async () => {
    const res = await request(app).post('/users/auth/login').send({
        email: "test@test.com",
        password: "12345678"
    })
    adminToken = res.body.token
})

//TESTS
describe('GET /contacts', () => {
    it('It should return status code 200', async() => {
        const res = await request(app).get('/contacts').set('Authorization', `Bearer ${adminToken}`)

        expect(res.status).toBe(200)
    })

    it('It should response an array of objects, each one with properties "name", "phone", "email" & "message"', async() => {
        const res = await request(app).get('/contacts').set('Authorization', `Bearer ${adminToken}`)

        //Must be an array
        expect(res.body).toBeInstanceOf(Array)

        //Each contact must contain properties "name", "phone", "email" & "message"
        res.body.map(contact => {
            expect(contact).toHaveProperty('name')
            expect(contact).toHaveProperty('phone')
            expect(contact).toHaveProperty('email')
            expect(contact).toHaveProperty('message')
        })
    })
})
