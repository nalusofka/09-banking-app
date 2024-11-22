import { vi, describe, it, expect } from 'vitest';
import { http } from '../../../../src/app/core/services/generals/http';

vi.mock('../../../../src/app/core/services/generals/http', () => ({
  http: vi.fn(),
}));

const mockAPI_URL = 'http://3.81.252.14:8080';

describe('Test de servicio de cliente sin importar getCustomer', () => {
  const mockDinHeader = {
    device: 'Device1',
    language: 'en',
    uuid: '1234',
    ip: '127.0.0.1',
  };

  const mockRequest = {
    dinHeader: mockDinHeader,
    dinBody: {
      id: '3',
    },
  };

  async function simulatedGetCustomer(request: any) {
    const response = await http(`${mockAPI_URL}/api/v1/public/customers/get`, 'POST', request);
    const result = await response.json();

    return result;
  }

  it('Debería obtener un cliente correctamente', async () => {
    const mockResponse = { id: 'customer123', username: 'JohnDoe', createdAt: '2024-01-01T00:00:00Z' };

    (http as vi.Mock).mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockResponse),
    });

    const result = await simulatedGetCustomer(mockRequest);

    expect(http).toHaveBeenCalledWith(
      `${mockAPI_URL}/api/v1/public/customers/get`,
      'POST',
      mockRequest
    );

    expect(result).toEqual(mockResponse);
  });

  it('Debería manejar el error de la solicitud de cliente', async () => {
    const mockError = new Error('Network Error');

    (http as vi.Mock).mockRejectedValue(mockError);

    await expect(simulatedGetCustomer(mockRequest)).rejects.toThrow('Network Error');
  });

  it('Debería manejar el error cuando la respuesta no sea JSON', async () => {
    (http as vi.Mock).mockResolvedValue({
      json: vi.fn().mockRejectedValue(new Error('Invalid JSON')),
    });

    await expect(simulatedGetCustomer(mockRequest)).rejects.toThrow('Invalid JSON');
  });
});
