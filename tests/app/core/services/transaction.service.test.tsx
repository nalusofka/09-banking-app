import { vi, describe, it, expect, beforeEach } from 'vitest';
import { withdraw, purchaseCard, deposit } from '../../../../src/app/core/services/transaction.service';
import '@testing-library/jest-dom';

global.fetch = vi.fn();

const mockResponse = {
    transactionId: 'txn123',
    status: 'SUCCESS',
    message: 'Transaction completed',
};

beforeEach(() => {
    vi.stubGlobal('localStorage', {
        getItem: vi.fn((key) => {
            if (key === 'testToken') {
                return 'testToken';
            }
            if (key === 'username') {
                return 'testUser';
            }
            return null;
        }),
        setItem: vi.fn(),
        removeItem: vi.fn(),
    });

    vi.stubEnv('VITE_API_URL', 'http://3.81.252.14:8080');
    vi.stubEnv('VITE_SYMMETRIC_KEY', 'MTIzNDU2Nzg5MTIzNDU2Nw==');
    vi.stubEnv('VITE_INITIALIZATION_VECTOR', 'MTIzNDU2Nzg5MTIzNDU2Nw==');

    vi.clearAllMocks();
});

describe('Tests de transacciones', () => {
    const mockDinHeader = {
        device: 'Device1',
        language: 'en',
        uuid: '1234',
        ip: '127.0.0.1',
    };

    it('Debería realizar un retiro correctamente', async () => {
        const mockWithdrawRequest = {
            dinHeader: mockDinHeader,
            dinBody: {
                username: 'testUser',
                accountNumber: '1234567890',
                amount: 500,
            },
        };

        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: vi.fn().mockResolvedValueOnce(mockResponse),
        });

        const result = await withdraw(mockWithdrawRequest);

        expect(result).toEqual(mockResponse);
    });


    it('Debería manejar errores de la API', async () => {
        global.fetch.mockResolvedValueOnce({
            ok: false,
            status: 500,
        });

        await expect(
            withdraw({
                dinHeader: mockDinHeader,
                dinBody: { accountNumber: '1234567890', amount: 500 },
            }),
        ).rejects.toThrow('HTTP error! status: 500');
    });

    it('Debería realizar una compra de tarjeta correctamente', async () => {
        const mockPurchaseCardRequest = {
            dinHeader: mockDinHeader,
            dinBody: {
                accountNumber: '1234567890',
                amount: 300,
                purchaseType: 'ONLINE',
            },
        };

        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: vi.fn().mockResolvedValueOnce(mockResponse),
        });

        const result = await purchaseCard(mockPurchaseCardRequest);

        expect(result).toEqual(mockResponse);
    });

    it('Debería realizar un depósito correctamente', async () => {
        const mockDepositRequest = {
            dinHeader: mockDinHeader,
            dinBody: {
                accountNumber: '1234567890',
                amount: 700,
                type: 'ATM',
                username: 'testUser',
            },
        };

        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: vi.fn().mockResolvedValueOnce(mockResponse),
        });

        const result = await deposit(mockDepositRequest);

        expect(result).toEqual(mockResponse);
    });
});
