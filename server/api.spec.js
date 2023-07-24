/* globals describe beforeAll afterAll it expect */
const request = require('supertest');
const express = require('express');
const ChangeRoutes = require('./routes/index');
const mongoose = require('mongoose');
const Change = require('./models/change');

describe('Change API', () => {
  let app;

  beforeAll(async () => {
    mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true });
    app = express();
    app.use(express.json());
    app.use('/changes', ChangeRoutes);
  });

  afterAll(async () => {
    await Change.deleteMany();
    await mongoose.connection.close();
  });

  it('should list all changes on /changes GET', async () => {
    const res = await request(app).get('/changes');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('should add a change on /changes POST', async () => {
    const res = await request(app)
      .post('/changes')
      .send({ propertyA: 5, propertyB: 'value1', propertyC: '2023-01-01' }); // propertyA is now 5
    expect(res.statusCode).toEqual(201);
    expect(res.body.propertyA).toEqual(5); // Expecting 5 now
    expect(res.body.propertyB).toEqual('value1');
    expect(res.body.propertyC).toEqual('2023-01-01');
  });
  
  it('should update a change on /changes/:id PUT', async () => {
    const change = new Change({ propertyA: 5, propertyB: 'value1', propertyC: '2023-01-01' }); // propertyA is now 5
    await change.save();
    const res = await request(app)
      .put(`/changes/${change._id}`)
      .send({ propertyA: 6, propertyB: 'value2', propertyC: '2023-02-02' }); // propertyA is now 6
    expect(res.statusCode).toEqual(200);
    expect(res.body.propertyA).toEqual(6); // Expecting 6 now
    expect(res.body.propertyB).toEqual('value2');
    expect(res.body.propertyC).toEqual('2023-02-02');
  });
  
  it('should delete a change on /changes/:id DELETE', async () => {
    const change = new Change({ propertyA: 5, propertyB: 'value1', propertyC: '2023-01-01' }); // propertyA is now 5
    await change.save();
    const res = await request(app).delete(`/changes/${change._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Change removed');
  });
  
});
