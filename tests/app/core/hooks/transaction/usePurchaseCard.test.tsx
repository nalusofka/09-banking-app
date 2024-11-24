import { renderHook } from "@testing-library/react";
import { usePurchaseCard } from "../../../../../src/app/core/hooks/transaction/usePurchaseCard";
import { MockAppContextProvider } from "../../../../../src/app/core/state/MockAppContext";
import { purchaseCard } from "../../../../../src/app/core/services/transaction.service";
import React from "react";
import '@testing-library/jest-dom';
import { vi } from "vitest";

vi.mock("../../../../../src/app/core/services/transaction.service");

describe("usePurchaseCard", () => {
  const mockState = {
    transactions: {
      items: [],
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debería llamar a purchaseCard con los parámetros correctos y despachar las acciones correspondientes", async () => {
    const mockDispatch = vi.fn();
    const mockRequest = {
      accountId: "12345",
      amount: 1000,
      currency: "USD",
    };

    const mockResponse = {
      transactionId: "tx123",
      status: "success",
      ...mockRequest,
    };

    (purchaseCard as vi.Mock).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => usePurchaseCard(), {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <MockAppContextProvider state={mockState} dispatch={mockDispatch}>
          {children}
        </MockAppContextProvider>
      ),
    });

    await result.current.handlePurchaseCard(mockRequest);

    expect(purchaseCard).toHaveBeenCalledWith(mockRequest);
    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "CREATE_PURCHASE_CARD_REQUEST",
        payload: mockRequest,
      })
    );
    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "CREATE_PURCHASE_CARD_SUCCESS",
        payload: mockResponse,
      })
    );
  });

  it("debería despachar CREATE_PURCHASE_CARD_FAILURE si el servicio falla", async () => {
    const mockDispatch = vi.fn();
    const mockRequest = {
      accountId: "12345",
      amount: 1000,
      currency: "USD",
    };

    const mockError = "Error processing purchase";

    (purchaseCard as vi.Mock).mockRejectedValue(mockError);

    const { result } = renderHook(() => usePurchaseCard(), {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <MockAppContextProvider state={mockState} dispatch={mockDispatch}>
          {children}
        </MockAppContextProvider>
      ),
    });

    await result.current.handlePurchaseCard(mockRequest);

    expect(purchaseCard).toHaveBeenCalledWith(mockRequest);
    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "CREATE_PURCHASE_CARD_REQUEST",
        payload: mockRequest,
      })
    );
    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "CREATE_PURCHASE_CARD_FAILURE",
        payload: mockError,
      })
    );
  });
});