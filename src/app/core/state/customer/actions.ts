/* eslint-disable @typescript-eslint/no-explicit-any */
export const customerActions = {
    CUSTOMER_REQUEST: 'CUSTOMER_REQUEST_REQUEST',
    CUSTOMER_REQUEST_SUCCESS: 'CUSTOMER_REQUEST_SUCCESS',
    CUSTOMER_REQUEST_FAILURE: 'CUSTOMER_REQUEST_FAILURE',
  };

  export const customerRequestRequest = (request: any) => ({
    type: customerActions.CUSTOMER_REQUEST,
    payload: request,
  });
  
  export const customerRequestSuccess = (response: any) => ({
    type: customerActions.CUSTOMER_REQUEST_SUCCESS,
    payload: response,
  });
  
  export const customerRequestFailure = (error: string) => ({
    type: customerActions.CUSTOMER_REQUEST_FAILURE,
    payload: error,
  });
  