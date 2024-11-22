import { useContext, useCallback } from "react";
import { AppContext } from "@state/AppContext";
import { createWithdrawRequest, createWithdrawSuccess, createWithdrawFailure } from "@state/transactions/actions";
import { withdraw } from "@services/transaction.service";
import { WithdrawRequest } from "@interfaces/transaction";

export const useWithdraw = () => {
  const { dispatch } = useContext(AppContext)!;

  const handleWithdraw = useCallback(
    async (request: WithdrawRequest) => {
      dispatch(createWithdrawRequest(request));
      try {
        const response = await withdraw(request);
        dispatch(createWithdrawSuccess(response));
      } catch (error) {
        dispatch(createWithdrawFailure(error as string));
      }
    },
    [dispatch]
  );

  return { handleWithdraw };
};

export default useWithdraw;
