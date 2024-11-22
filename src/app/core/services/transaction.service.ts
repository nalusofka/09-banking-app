/* eslint-disable @typescript-eslint/no-explicit-any */
import { encryptAES } from '@utils/encryptionUtils';
import { HTTP_METHODS } from '@constants/httpMethods';
import {
  WithdrawRequest,
  PurchaseCardRequest,
  DepositRequest,
  TransactionResponse,
} from '@interfaces/transaction';

const API_URL = import.meta.env.VITE_API_URL;
const SYMMETRIC_KEY = import.meta.env.VITE_SYMMETRIC_KEY;
const INITIALIZATION_VECTOR = import.meta.env.VITE_INITIALIZATION_VECTOR;

const COMMON_HEADERS: HeadersInit = {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${localStorage.getItem("token")}`,
};

const makeTransaction = async (
  url: string,
  payload: WithdrawRequest | PurchaseCardRequest | DepositRequest,
): Promise<TransactionResponse> => {
  const headers = { ...COMMON_HEADERS };

  try {
    const response = await fetch(`${API_URL}${url}`, {
      method: HTTP_METHODS.POST.toString(),
      headers,
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error(error, "error");
    throw error;
  }
};

export const withdraw = async (request: WithdrawRequest): Promise<TransactionResponse> => {
  const username = localStorage.getItem("username");

  const payload = {
    dinHeader: {
      device: request.dinHeader.device,
      language: request.dinHeader.language,
      uuid: request.dinHeader.uuid,
      ip: request.dinHeader.ip,
      transactionTime: new Date().toISOString(),
      symmetricKey: SYMMETRIC_KEY,
      initializationVector: INITIALIZATION_VECTOR,
    },
    dinBody: {
      username,
      accountNumber: encryptAES(request.dinBody.accountNumber),
      amount: request.dinBody.amount,
    },
  };

  return makeTransaction('/api/v1/private/transactions/withdraw', payload);
};

export const purchaseCard = async (request: PurchaseCardRequest): Promise<TransactionResponse> => {
  const payload = {
    dinHeader: {
      device: request.dinHeader.device,
      language: request.dinHeader.language,
      uuid: request.dinHeader.uuid,
      ip: request.dinHeader.ip,
      transactionTime: new Date().toISOString(),
      symmetricKey: SYMMETRIC_KEY,
      initializationVector: INITIALIZATION_VECTOR,
    },
    dinBody: {
      accountNumber: encryptAES(request.dinBody.accountNumber),
      amount: request.dinBody.amount,
      purchaseType: request.dinBody.purchaseType, // PHYSICAL ONLINE
    },
  };

  return makeTransaction('/api/v1/private/transactions/purchase-card', payload);
};

export const deposit = async (request: DepositRequest): Promise<TransactionResponse> => {
  const username = localStorage.getItem("username");

  const payload = {
    dinHeader: {
      device: request.dinHeader.device,
      language: request.dinHeader.language,
      uuid: request.dinHeader.uuid,
      ip: request.dinHeader.ip,
      transactionTime: new Date().toISOString(),
      symmetricKey: SYMMETRIC_KEY,
      initializationVector: INITIALIZATION_VECTOR,
    },
    dinBody: {
      accountNumber: encryptAES(request.dinBody.accountNumber),
      amount: request.dinBody.amount,
      type: request.dinBody.type, // BRANCH ATM OTHER_ACCOUNT
      username,
    },
  };

  return makeTransaction('/api/v1/private/transactions/deposit', payload);
};
