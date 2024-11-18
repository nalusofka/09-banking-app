export interface CustomerHeader {
  device: string;
  language: string;
  uuid: string;
  ip: string;
  transactionTime?: string;
  symmetricKey: string;
  initializationVector: string;
}

export interface CustomerGetRequest {
  dinHeader: CustomerHeader;
  dinBody: {
    id: string;
  };
}

export interface CustomerResponse {
  id: string;
  username: string;
  createdAt: string;
}

export interface ErrorResponse {
  message: string;
  statusCode: number;
}

export type ApiResponse<T> = T | ErrorResponse;
