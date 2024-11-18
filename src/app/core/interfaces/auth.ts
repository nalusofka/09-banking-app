export interface AuthCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  lastname: string;
  username: string;
  password: string;
  roles: string[];
}

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface AuthResponse {
  dinBody: {
    token: string;
    customerId: string;
  };
}
export interface AuthHeader {
  device: string;
  language: string;
  uuid: string;
  ip: string;
  transactionTime: string;
}

export interface AuthCreateRequest {
  dinHeader: AuthHeader;
  dinBody: AuthCredentials;
}

export interface BankAccountCreateRequest {
  dinHeader: AuthHeader;
  dinBody: {
    customerId: string;
    amount: number;
  };
}

export interface RegisterCreateRequest {
  dinHeader: AuthHeader;
  dinBody: RegisterCredentials;
}
