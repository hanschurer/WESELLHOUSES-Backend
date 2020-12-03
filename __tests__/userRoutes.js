const request = require('supertest')
const app = require('../app')

describe('Post new user', () => {
  it('should create a new user', async () => {
    const res = await request(app.callback())
      .post('/api/v1/users')
      .send({
        username: 'tttest',
        password: '123',
        email: 'unique_email@example.com'
      })
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('created', true)
  })
});
