import { useCallback, useContext } from 'react';
import { createBankAccount } from '../../services/account.service';
import { createBankAccountRequest, createBankAccountSuccess, createBankAccountFailure } from '../../state/account/actions';
import { AppContext } from '../../state/AppContext';
import { BankAccountCreateRequest } from '../../interfaces/account';

export const useCreateBankAccount = () => {
    const { dispatch } = useContext(AppContext)!;

    const handleCreateBankAccount = useCallback(
        async (payload: BankAccountCreateRequest) => {
            dispatch(createBankAccountRequest(payload));
            try {
                const response = await createBankAccount(payload);
                dispatch(createBankAccountSuccess(response));
            } catch (error) {
                dispatch(createBankAccountFailure(error as string));
            }
        },
        [dispatch]
    );

    return { handleCreateBankAccount };
};
