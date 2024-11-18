export interface Account {
  id: string;
  accountNumber: string;
  accountType: 'checking' | 'savings' | 'credit';
  balance: number;
  currency: 'USD' | 'EUR' | 'GBP' | 'JPY' | 'other';
  createdAt: Date;
  ownerId: string;
}

export interface DinHeader {
  device: string;
  language: string;
  uuid: string;
  ip: string;
  transactionTime: string;
}

export interface BankAccountCreateRequest {
  dinHeader: DinHeader;
  dinBody: {
    customerId: string;
    amount: number;
  };
}

export interface BankAccountGetRequest {
  dinHeader: DinHeader;
  dinBody: {
    id: string;
  };
}

export interface BankAccountDeleteRequest {
  dinHeader: DinHeader;
  dinBody: {
    id: string;
  };
}

export interface BankAccountCustomerGetRequest {
  dinHeader: DinHeader;
  dinBody: {
    id: string;
  };
}
