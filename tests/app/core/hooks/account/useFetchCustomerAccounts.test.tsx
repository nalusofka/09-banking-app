/* eslint-disable @typescript-eslint/no-require-imports */
import { renderHook } from "@testing-library/react";
import { vi } from "vitest";
import { MockAppContextProvider } from "../../../../../src/app/core/state/MockAppContext";
import { getCustomerAccounts } from "../../../../../src/app/core/services/account.service";
import { useFetchCustomerAccounts } from "../../../../../src/app/core/hooks/account/useFetchCustomerAccounts";
import React from "react";

vi.mock("../../../../../src/app/core/services/account.service", () => ({
    getCustomerAccounts: vi.fn(),
}));

describe("useFetchCustomerAccounts", () => {
    const mockState = {
        account: {
            customerAccounts: [],
        },
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <MockAppContextProvider state={mockState}>{children}</MockAppContextProvider>
    );

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("debería llamar a getCustomerAccounts y despachar las acciones correctas en caso de éxito", async () => {
        const mockDispatch = vi.fn();
        const mockPayload = {
            dinHeader: { authorization: "Bearer token" },
            dinBody: { customerId: "12345" },
        };

        const mockResponse = {
            dinBody: [
                { id: "account1", balance: 1000 },
                { id: "account2", balance: 2000 },
            ],
        };

        (getCustomerAccounts as vi.Mock).mockResolvedValue(mockResponse);

        const { result } = renderHook(() => useFetchCustomerAccounts(), {
            wrapper: ({ children }: { children: React.ReactNode }) => (
                <MockAppContextProvider
                    state={mockState}
                    dispatch={mockDispatch}
                >
                    {children}
                </MockAppContextProvider>
            ),
        });

        const response = await result.current.handleFetchCustomerAccounts(
            mockPayload
        );

        expect(getCustomerAccounts).toHaveBeenCalledWith(mockPayload);
        expect(mockDispatch).toHaveBeenCalledWith(
            expect.objectContaining({
                type: "FETCH_CUSTOMER_ACCOUNTS_REQUEST",
                payload: mockPayload,
            })
        );
        expect(mockDispatch).toHaveBeenCalledWith(
            expect.objectContaining({
                type: "FETCH_CUSTOMER_ACCOUNTS_SUCCESS",
                payload: mockResponse.dinBody,
            })
        );
        expect(response).toEqual(mockResponse);
    });

    it("debería despachar FETCH_CUSTOMER_ACCOUNTS_FAILURE si el servicio falla", async () => {
        const mockDispatch = vi.fn();
        const mockPayload = {
            dinHeader: { authorization: "Bearer token" },
            dinBody: { customerId: "12345" },
        };

        const mockError = "Error fetching customer accounts";

        (getCustomerAccounts as vi.Mock).mockRejectedValue(mockError);

        const { result } = renderHook(() => useFetchCustomerAccounts(), {
            wrapper: ({ children }: { children: React.ReactNode }) => (
                <MockAppContextProvider
                    state={mockState}
                    dispatch={mockDispatch}
                >
                    {children}
                </MockAppContextProvider>
            ),
        });

        await expect(
            result.current.handleFetchCustomerAccounts(mockPayload)
        ).rejects.toThrow(mockError);

        expect(getCustomerAccounts).toHaveBeenCalledWith(mockPayload);
        expect(mockDispatch).toHaveBeenCalledWith(
            expect.objectContaining({
                type: "FETCH_CUSTOMER_ACCOUNTS_REQUEST",
                payload: mockPayload,
            })
        );
        expect(mockDispatch).toHaveBeenCalledWith(
            expect.objectContaining({
                type: "FETCH_CUSTOMER_ACCOUNTS_FAILURE",
                payload: mockError,
            })
        );
    });

    it("debería lanzar un error si la respuesta no contiene dinBody", async () => {
        const mockDispatch = vi.fn();
        const mockPayload = {
            dinHeader: { authorization: "Bearer token" },
            dinBody: { customerId: "12345" },
        };

        const mockResponse = {};

        (getCustomerAccounts as vi.Mock).mockResolvedValue(mockResponse);

        const { result } = renderHook(() => useFetchCustomerAccounts(), {
            wrapper: ({ children }: { children: React.ReactNode }) => (
                <MockAppContextProvider state={mockState} dispatch={mockDispatch}>
                    {children}
                </MockAppContextProvider>
            ),
        });

        await expect(
            result.current.handleFetchCustomerAccounts(mockPayload)
        ).rejects.toThrow("La respuesta no contiene dinBody.");

        expect(getCustomerAccounts).toHaveBeenCalledWith(mockPayload);
        expect(mockDispatch).toHaveBeenCalledWith(
            expect.objectContaining({
                type: "FETCH_CUSTOMER_ACCOUNTS_REQUEST",
                payload: mockPayload,
            })
        );
        expect(mockDispatch).toHaveBeenCalledWith(
            expect.objectContaining({
                type: "FETCH_CUSTOMER_ACCOUNTS_FAILURE",
                payload: expect.any(Error),
            })
        );
        expect(mockDispatch).toHaveBeenCalledWith(
            expect.objectContaining({
                type: "FETCH_CUSTOMER_ACCOUNTS_FAILURE",
                payload: expect.objectContaining({
                    message: "La respuesta no contiene dinBody.",
                }),
            })
        );
    });

});
