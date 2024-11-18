/* eslint-disable @typescript-eslint/no-explicit-any */
import { encryptAES } from '../utils/encryptionUtils';
import { HTTP_METHODS } from '../constants/httpMethods';
import { WithdrawRequest, PurchaseCardRequest, DepositRequest, TransactionResponse } from '../interfaces/transaction';
import { http } from './generals/http';

const API_URL = import.meta.env.VITE_API_URL;
const SYMMETRIC_KEY = import.meta.env.VITE_SYMMETRIC_KEY;
const INITIALIZATION_VECTOR = import.meta.env.VITE_INITIALIZATION_VECTOR;

const makeTransaction = async (url: string, payload: WithdrawRequest | PurchaseCardRequest | DepositRequest): Promise<TransactionResponse> => {
  try {
    const response = await http(`${API_URL}${url}`, HTTP_METHODS.POST, payload)
    return response.json()
  } catch (error: any) {
    return error
  }
};

export const withdraw = async (request: WithdrawRequest): Promise<TransactionResponse> => {

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
      username: request.dinBody.username,
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
      accountNumber: request.dinBody.accountNumber,
      amount: request.dinBody.amount,
      type: request.dinBody.type,
      purchaseType: request.dinBody.purchaseType,
    },
  };
  return makeTransaction('/api/v1/private/transactions/purchase-card', payload);
};

// depositos

export const deposit = async (request: DepositRequest): Promise<TransactionResponse> => {
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
      accountNumber: request.dinBody.accountNumber,
      amount: request.dinBody.amount,
      type: request.dinBody.type,
      username: request.dinBody.username,
    },
  };
  return makeTransaction('/api/v1/private/transactions/deposit', payload);
};
