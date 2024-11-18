import { useContext, useCallback } from "react";
import { createPurchaseCardRequest, createPurchaseCardSuccess, createPurchaseCardFailure } from "../../state/transactions/actions";
import { purchaseCard } from "../../services/transaction.service";
import { PurchaseCardRequest } from "../../interfaces/transaction";
import { AppContext } from "../../state/AppContext";

export const usePurchaseCard = () => {
  const { dispatch } = useContext(AppContext)!;

  const handlePurchaseCard = useCallback(
    async (request: PurchaseCardRequest) => {
      dispatch(createPurchaseCardRequest(request));
      try {
        const response = await purchaseCard(request);
        dispatch(createPurchaseCardSuccess(response));
      } catch (error) {
        dispatch(createPurchaseCardFailure(error as string));
      }
    },
    [dispatch]
  );

  return { handlePurchaseCard };
};

export default usePurchaseCard;
