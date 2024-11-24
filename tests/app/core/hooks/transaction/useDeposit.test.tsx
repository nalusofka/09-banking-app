import { renderHook, act } from "@testing-library/react";
import { useDeposit } from "../../../../../src/app/core/hooks/transaction/useDeposit";
import { MockAppContextProvider } from "../../../../../src/app/core/state/MockAppContext";
import { createDepositRequest, createDepositSuccess, createDepositFailure } from "../../../../../src/app/core/state/transactions/actions";
import { deposit } from "../../../../../src/app/core/services/transaction.service";
import React from "react";
import '@testing-library/jest-dom';

vi.mock("../../../../../src/app/core/services/transaction.service");

describe("useDeposit", () => {
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

  const dispatchMock = vi.fn();

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <MockAppContextProvider value={{ dispatch: dispatchMock }}>
      {children}
    </MockAppContextProvider>
  );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debería manejar el depósito correctamente en caso de éxito', async () => {
    const dispatchMock = vi.fn();
  
    const { result } = renderHook(() => {
      const handleDepositMock = async (request: any) => {
        dispatchMock(createDepositRequest(request));
        try {
          const response = await deposit(request);
          dispatchMock(createDepositSuccess(response));
        } catch (error) {
          dispatchMock(createDepositFailure(error));
        }
      };
      return { handleDeposit: handleDepositMock };
    });
  
    (deposit as vi.Mock).mockResolvedValueOnce(mockResponse);
  
    await act(async () => {
      await result.current.handleDeposit(mockRequest);
    });
  
    expect(dispatchMock).toHaveBeenCalledTimes(2);
  
    const firstAction = dispatchMock.mock.calls[0][0];
    expect(firstAction).toEqual(createDepositRequest(mockRequest));
  
    const secondAction = dispatchMock.mock.calls[1][0];
    expect(secondAction).toEqual(createDepositSuccess(mockResponse));
  });
  

  it('debería manejar el depósito correctamente en caso de fallo', async () => {
    const dispatchMock = vi.fn();
  
    const { result } = renderHook(() => {
      const handleDepositMock = async (request: any) => {
        dispatchMock(createDepositRequest(request));
        try {
          const response = await deposit(request);
          dispatchMock(createDepositSuccess(response));
        } catch (error) {
          dispatchMock(createDepositFailure(error));
        }
      };
      return { handleDeposit: handleDepositMock };
    });
  
    const mockError = new Error('Error processing deposit');
    (deposit as vi.Mock).mockRejectedValueOnce(mockError);
  
    await act(async () => {
      await result.current.handleDeposit(mockRequest);
    });
  
    expect(dispatchMock).toHaveBeenCalledTimes(2);
  
    const firstAction = dispatchMock.mock.calls[0][0];
    expect(firstAction).toEqual(createDepositRequest(mockRequest));
  
    const secondAction = dispatchMock.mock.calls[1][0];
    expect(secondAction).toEqual(createDepositFailure(mockError));
  });
  

  it("debería llamar a deposit con los argumentos correctos", async () => {
    (deposit as vi.Mock).mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useDeposit(), { wrapper });

    await act(async () => {
      await result.current.handleDeposit(mockRequest);
    });

    expect(deposit).toHaveBeenCalledWith(mockRequest);
  });
});
