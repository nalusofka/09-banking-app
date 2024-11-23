/* eslint-disable @typescript-eslint/no-require-imports */
import { renderHook } from "@testing-library/react";
import { vi } from "vitest";
import { MockAppContextProvider } from "../../../../../src/app/core/state/MockAppContext";
import { createBankAccount } from "../../../../../src/app/core/services/account.service";
import { useCreateBankAccount } from "../../../../../src/app/core/hooks/account/useCreateBankAccount";
import React from "react";

vi.mock("../../../../../src/app/core/services/account.service", () => ({
    createBankAccount: vi.fn(),
}));

describe("useCreateBankAccount", () => {
    const mockState = {
        account: {
            bankAccounts: [],
        },
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("debería llamar a createBankAccount con los parámetros correctos y despachar las acciones correspondientes", async () => {
        const mockDispatch = vi.fn();
        const mockPayload = {
            dinHeader: { authorization: "Bearer token" },
            dinBody: { customerId: "12345", amount: 1000 },
        };

        const mockResponse = { id: "1", customerId: "12345", amount: 1000 };

        (createBankAccount as vi.Mock).mockResolvedValue(mockResponse);

        const { result } = renderHook(() => useCreateBankAccount(), {
            wrapper: ({ children }: { children: React.ReactNode }) => (
                <MockAppContextProvider
                    state={mockState}
                    dispatch={mockDispatch}
                >
                    {children}
                </MockAppContextProvider>
            ),
        });

        await result.current.handleCreateBankAccount(mockPayload);

        expect(createBankAccount).toHaveBeenCalledWith(mockPayload);
        expect(mockDispatch).toHaveBeenCalledWith(
            expect.objectContaining({
                type: "CREATE_BANK_ACCOUNT_REQUEST",
                payload: mockPayload,
            })
        );
        expect(mockDispatch).toHaveBeenCalledWith(
            expect.objectContaining({
                type: "CREATE_BANK_ACCOUNT_SUCCESS",
                payload: mockResponse,
            })
        );
    });

    it("debería despachar CREATE_BANK_ACCOUNT_FAILURE si el servicio falla", async () => {
        const mockDispatch = vi.fn();
        const mockPayload = {
            dinHeader: { authorization: "Bearer token" },
            dinBody: { customerId: "12345", amount: 1000 },
        };

        const mockError = "Error creating account";

        (createBankAccount as vi.Mock).mockRejectedValue(mockError);

        const { result } = renderHook(() => useCreateBankAccount(), {
            wrapper: ({ children }: { children: React.ReactNode }) => (
                <MockAppContextProvider
                    state={mockState}
                    dispatch={mockDispatch}
                >
                    {children}
                </MockAppContextProvider>
            ),
        });

        await result.current.handleCreateBankAccount(mockPayload);

        expect(createBankAccount).toHaveBeenCalledWith(mockPayload);
        expect(mockDispatch).toHaveBeenCalledWith(
            expect.objectContaining({
                type: "CREATE_BANK_ACCOUNT_REQUEST",
                payload: mockPayload,
            })
        );
        expect(mockDispatch).toHaveBeenCalledWith(
            expect.objectContaining({
                type: "CREATE_BANK_ACCOUNT_FAILURE",
                payload: mockError,
            })
        );
    });
});
