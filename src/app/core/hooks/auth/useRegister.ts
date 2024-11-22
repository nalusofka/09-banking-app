import { useCallback } from "react";
import { createBankAccount } from "@services/account.service";
import { dinHeader } from "@utils/headerUtils";
import { register } from "@services/auth.service";
import { RegisterCredentials, RegisterCreateRequest, BankAccountCreateRequest, AuthResponse } from "@interfaces/auth";
import { registerRequest, registerSuccess, registerFailure } from "@state/auth/actions";
import useAuthHandler from "./useAuthHandler";

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
