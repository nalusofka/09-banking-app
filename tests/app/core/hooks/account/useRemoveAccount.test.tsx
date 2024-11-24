/* eslint-disable @typescript-eslint/no-require-imports */
import { renderHook } from "@testing-library/react";
import { vi } from "vitest";
import { MockAppContextProvider } from "../../../../../src/app/core/state/MockAppContext";
import { deleteBankAccount } from "../../../../../src/app/core/services/account.service";
import { useRemoveAccount } from "../../../../../src/app/core/hooks/account/useRemoveAccount";
import React from "react";

vi.mock("../../../../../src/app/core/services/account.service", () => ({
  deleteBankAccount: vi.fn(),
}));

describe("useRemoveAccount", () => {
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

  it("debería llamar a deleteBankAccount y despachar las acciones correctas en caso de éxito", async () => {
    const mockDispatch = vi.fn();
    const mockPayload = { accountId: "12345" };
    const mockResponse = { success: true };

    (deleteBankAccount as vi.Mock).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useRemoveAccount(), {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <MockAppContextProvider
          state={mockState}
          dispatch={mockDispatch}
        >
          {children}
        </MockAppContextProvider>
      ),
    });

    await result.current.handleRemoveAccount(mockPayload);

    expect(deleteBankAccount).toHaveBeenCalledWith(mockPayload);
    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "DELETE_BANK_ACCOUNT_REQUEST",
        payload: mockPayload,
      })
    );
    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "DELETE_BANK_ACCOUNT_SUCCESS",
        payload: mockResponse,
      })
    );
  });

it("debería lanzar un error si la respuesta no es la esperada", async () => {
    const mockDispatch = vi.fn();
    const mockPayload = { accountId: "12345" };
    const mockResponse = {};

    (deleteBankAccount as vi.Mock).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useRemoveAccount(), {
        wrapper: ({ children }: { children: React.ReactNode }) => (
            <MockAppContextProvider
                state={mockState}
                dispatch={mockDispatch}
            >
                {children}
            </MockAppContextProvider>
        ),
    });

    await expect(result.current.handleRemoveAccount(mockPayload)).rejects.toThrow("La respuesta no es la esperada");

    expect(deleteBankAccount).toHaveBeenCalledWith(mockPayload);
    expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
            type: "DELETE_BANK_ACCOUNT_FAILURE",
            payload: expect.any(Error),
        })
    );
});

});
