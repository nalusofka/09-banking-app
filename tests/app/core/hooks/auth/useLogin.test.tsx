import '@testing-library/jest-dom';
import { renderHook } from "@testing-library/react";
import { vi } from "vitest";
import useLogin from "../../../../../src/app/core/hooks/auth/useLogin";
import { login } from "../../../../../src/app/core/services/auth.service";

vi.mock("../../../../../src/app/core/services/auth.service", () => ({
  login: vi.fn(),
}));

const mockHandleRequest = vi.fn();

vi.mock("../../../../../src/app/core/hooks/auth/useAuthHandler", () => ({
  default: () => ({
    handleRequest: mockHandleRequest,
  }),
}));

describe("useLogin", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debería llamar a handleRequest con los parámetros correctos", async () => {
    const { result } = renderHook(() => useLogin());

    const credentials = {
      username: "johndoe",
      password: "password123",
    };

    const mockRequest = {
      dinHeader: expect.anything(),
      dinBody: {
        username: "johndoe",
        password: "password123",
      },
    };

    const mockResponse = true;

    mockHandleRequest.mockResolvedValue(mockResponse);

    const resultValue = await result.current(credentials);

    expect(mockHandleRequest).toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
      expect.anything(),
      login,
      mockRequest
    );

    expect(resultValue).toBe(mockResponse);
  });

  it("debería manejar errores correctamente", async () => {
    const { result } = renderHook(() => useLogin());

    const credentials = {
      username: "johndoe",
      password: "password123",
    };

    const error = new Error("Login failed");

    mockHandleRequest.mockRejectedValue(error);

    await expect(result.current(credentials)).rejects.toThrow("Login failed");

    expect(mockHandleRequest).toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
      expect.anything(),
      login,
      expect.anything()
    );
  });
});
