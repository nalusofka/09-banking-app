/* eslint-disable @typescript-eslint/no-require-imports */
import { renderHook } from "@testing-library/react";
import { vi } from "vitest";
import { MockAppContextProvider } from "../../../../../src/app/core/state/MockAppContext";
import { getBankAccount } from "../../../../../src/app/core/services/account.service";
import { useFetchBankAccount } from "../../../../../src/app/core/hooks/account/useFetchBankAccount";
import React from "react";

vi.mock("../../../../../src/app/core/services/account.service", () => ({
  getBankAccount: vi.fn(),
}));

describe("useFetchBankAccount", () => {
  const mockState = {
    account: {
      bankAccounts: [],
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debería llamar a getBankAccount con los parámetros correctos y despachar las acciones correspondientes", async () => {
    const mockDispatch = vi.fn();
    const mockPayload = {
      dinHeader: { authorization: "Bearer token" },
      dinBody: { accountId: "12345" },
    };

    const mockResponse = { id: "12345", balance: 1000, customerId: "67890" };

    (getBankAccount as vi.Mock).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useFetchBankAccount(), {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <MockAppContextProvider
          state={mockState}
          dispatch={mockDispatch}
        >
          {children}
        </MockAppContextProvider>
      ),
    });

    await result.current.handleFetchBankAccount(mockPayload);

    expect(getBankAccount).toHaveBeenCalledWith(mockPayload);
    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "FETCH_BANK_ACCOUNT_REQUEST",
        payload: mockPayload,
      })
    );
    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "FETCH_BANK_ACCOUNT_SUCCESS",
        payload: mockResponse,
      })
    );
  });

  it("debería despachar FETCH_BANK_ACCOUNT_FAILURE si el servicio falla", async () => {
    const mockDispatch = vi.fn();
    const mockPayload = {
      dinHeader: { authorization: "Bearer token" },
      dinBody: { accountId: "12345" },
    };

    const mockError = "Error fetching account";

    (getBankAccount as vi.Mock).mockRejectedValue(mockError);

    const { result } = renderHook(() => useFetchBankAccount(), {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <MockAppContextProvider
          state={mockState}
          dispatch={mockDispatch}
        >
          {children}
        </MockAppContextProvider>
      ),
    });

    await result.current.handleFetchBankAccount(mockPayload);

    expect(getBankAccount).toHaveBeenCalledWith(mockPayload);
    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "FETCH_BANK_ACCOUNT_REQUEST",
        payload: mockPayload,
      })
    );
    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "FETCH_BANK_ACCOUNT_FAILURE",
        payload: mockError,
      })
    );
  });
});
