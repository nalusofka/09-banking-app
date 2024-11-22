import { useCallback, useContext } from 'react';
import { AppContext } from '@state/AppContext';
import { BankAccountCustomerGetRequest } from '@interfaces/account';
import { fetchCustomerAccountsRequest, fetchCustomerAccountsSuccess, fetchCustomerAccountsFailure } from '@state/account/actions';
import { getCustomerAccounts } from '@services/account.service';

export const useFetchCustomerAccounts = () => {
  const { dispatch } = useContext(AppContext)!;

  const handleFetchCustomerAccounts = useCallback(
    async (payload: BankAccountCustomerGetRequest) => {
      dispatch(fetchCustomerAccountsRequest(payload));
      try {
        const response = await getCustomerAccounts(payload);
        if (response.dinBody) {
          dispatch(fetchCustomerAccountsSuccess(response.dinBody));
          return response;
        } else {
          throw new Error('La respuesta no contiene dinBody.');
        }
      } catch (error) {
        dispatch(fetchCustomerAccountsFailure(error as string));
        throw error;
      }
    },
    [dispatch]
  );

  return { handleFetchCustomerAccounts };
};
