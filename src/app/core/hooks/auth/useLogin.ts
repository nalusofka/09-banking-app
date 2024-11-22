import { useCallback } from "react";
import { AuthCredentials, AuthCreateRequest } from "@interfaces/auth";
import { dinHeader } from "@utils/headerUtils";
import { login } from "@services/auth.service";
import { loginRequest, loginSuccess, loginFailure } from "@state/auth/actions";
import useAuthHandler from "./useAuthHandler";

const useLogin = () => {
  const { handleRequest } = useAuthHandler();

  return useCallback(
    async (credentials: AuthCredentials): Promise<boolean> => {
      const request: AuthCreateRequest = {
        dinHeader,
        dinBody: {
          username: credentials.username,
          password: credentials.password,
        },
      };

      return handleRequest(
        loginRequest,
        loginSuccess,
        loginFailure,
        login,
        request
      );
    },
    [handleRequest]
  );
};

export default useLogin;
