import { useCallback } from "react";
import useAuthHandler from "./useAuthHandler";
import { registerRequest, registerSuccess, registerFailure } from "../../state/auth/actions";
import { register } from "../../services/auth.service";
import { createBankAccount } from "../../services/account.service";
import { RegisterCredentials, RegisterCreateRequest, BankAccountCreateRequest, AuthResponse } from "../../interfaces/auth";
import { dinHeader } from "../../utils/headerUtils";

const useRegister = () => {
  const { handleRequest } = useAuthHandler();

  return useCallback(
    async (credentials: RegisterCredentials) => {
      const request: RegisterCreateRequest = {
        dinHeader,
        dinBody: {
          name: credentials.name,
          lastname: credentials.lastname,
          username: credentials.username,
          password: credentials.password,
          roles: credentials.roles,
        },
      };

      const successCallback = async (response: AuthResponse) => {
        const { customerId } = response.dinBody;
        const accountRequest: BankAccountCreateRequest = {
          dinHeader,
          dinBody: {
            customerId,
            amount: 1000,
          },
        };
        await createBankAccount(accountRequest);
      };

      return handleRequest(
        registerRequest,
        registerSuccess,
        registerFailure,
        register,
        request,
        successCallback
      );
    },
    [handleRequest]
  );
};

export default useRegister;
