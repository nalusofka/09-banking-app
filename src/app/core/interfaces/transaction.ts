/* eslint-disable @typescript-eslint/no-explicit-any */
export interface DinHeader {
  device: string;
  language: string;
  uuid: string;
  ip: string;
  transactionTime: string;
}

export interface WithdrawRequest {
  dinHeader: DinHeader;
  dinBody: {
    username: string;
    accountNumber: string;
    amount: number;
  };
}

export interface PurchaseCardRequest {
  dinHeader: DinHeader;
  dinBody: {
    accountNumber: string;
    amount: number;
    type: any;
    purchaseType: string;
  };
}

export interface DepositRequest {
  dinHeader: DinHeader;
  dinBody: {
    accountNumber: string;
    amount: number;
    type: string;
    username: string;
  };
}

export type TransactionRequest = WithdrawRequest | PurchaseCardRequest | DepositRequest;

export interface TransactionResponse {
  transactionId: string;
  status: string;
  message: string;
}

export interface Transaction {
  id: string;
  type: string;
  amount: number;
  date: string;
}
