/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useContext, useCallback } from 'react';
import { AppContext } from '@state/AppContext';
import { customerRequestRequest, customerRequestSuccess, customerRequestFailure } from '@state/customer/actions';
import { dinHeader } from '@utils/headerUtils';
import { getCustomer } from '@services/customer.service';

export const useGetCustomer = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useGetCustomer must be used within an AppContextProvider');
  }

  const { state, dispatch } = context;

  const fetchCustomer = useCallback(
    async (customerId: string) => {
      dispatch(customerRequestRequest({ id: customerId }));
      try {
        const response = await getCustomer({
            // @ts-ignore
          dinHeader,
          dinBody: { id: customerId },
        });
        dispatch(customerRequestSuccess(response.dinBody));
      } catch (error) {
        dispatch(customerRequestFailure(error as string || 'Error fetching customer'));
      }
    },
    [dispatch]
  );

  return { state, fetchCustomer };
};
