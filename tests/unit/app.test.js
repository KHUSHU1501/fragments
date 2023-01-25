// tests/unit/app.test.js

const request = require('supertest');

const app = require('../../src/app');

describe('404 middleware', () => {
  //for resources that can't be found it should be handled by 404 middleware
  test('requests for resourses that cant be found are denied', () =>
    request(app).get('/resourseNotFound').expect(404));
});
