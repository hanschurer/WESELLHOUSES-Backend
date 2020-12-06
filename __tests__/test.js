const request = require('supertest')
const server = require('../app').callback()
const app = request(server)
it('should login', async () => {
  const res = await app.post('/api/v1/login').send({
    username: 'admin',
    password: 'admin111'
  })
  expect(res.statusCode).toEqual(200)
  expect(res.body.username).toEqual('admin')
})

it('should get user', async () => {
  const res = await app.post('/api/v1/login').send({
    username: 'admin',
    password: 'admin111'
  })
  const user = await app
    .get('/api/v1/user/' + res.body._id)
    .set('authorization', res.body.token)
    .set('uid', res.body._id)
    .send()
  expect(user.statusCode).toEqual(200)
})

it('should get items', async () => {
  const res = await app.post('/api/v1/login').send({
    username: 'admin',
    password: 'admin111'
  })
  const data = await app
    .post('/api/v1/items')
    .set('authorization', res.body.token)
    .set('uid', res.body._id)
    .send()
  expect(data.statusCode).toEqual(200)
})

it('should get msgs', async () => {
  const res = await app.post('/api/v1/login').send({
    username: 'admin',
    password: 'admin111'
  })
  const data = await app
    .get('/api/v1/msgs')
    .set('authorization', res.body.token)
    .set('uid', res.body._id)
    .send()
  expect(data.statusCode).toEqual(200)
})

it('should get item', async () => {
  const res = await app.post('/api/v1/login').send({
    username: 'admin',
    password: 'admin111'
  })
  const items = await app
    .post('/api/v1/items')
    .set('authorization', res.body.token)
    .set('uid', res.body._id)
    .send()
  const data = await app
    .get('/api/v1/item/' + items.body[0]._id)
    .set('authorization', res.body.token)
    .set('uid', res.body._id)
    .send()
  expect(data.statusCode).toEqual(200)
})
