import { useCallback, useContext } from 'react';
import { getCustomerAccounts } from '../../services/account.service';
import { fetchCustomerAccountsRequest, fetchCustomerAccountsSuccess, fetchCustomerAccountsFailure } from '../../state/account/actions';
import { AppContext } from '../../state/AppContext';
import { BankAccountCustomerGetRequest } from '../../interfaces/account';

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
