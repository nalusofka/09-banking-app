import { vi, describe, it, expect } from 'vitest';
import { http } from '../../../../../src/app/core/services/generals/http';
import { HTTP_METHODS } from '../../../../../src/app/core/constants/httpMethods';

global.fetch = vi.fn();

describe('Test de la función http', () => {
  const mockURL = 'http://example.com/api/test';
  const mockToken = 'testToken123';
  const mockData = { key: 'value' };

  it('Debería realizar una solicitud GET correctamente', async () => {
    const mockResponse = { success: true };

    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce(mockResponse),
    });

    const result = await http(mockURL, HTTP_METHODS.GET, undefined, mockToken);

    expect(fetch).toHaveBeenCalledWith(mockURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${mockToken}`,
      },
      body: undefined,
    });

    expect(result).toEqual(mockResponse);
  });

  it('Debería realizar una solicitud POST con datos correctamente', async () => {
    const mockResponse = { id: 1 };

    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce(mockResponse),
    });

    const result = await http(mockURL, HTTP_METHODS.POST, mockData, mockToken);

    expect(fetch).toHaveBeenCalledWith(mockURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${mockToken}`,
      },
      body: JSON.stringify(mockData),
    });

    expect(result).toEqual(mockResponse);
  });

  it('Debería lanzar un error si la respuesta HTTP no es exitosa', async () => {
    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    await expect(http(mockURL, HTTP_METHODS.GET, undefined, mockToken)).rejects.toThrow('HTTP error! status: 404');
  });

  it('Debería lanzar un error si ocurre un problema con fetch', async () => {
    (fetch as vi.Mock).mockRejectedValueOnce(new Error('Network Error'));

    await expect(http(mockURL, HTTP_METHODS.GET, undefined, mockToken)).rejects.toThrow('Network Error');
  });

  it('Debería manejar solicitudes sin token y sin datos', async () => {
    const mockResponse = { success: true };

    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce(mockResponse),
    });

    const result = await http(mockURL, HTTP_METHODS.GET);

    expect(fetch).toHaveBeenCalledWith(mockURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: undefined,
    });

    expect(result).toEqual(mockResponse);
  });
});
