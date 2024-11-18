/* eslint-disable @typescript-eslint/no-explicit-any */
import { customerActions } from './actions';

interface CustomerState {
  data: any | null;
  loading: boolean;
  error: string | null;
}

export const customerInitialState: CustomerState = {
  data: null,
  loading: false,
  error: null,
};

export const customerCases = {
  [customerActions.CUSTOMER_REQUEST]: (state: CustomerState) => ({
    ...state,
    loading: true,
    error: null,
  }),

  [customerActions.CUSTOMER_REQUEST_SUCCESS]: (state: CustomerState, payload: any) => ({
    ...state,
    loading: false,
    data: payload,
  }),

  [customerActions.CUSTOMER_REQUEST_FAILURE]: (state: CustomerState, payload: string) => ({
    ...state,
    loading: false,
    error: payload,
  }),
};
