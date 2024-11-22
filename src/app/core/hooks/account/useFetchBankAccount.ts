import { useCallback, useContext } from 'react';
import { AppContext } from '@state/AppContext';
import { BankAccountGetRequest } from '@interfaces/account';
import { fetchBankAccountRequest, fetchBankAccountSuccess, fetchBankAccountFailure } from '@state/account/actions';
import { getBankAccount } from '@services/account.service';

export const useFetchBankAccount = () => {
  const { dispatch } = useContext(AppContext)!;

  const handleFetchBankAccount = useCallback(
    async (payload: BankAccountGetRequest) => {
      dispatch(fetchBankAccountRequest(payload));
      try {
        const response = await getBankAccount(payload);
        dispatch(fetchBankAccountSuccess(response));
      } catch (error) {
        dispatch(fetchBankAccountFailure(error as string));
      }
    },
    [dispatch]
  );

  return { handleFetchBankAccount };
};
