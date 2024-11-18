/* eslint-disable @typescript-eslint/no-explicit-any */
import { HTTP_METHODS } from "../../constants/httpMethods";

export const getAuthToken = (state: any) => state.auth.token;

export const http = async (url: string, method: HTTP_METHODS, data?: React.ReactNode, token?: string) => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      method: method.toString(),
      headers,
      body: data ? JSON.stringify(data) : undefined,
    });
    
    console.log(headers)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(error as string ?? "Something went wrong");
  }
};
