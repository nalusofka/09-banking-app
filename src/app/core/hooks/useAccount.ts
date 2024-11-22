import { useContext } from 'react';
import { AppContext } from '@state/AppContext';
import { useCreateBankAccount } from './account/useCreateBankAccount';
import { useFetchBankAccount } from './account/useFetchBankAccount';
import { useFetchCustomerAccounts } from './account/useFetchCustomerAccounts';
import { useRemoveAccount } from './account/useRemoveAccount';

export const useAccount = () => {
  const { state } = useContext(AppContext)!;
  const { handleCreateBankAccount } = useCreateBankAccount();
  const { handleFetchBankAccount } = useFetchBankAccount();
  const { handleRemoveAccount } = useRemoveAccount();
  const { handleFetchCustomerAccounts } = useFetchCustomerAccounts();

  return {
    handleCreateBankAccount,
    handleFetchBankAccount,
    handleRemoveAccount,
    handleFetchCustomerAccounts,
    state
  };
};
