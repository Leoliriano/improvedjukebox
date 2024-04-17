const authMiddleware = require('../../src/middleware/authenticate');
const httpMocks = require('node-mocks-http');

describe('Authentication Middleware', () => {
  test('should return 401 if no authentication token is present', () => {
    const req = httpMocks.createRequest({
      method: 'GET',
      url: '/api/posts',
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    authMiddleware(req, res, next);
    expect(res.statusCode).toBe(401);
    expect(res._getData()).toEqual({ message: 'No token provided' });
  });
});
