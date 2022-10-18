const app = require('../app.js')
const request = require('supertest')

//need for testing protected routes
let adminToken = ''
let userToken = ''

//get users token. Users are based in demo users created with seeder.
beforeAll(async () => {
    const resAdmin = await request(app).post('/users/auth/login').send({
        email: "admin@test.com",
        password: "12345678"
    })
    adminToken = resAdmin.body.token

    const resUser = await request(app).post('/users/auth/login').send({
        email: "usuario@test.com",
        password: "12345678"
    })
    userToken = resUser.body.token
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

    describe('Admin token validations', () => {
        it('It should return status code 401 (Unauthorized) if no token is passed', async() => {
            const res = await request(app).get('/contacts')
    
            expect(res.status).toBe(401)
        })
    
        it('It should return status code 401 (Unauthorized) if no valid token is passed', async() => {
            const invalidAdminToken = '1234'
            const res = await request(app).get('/contacts').set('Authorization', `Bearer ${invalidAdminToken}`)
    
            expect(res.status).toBe(401)
        })

        it('It should return status code 401 (Unauthorized) if roleId !== 1', async() => {
            const res = await request(app).get('/contacts').set('Authorization', `Bearer ${userToken}`)
    
            expect(res.status).toBe(401)
        })
    })
})
