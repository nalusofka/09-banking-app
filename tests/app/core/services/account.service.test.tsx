import { createBankAccount, getBankAccount, deleteBankAccount, getCustomerAccounts } from '../../../../src/app/core/services/account.service';
import { http } from '../../../../src/app/core/services/generals/http';
import { vi, it, expect, describe } from 'vitest';

vi.mock('../../../../src/app/core/services/generals/http', () => ({
  http: vi.fn(),
}));

describe('Servicio de cuentas bancarias', () => {
    const mockAPI_URL = 'http://3.81.252.14:8080';
    const mockSymmetricKey = 'MTIzNDU2Nzg5MTIzNDU2Nw==';
    const mockInitializationVector = 'MTIzNDU2Nzg5MTIzNDU2Nw==';

  const mockDinHeader = {
    device: 'Device1',
    language: 'en',
    uuid: '1234',
    ip: '127.0.0.1',
  };

  it('deberia llamar a createBankAccount con el payload correcto y devolver datos en caso de éxito', async () => {
    const mockRequest = {
      dinHeader: mockDinHeader,
      dinBody: { customerId: 'customer123', amount: 1000 },
    };
    const mockResponse = { id: 'account123', balance: 1000 };

    (http as vi.Mock).mockResolvedValue(mockResponse);

    const result = await createBankAccount(mockRequest);

    expect(http).toHaveBeenCalledWith(
      `${mockAPI_URL}/api/v1/public/bank-accounts`,
      'POST',
      {
        dinHeader: {
          ...mockDinHeader,
          transactionTime: expect.any(String),
          symmetricKey: mockSymmetricKey,
          initializationVector: mockInitializationVector,
        },
        dinBody: {
          customerId: 'customer123',
          amount: 1000,
        },
      }
    );
    expect(result).toEqual(mockResponse);
  });

  it('deberia llamar a getBankAccount con el payload correcto y devolver datos en caso de éxito', async () => {
    const mockRequest = {
      dinHeader: mockDinHeader,
      dinBody: { id: 'account123' },
    };
    const mockResponse = { id: 'account123', balance: 2000 };

    (http as vi.Mock).mockResolvedValue(mockResponse);

    const result = await getBankAccount(mockRequest);

    expect(http).toHaveBeenCalledWith(
      `${mockAPI_URL}/api/v1/public/bank-accounts/get`,
      'POST',
      {
        dinHeader: {
          ...mockDinHeader,
          transactionTime: expect.any(String),
          symmetricKey: mockSymmetricKey,
          initializationVector: mockInitializationVector,
        },
        dinBody: {
          id: 'account123',
        },
      }
    );
    expect(result).toEqual(mockResponse);
  });

  it('deberia llamar a deleteBankAccount con el payload correcto y devolver datos en caso de éxito', async () => {
    const mockRequest = {
      dinHeader: mockDinHeader,
      dinBody: { id: 'account123' },
    };
    const mockResponse = { message: 'Account deleted successfully' };

    (http as vi.Mock).mockResolvedValue(mockResponse);

    const result = await deleteBankAccount(mockRequest);

    expect(http).toHaveBeenCalledWith(
      `${mockAPI_URL}/api/v1/public/bank-accounts/delete`,
      'POST',
      {
        dinHeader: {
          ...mockDinHeader,
          transactionTime: expect.any(String),
          symmetricKey: mockSymmetricKey,
          initializationVector: mockInitializationVector,
        },
        dinBody: {
          id: 'account123',
        },
      }
    );
    expect(result).toEqual(mockResponse);
  });

  it('deberia llamar a getCustomerAccounts con el payload correcto y devolver datos en caso de éxito', async () => {
    const mockRequest = {
      dinHeader: mockDinHeader,
      dinBody: { id: 'customer123' },
    };
    const mockResponse = [
      { id: 'account1', balance: 1000 },
      { id: 'account2', balance: 2000 },
    ];

    (http as vi.Mock).mockResolvedValue(mockResponse);

    const result = await getCustomerAccounts(mockRequest);

    expect(http).toHaveBeenCalledWith(
      `${mockAPI_URL}/api/v1/public/bank-accounts/customer/get-accounts`,
      'POST',
      {
        dinHeader: {
          ...mockDinHeader,
          transactionTime: expect.any(String),
          symmetricKey: mockSymmetricKey,
          initializationVector: mockInitializationVector,
        },
        dinBody: {
          id: 'customer123',
        },
      }
    );
    expect(result).toEqual(mockResponse);
  });

  it('deberia manejar errores correctamente en createBankAccount', async () => {
    const mockRequest = {
      dinHeader: mockDinHeader,
      dinBody: { customerId: 'customer123', amount: 1000 },
    };
    const mockError = new Error('Request failed');

    (http as vi.Mock).mockRejectedValue(mockError);

    await expect(createBankAccount(mockRequest)).rejects.toThrow(
      'Error en la solicitud de cuenta bancaria: Request failed'
    );
  });

  it('deberia manejar errores correctamente en getBankAccount', async () => {
    const mockRequest = {
      dinHeader: mockDinHeader,
      dinBody: { id: 'account123' },
    };
    const mockError = new Error('Request failed');

    (http as vi.Mock).mockRejectedValue(mockError);

    await expect(getBankAccount(mockRequest)).rejects.toThrow(
      'Error en la solicitud de cuenta bancaria: Request failed'
    );
  });
});
