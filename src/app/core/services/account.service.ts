import { BankAccountCreateRequest, BankAccountGetRequest, BankAccountDeleteRequest, BankAccountCustomerGetRequest } from '@interfaces/account';
import { http } from './generals/http';
import { HTTP_METHODS } from '@core/constants/httpMethods';

const API_URL = process.env.VITE_API_URL;
const SECREY_KEY = process.env.VITE_SECRET_KEY;
const INITIALIZATION_VECTOR = process.env.VITE_INITIALIZATION_VECTOR;

const makeAccountRequest = async (url: string, payload: BankAccountCreateRequest | BankAccountGetRequest | BankAccountDeleteRequest | BankAccountCustomerGetRequest) => {
  try {
    const response = await http(`${API_URL}${url}`, HTTP_METHODS.POST, payload);
    return response.json();
  } catch (error: any) {
    throw new Error(`Error en la solicitud de cuenta bancaria: ${error.message}`);
  }
};

export const createBankAccount = async (request: BankAccountCreateRequest) => {
  const payload = {
    dinHeader: {
      device: request.dinHeader.device,
      language: request.dinHeader.language,
      uuid: request.dinHeader.uuid,
      ip: request.dinHeader.ip,
      transactionTime: new Date().toISOString(),
      symmetricKey: SECREY_KEY,
      initializationVector: INITIALIZATION_VECTOR,
    },
    dinBody: {
      customerId: request.dinBody.customerId,
      amount: request.dinBody.amount,
    },
  };
  return makeAccountRequest('/v1/public/bank-accounts', payload);
};

export const getBankAccount = async (request: BankAccountGetRequest) => {
  const payload = {
    dinHeader: {
      device: request.dinHeader.device,
      language: request.dinHeader.language,
      uuid: request.dinHeader.uuid,
      ip: request.dinHeader.ip,
      transactionTime: new Date().toISOString(),
      symmetricKey: SECREY_KEY,
      initializationVector: INITIALIZATION_VECTOR,
    },
    dinBody: {
      id: request.dinBody.id,
    },
  };
  return makeAccountRequest('/v1/public/bank-accounts/get', payload);
};

export const deleteBankAccount = async (request: BankAccountDeleteRequest) => {
  const payload = {
    dinHeader: {
      device: request.dinHeader.device,
      language: request.dinHeader.language,
      uuid: request.dinHeader.uuid,
      ip: request.dinHeader.ip,
      transactionTime: new Date().toISOString(),
      symmetricKey: SECREY_KEY,
      initializationVector: INITIALIZATION_VECTOR,
    },
    dinBody: {
      id: request.dinBody.id,
    },
  };
  return makeAccountRequest('/v1/public/bank-accounts/delete', payload);
};

export const getCustomerAccounts = async (request: BankAccountCustomerGetRequest) => {
  const payload = {
    dinHeader: {
      device: request.dinHeader.device,
      language: request.dinHeader.language,
      uuid: request.dinHeader.uuid,
      ip: request.dinHeader.ip,
      transactionTime: new Date().toISOString(),
      symmetricKey: SECREY_KEY,
      initializationVector: INITIALIZATION_VECTOR,
    },
    dinBody: {
      id: request.dinBody.id,
    },
  };
  return makeAccountRequest('/v1/public/bank-accounts/customer/get-accounts', payload);
};