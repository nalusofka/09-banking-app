/* eslint-disable @typescript-eslint/no-explicit-any */
import { CustomerGetRequest } from '@interfaces/customer';

const API_URL = import.meta.env.VITE_API_URL;
const SYMMETRIC_KEY = import.meta.env.VITE_SYMMETRIC_KEY;
const INITIALIZATION_VECTOR = import.meta.env.VITE_INITIALIZATION_VECTOR;

const makeCustomerRequest = async (url: string, payload: any) => {
  try {
    const response = await fetch(`${API_URL}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(payload),
    });

    return await response.json();
  } catch (error: any) {
    throw new Error(`Error en la solicitud de cliente: ${error.message}`);
  }
};

export const getCustomer = async (request: CustomerGetRequest) => {
  const payload = {
    dinHeader: {
      device: request.dinHeader.device || '',
      language: request.dinHeader.language || '',
      uuid: request.dinHeader.uuid || '',
      ip: request.dinHeader.ip || '',
      transactionTime: new Date().toISOString(),
      symmetricKey: SYMMETRIC_KEY,
      initializationVector: INITIALIZATION_VECTOR,
    },
    dinBody: { id: request.dinBody.id },
  };

  const response = await makeCustomerRequest('/api/v1/public/customers/get', payload);

  return response;
};
