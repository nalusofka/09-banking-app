import { useCreateBankAccount } from './account/useCreateBankAccount';
import { useFetchBankAccount } from './account/useFetchBankAccount';
import { useRemoveAccount } from './account/useRemoveAccount';
import { useFetchCustomerAccounts } from './account/useFetchCustomerAccounts';
import { AppContext } from '../../core/state/AppContext';
import { useContext } from 'react';

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
