import { AuthCreateRequest, AuthResponse, RegisterCreateRequest } from '@interfaces/auth';

export const loginActions = {
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILURE: 'LOGIN_FAILURE',
    REGISTER_REQUEST: 'REGISTER_REQUEST',
    REGISTER_SUCCESS: 'REGISTER_SUCCESS',
    REGISTER_FAILURE: 'REGISTER_FAILURE',
    LOGOUT: 'LOGOUT',
}

export const loginRequest = (credentials: AuthCreateRequest) => ({
  type: loginActions.LOGIN_REQUEST,
  payload: credentials,
});

export const loginSuccess = (response: AuthResponse) => ({
  type: loginActions.LOGIN_SUCCESS,
  payload: response,
});

export const loginFailure = (error: string) => ({
  type: loginActions.LOGIN_FAILURE,
  payload: error,
});

export const registerRequest = (credentials: RegisterCreateRequest) => ({
  type: loginActions.REGISTER_REQUEST,
  payload: credentials,
});

export const registerSuccess = (response: AuthResponse) => ({
  type: loginActions.REGISTER_SUCCESS,
  payload: response,
});

export const registerFailure = (error: string) => ({
  type: loginActions.REGISTER_FAILURE,
  payload: error,
});

export const logout = () => ({
  type: loginActions.LOGOUT,
});
