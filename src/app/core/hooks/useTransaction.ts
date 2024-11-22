import { useContext } from 'react';
import { useWithdraw } from './transaction/useWithdraw';
import { useDeposit } from './transaction/useDeposit';
import { usePurchaseCard } from './transaction/usePurchaseCard';
import { AppContext } from "@state/AppContext";

export const useTransaction = () => {
  const { state } = useContext(AppContext)!;

  const { handleWithdraw } = useWithdraw();
  const { handleDeposit } = useDeposit();
  const { handlePurchaseCard } = usePurchaseCard();

  return {
    handleWithdraw,
    handleDeposit,
    handlePurchaseCard,
    state,
  };
};

export default useTransaction;
