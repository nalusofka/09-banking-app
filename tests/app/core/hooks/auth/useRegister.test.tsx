/* eslint-disable @typescript-eslint/no-require-imports */
import { renderHook } from "@testing-library/react";
import { vi } from "vitest";
import { MockAppContextProvider } from "../../../../../src/app/core/state/MockAppContext";
import useRegister from "../../../../../src/app/core/hooks/auth/useRegister";
import { register } from "../../../../../src/app/core/services/auth.service";
import { createBankAccount } from "../../../../../src/app/core/services/account.service";
import React from "react";

vi.mock("../../../../../src/app/core/services/auth.service", () => ({
  register: vi.fn(),
}));

vi.mock("../../../../../src/app/core/services/account.service", () => ({
  createBankAccount: vi.fn(),
}));

describe("useRegister", () => {
  const mockState = {
    auth: {
      isAuthenticated: false,
    },
  };

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <MockAppContextProvider state={mockState}>{children}</MockAppContextProvider>
  );

  const mockHandleRequest = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockHandleRequest.mockResolvedValue({
      dinBody: { customerId: "12345" },
    });
  });

  it("debería llamar a register y luego a createBankAccount con los parámetros correctos", async () => {
    const { result } = renderHook(() => useRegister(), { wrapper });

    const credentials = {
      username: "johndoe",
      password: "password123",
      name: "John",
      lastname: "Doe",
      roles: ["CUSTOMER"],
    };

    (register as vi.Mock).mockResolvedValue({
      dinBody: { customerId: "12345" },
    });

    (createBankAccount as vi.Mock).mockResolvedValue({ success: true });

    await result.current(credentials);

    expect(register).toHaveBeenCalledWith({
      dinHeader: expect.anything(),
      dinBody: {
        name: "John",
        lastname: "Doe",
        username: "johndoe",
        password: "password123",
        roles: ["CUSTOMER"],
      },
    });

    expect(createBankAccount).toHaveBeenCalledWith({
      dinHeader: expect.anything(),
      dinBody: {
        customerId: "12345",
        amount: 1000,
      },
    });
  });
});
