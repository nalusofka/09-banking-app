import { login, register } from '../../../../src/app/core/services/auth.service';
import { http } from '../../../../src/app/core/services/generals/http';
import { vi, it, expect, describe } from 'vitest';

vi.mock('../../../../src/app/core/services/generals/http', () => ({
  http: vi.fn(),
}));

describe('Auth Service', () => {
  const mockAPI_URL = 'http://3.81.252.14:8080';
  const mockSymmetricKey = 'MTIzNDU2Nzg5MTIzNDU2Nw==';
  const mockInitializationVector = 'MTIzNDU2Nzg5MTIzNDU2Nw==';

  it('should call login with correct payload and return data on success', async () => {
    const mockRequest = {
      dinHeader: { device: 'Device1', language: 'en', uuid: '1234', ip: '127.0.0.1' },
      dinBody: { username: 'testuser', password: 'password123' },
    };

    const mockResponse = { token: 'mockToken', user: { id: 1, username: 'testuser' } };

    (http as vi.Mock).mockResolvedValue(mockResponse);

    const result = await login(mockRequest);

    expect(http).toHaveBeenCalledWith(
      `${mockAPI_URL}/auth/v1/login`,
      'POST',
      {
        dinHeader: {
          device: 'Device1',
          language: 'en',
          uuid: '1234',
          ip: '127.0.0.1',
          transactionTime: expect.any(String),
          symmetricKey: mockSymmetricKey,
          initializationVector: mockInitializationVector,
        },
        dinBody: {
          username: 'testuser',
          password: 'password123',
        },
      },
      undefined
    );
    expect(result).toEqual(mockResponse);
  });

  it('should call register with correct payload and return data on success', async () => {
    const mockRequest = {
      dinHeader: { device: 'Device2', language: 'es', uuid: '5678', ip: '192.168.0.1' },
      dinBody: { username: 'newuser', password: 'password123', name: 'Test', lastname: 'User', roles: ['admin'] },
    };

    const mockResponse = { token: 'mockToken', user: { id: 2, username: 'newuser' } };

    (http as vi.Mock).mockResolvedValue(mockResponse);

    const result = await register(mockRequest);

    expect(http).toHaveBeenCalledWith(
      `${mockAPI_URL}/auth/v1/register`,
      'POST',
      {
        dinHeader: {
          device: 'Device2',
          language: 'es',
          uuid: '5678',
          ip: '192.168.0.1',
          transactionTime: expect.any(String),
          symmetricKey: mockSymmetricKey,
          initializationVector: mockInitializationVector,
        },
        dinBody: {
          username: 'newuser',
          password: 'password123',
          name: 'Test',
          lastname: 'User',
          roles: ['admin'],
        },
      },
      undefined
    );
    expect(result).toEqual(mockResponse);
  });

  it('should handle errors during login', async () => {
    const mockRequest = {
      dinHeader: { device: '', language: '', uuid: '', ip: '' },
      dinBody: { username: '', password: '' },
    };

    const mockError = new Error('Login failed');
    (http as vi.Mock).mockRejectedValue(mockError);

    await expect(login(mockRequest)).rejects.toThrow('Login failed');
  });

  it('should handle errors during register', async () => {
    const mockRequest = {
      dinHeader: { device: '', language: '', uuid: '', ip: '' },
      dinBody: { username: '', password: '', name: '', lastname: '', roles: [] },
    };

    const mockError = new Error('Register failed');
    (http as vi.Mock).mockRejectedValue(mockError);

    await expect(register(mockRequest)).rejects.toThrow('Register failed');
  });
});
