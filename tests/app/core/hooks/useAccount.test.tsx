import { renderHook } from "@testing-library/react";
import { vi } from "vitest";
import { MockAppContextProvider } from "../../../../src/app/core/state/MockAppContext";
import { useAccount } from "../../../../src/app/core/hooks/useAccount";
import React from "react";

vi.mock("../../../../src/app/core/hooks/useAccount", () => ({
  useAccount: vi.fn(),
}));

describe("useAccount", () => {
  const mockState = {
    accounts: {
      items: [],
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debería devolver las funciones handleCreateBankAccount y handleFetchBankAccount", () => {
    const mockCreateBankAccount = vi.fn();
    const mockFetchBankAccount = vi.fn();

    (useAccount as vi.Mock).mockReturnValue({
      handleCreateBankAccount: mockCreateBankAccount,
      handleFetchBankAccount: mockFetchBankAccount,
    });

    const { result } = renderHook(() => useAccount(), {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <MockAppContextProvider state={mockState} dispatch={() => {}}>{children}</MockAppContextProvider>
      ),
    });

    expect(result.current.handleCreateBankAccount).toBe(mockCreateBankAccount);
    expect(result.current.handleFetchBankAccount).toBe(mockFetchBankAccount);
  });

  it("debería llamar a handleCreateBankAccount cuando se invoca desde useAccount", async () => {
    const mockCreateAccount = vi.fn();
    (useAccount as vi.Mock).mockReturnValue({ handleCreateBankAccount: mockCreateAccount });

    const { result } = renderHook(() => useAccount(), {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <MockAppContextProvider state={mockState} dispatch={() => {}}>{children}</MockAppContextProvider>
      ),
    });

    const mockRequest = { accountId: "12345", initialDeposit: 500 };
    await result.current.handleCreateBankAccount(mockRequest);

    expect(mockCreateAccount).toHaveBeenCalledWith(mockRequest);
  });

  it("debería llamar a handleFetchBankAccount cuando se invoca desde useAccount", async () => {
    const mockFetchAccount = vi.fn();
    (useAccount as vi.Mock).mockReturnValue({ handleFetchBankAccount: mockFetchAccount });

    const { result } = renderHook(() => useAccount(), {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <MockAppContextProvider state={mockState} dispatch={() => {}}>{children}</MockAppContextProvider>
      ),
    });

    const mockRequest = { accountId: "12345" };
    await result.current.handleFetchBankAccount(mockRequest);

    expect(mockFetchAccount).toHaveBeenCalledWith(mockRequest);
  });
});
