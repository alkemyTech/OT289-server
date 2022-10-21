const app = require('../app.js')
const request = require('supertest')
const { faker } = require('@faker-js/faker/locale/es_MX')

describe('POST /users/auth/login', () => {

    const realUser = {
        email: 'pedro_vila@protonmail.net',
        password: 'pidegela72'
    }

    const fakeUser = {
        email: 'cosme_fultanito@gmail.com',
        password: 'callefalsa1234'
    }

    describe('Authentication', () => {

        test('should be 400 status code if exist but nothing is sent', async() => {
            const response = await request(app).post('/users/auth/login').send()
            expect(response.status).toBe(400)
        })

        test('should be 400 status code if user data if user data is sent', async() => {
            const response = await request(app).post('/users/auth/login').send(fakeUser)
            expect(response.status).toBe(400)
        })

        test("should return application/json exist in headers", async() => {
            const response = await request(app).post('/users/auth/login').send(realUser)
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
        })
      
        test('should be 200 status code if user data is correct', async() => {
            const response = await request(app).post('/users/auth/login').send(realUser)
            expect(response.status).toBe(200)
        })

        test('should return a token if user data is correct', async() => {
            const response = await request(app).post('/users/auth/login').send(realUser)
            expect(response.body.token).toBeDefined()
        })
    })


})

describe('POST /users/auth/register', () => {

    const signUpData = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password:faker.internet.password()
    }

    describe('Sign up', () => {

        test('should be 400 status code if exist but nothing is sent', async() => {
            const response = await request(app).post('/users/auth/register').send()
            expect(response.status).toBe(400)
        })

        test("should return application/json if sign up data is sent", async() => {
            const response = await request(app).post('/users/auth/register').send(signUpData)
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
        })
      
        test('should be 200 status code if sign up data is correct', async() => {
            const response = await request(app).post('/users/auth/register').send(signUpData)
            expect(response.status).toBe(200)
        })

        test('If petition was OK, then the member data is going to be passed in the body', async() => {
            const response = await request(app).post('/users/auth/register').send(signUpData)
            expect(response.body.token).toBeDefined()
        })
    })

})

describe('POST /users/auth/checkEmail', () => {

    const realEmail = {email: 'pedro_vila@protonmail.net'}

    const fakeEmail = {email: 'cosme_fultanito@gmail.com'}

    describe('Validation email', () => {

        test('should be 400 status code if exist but nothing is sent', async() => {
            const response = await request(app).post('/users/auth/checkEmail').send()
            expect(response.status).toBe(400)
        })

        test("should be 200 status code if email doesn't exist", async() => {
            const response = await request(app).post('/users/auth/checkEmail').send(fakeEmail)
            expect(response.status).toBe(200)
        })

        test("should return false if email doesn't exist", async() => {
            const response = await request(app).post('/users/auth/checkEmail').send(fakeEmail)
            expect(response.body.emailExist).toBeFalsy()
        })

        test("should pass if application/json email is sent", async() => {
            const response = await request(app).post('/users/auth/checkEmail').send(realEmail)
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
        })
      
        test('should be 200 status code if email exists', async() => {
            const response = await request(app).post('/users/auth/checkEmail').send(realEmail)
            expect(response.status).toBe(200)
        })

        test("should return true if email exists", async() => {
            const response = await request(app).post('/users/auth/checkEmail').send(realEmail)
            expect(response.body.emailExist).toBeTruthy()
        })
    })


})

describe('POST /users/auth/checkPassword', () => {

    const realUser = {
        email: 'pedro_vila@protonmail.net',
        password: 'pidegela72'
    }

    const fakeUser = {
        email: 'cosme_fultanito@gmail.com',
        password: 'callefalsa1234'
    }

    describe('Validation email and password', () => {

        test('should be 400 status code if exist but nothing is sent', async() => {
            const response = await request(app).post('/users/auth/checkPassword').send()
            expect(response.status).toBe(400)
        })

        test("should be 400 status code if either email or password don't match", async() => {
            const response = await request(app).post('/users/auth/checkPassword').send(fakeUser)
            expect(response.status).toBe(200)
        })

        test("should return false if either email or password don't match", async() => {
            const response = await request(app).post('/users/auth/checkPassword').send(fakeUser)
            expect(response.body.passwordCorrect).toBeFalsy()
        })

        test("should return application/json exist in headers", async() => {
            const response = await request(app).post('/users/auth/checkPassword').send(realUser)
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
        })
      
        test('should be 200 status code if email and password match', async() => {
            const response = await request(app).post('/users/auth/checkPassword').send(realUser)
            expect(response.status).toBe(200)
        })

        test('should return true if email and password match', async() => {
            const response = await request(app).post('/users/auth/checkPassword').send(realUser)
            expect(response.body.passwordCorrect).toBeTruthy()
        })
    })


})