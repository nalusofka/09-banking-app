import { useContext, useCallback } from "react";
import { AppContext } from "@state/AppContext";
import { createDepositRequest, createDepositSuccess, createDepositFailure } from "@state/transactions/actions";
import { deposit } from "@services/transaction.service";
import { DepositRequest } from "@interfaces/transaction";

export const useDeposit = () => {
  const { dispatch } = useContext(AppContext)!;

  const handleDeposit = useCallback(
    async (request: DepositRequest) => {
      dispatch(createDepositRequest(request));
      try {
        const response = await deposit(request);
        dispatch(createDepositSuccess(response));
      } catch (error) {
        dispatch(createDepositFailure(error as string));
      }
    },
    [dispatch]
  );

  return { handleDeposit };
};

export default useDeposit;
