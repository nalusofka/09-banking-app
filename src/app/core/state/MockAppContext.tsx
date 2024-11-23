import React, { ReactNode } from 'react';
import { AppContext } from './AppContext';
import { initialState, reducer } from './reducer';

interface MockAppContextProviderProps {
  children: ReactNode;
  state?: any;
  dispatch?: React.Dispatch<any>;
}

export const MockAppContextProvider: React.FC<MockAppContextProviderProps> = ({
  children,
  state = initialState,
  dispatch,
}) => {
  const [defaultState, defaultDispatch] = React.useReducer(reducer, state);

  return (
    <AppContext.Provider
      value={{
        state: state || defaultState,
        dispatch: dispatch || defaultDispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
