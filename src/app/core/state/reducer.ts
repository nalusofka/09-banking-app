/* eslint-disable @typescript-eslint/no-explicit-any */
import { accountCases, accountInitialState } from "./account/reducer";
import { authCases, authInitialState } from "./auth/reducer";
import { customerCases, customerInitialState } from "./customer/reducer";
import { transactionCases, transactionInitialState } from "./transactions/reducer";

export const initialState = {
    ...authInitialState,
    ...customerInitialState,
    ...accountInitialState,
    ...transactionInitialState
  };

  export const reducer = (state: any, action: any) => {
    const cases = {
        ...authCases,
        ...customerCases,
        ...accountCases,
        ...transactionCases
      };

      return cases[action.type] ? cases[action.type](state, action.payload) : state;
    }