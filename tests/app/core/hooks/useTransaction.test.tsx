import { renderHook } from "@testing-library/react";
import { vi } from "vitest";
import { MockAppContextProvider } from "../../../../src/app/core/state/MockAppContext";
import { useTransaction } from "../../../../src/app/core/hooks/useTransaction";
import { useWithdraw } from "../../../../src/app/core/hooks/transaction/useWithdraw";
import { useDeposit } from "../../../../src/app/core/hooks/transaction/useDeposit";
import { usePurchaseCard } from "../../../../src/app/core/hooks/transaction/usePurchaseCard";
import React from "react";

vi.mock("../../../../src/app/core/hooks/transaction/useWithdraw", () => ({
  useWithdraw: vi.fn(),
}));
vi.mock("../../../../src/app/core/hooks/transaction/useDeposit", () => ({
  useDeposit: vi.fn(),
}));
vi.mock("../../../../src/app/core/hooks/transaction/usePurchaseCard", () => ({
  usePurchaseCard: vi.fn(),
}));

describe("useTransaction", () => {
  const mockState = {
    transactions: {
      items: [],
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debería devolver las funciones handleWithdraw, handleDeposit y handlePurchaseCard", () => {
    const mockWithdraw = vi.fn();
    const mockDeposit = vi.fn();
    const mockPurchaseCard = vi.fn();

    (useWithdraw as vi.Mock).mockReturnValue({ handleWithdraw: mockWithdraw });
    (useDeposit as vi.Mock).mockReturnValue({ handleDeposit: mockDeposit });
    (usePurchaseCard as vi.Mock).mockReturnValue({ handlePurchaseCard: mockPurchaseCard });

    const { result } = renderHook(() => useTransaction(), {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <MockAppContextProvider state={mockState} dispatch={() => {}}>
          {children}
        </MockAppContextProvider>
      ),
    });

    expect(result.current.handleWithdraw).toBe(mockWithdraw);
    expect(result.current.handleDeposit).toBe(mockDeposit);
    expect(result.current.handlePurchaseCard).toBe(mockPurchaseCard);
  });

  it("debería devolver el estado del contexto correctamente", () => {
    const mockState = {
      transactions: {
        items: ["transaction1", "transaction2"],
      },
    };

    const { result } = renderHook(() => useTransaction(), {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <MockAppContextProvider state={mockState} dispatch={() => {}}>
          {children}
        </MockAppContextProvider>
      ),
    });

    expect(result.current.state).toEqual(mockState);
  });

  it("debería llamar a handleWithdraw cuando se invoca handleWithdraw desde useTransaction", async () => {
    const mockWithdraw = vi.fn();
    (useWithdraw as vi.Mock).mockReturnValue({ handleWithdraw: mockWithdraw });

    const { result } = renderHook(() => useTransaction(), {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <MockAppContextProvider state={mockState} dispatch={() => {}}>
          {children}
        </MockAppContextProvider>
      ),
    });

    const mockRequest = { accountId: "12345", amount: 500 };
    await result.current.handleWithdraw(mockRequest);

    expect(mockWithdraw).toHaveBeenCalledWith(mockRequest);
  });

  it("debería llamar a handleDeposit cuando se invoca handleDeposit desde useTransaction", async () => {
    const mockDeposit = vi.fn();
    (useDeposit as vi.Mock).mockReturnValue({ handleDeposit: mockDeposit });

    const { result } = renderHook(() => useTransaction(), {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <MockAppContextProvider state={mockState} dispatch={() => {}}>
          {children}
        </MockAppContextProvider>
      ),
    });

    const mockRequest = { accountId: "12345", amount: 1000 };
    await result.current.handleDeposit(mockRequest);

    expect(mockDeposit).toHaveBeenCalledWith(mockRequest);
  });

  it("debería llamar a handlePurchaseCard cuando se invoca handlePurchaseCard desde useTransaction", async () => {
    const mockPurchaseCard = vi.fn();
    (usePurchaseCard as vi.Mock).mockReturnValue({ handlePurchaseCard: mockPurchaseCard });

    const { result } = renderHook(() => useTransaction(), {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <MockAppContextProvider state={mockState} dispatch={() => {}}>
          {children}
        </MockAppContextProvider>
      ),
    });

    const mockRequest = { cardId: "card123", amount: 300 };
    await result.current.handlePurchaseCard(mockRequest);

    expect(mockPurchaseCard).toHaveBeenCalledWith(mockRequest);
  });
});
