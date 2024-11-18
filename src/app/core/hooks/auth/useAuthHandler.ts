/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useContext } from "react";
import { AppContext } from "../../state/AppContext";

const useAuthHandler = () => {
  const { dispatch } = useContext(AppContext)!;

  const handleRequest = useCallback(
    async <T>(
      actionRequest: (request: T) => any,
      actionSuccess: (response: any) => any,
      actionFailure: (error: string) => any,
      apiCall: (request: T) => Promise<any>,
      requestPayload: T,
      successCallback?: (response: any) => Promise<void>
    ): Promise<boolean> => {
      dispatch(actionRequest(requestPayload));
      try {
        const response = await apiCall(requestPayload);

        if (response.error || response.statusCode >= 400) {
          throw new Error(response.message || "Request failed");
        }

        const { token, customerId } = response.dinBody;
        dispatch(actionSuccess(response));
        localStorage.setItem("token", token);
        localStorage.setItem("customerId", customerId);

        if (successCallback) {
          await successCallback(response);
        }

        return true;
      } catch (error: any) {
        dispatch(actionFailure(error.message));
        return false;
      }
    },
    [dispatch]
  );

  return { handleRequest };
};

export default useAuthHandler;
