import { useCallback, useContext } from "react";
import { AppContext } from "@state/AppContext";
import { BankAccountDeleteRequest } from "@interfaces/account";
import { deleteBankAccount } from "@services/account.service";
import {
  deleteBankAccountRequest,
  deleteBankAccountSuccess,
  deleteBankAccountFailure,
} from "@state/account/actions";

export const useRemoveAccount = () => {
  const { dispatch } = useContext(AppContext)!;

  const handleRemoveAccount = useCallback(
    async (payload: BankAccountDeleteRequest) => {
      dispatch(deleteBankAccountRequest(payload));
      try {
        const response = await deleteBankAccount(payload);
        if (!response || !response.success) {
          throw new Error("La respuesta no es la esperada");
        }
        dispatch(deleteBankAccountSuccess(response));
      } catch (error) {
        dispatch(deleteBankAccountFailure(error as string));
        throw error;
      }
    },
    [dispatch]
  );

  return { handleRemoveAccount };
};
