import { renderHook } from "@testing-library/react";
import { vi } from "vitest";
import { useAuth } from "../../../../src/app/core/hooks/useAuth";
import useLogin from "../../../../src/app/core/hooks/auth/useLogin";
import useRegister from "../../../../src/app/core/hooks/auth/useRegister";

vi.mock("../../../../src/app/core/hooks/auth/useLogin", () => ({
  __esModule: true,
  default: vi.fn(),
}));

vi.mock("../../../../src/app/core/hooks/auth/useRegister", () => ({
  __esModule: true,
  default: vi.fn(),
}));

describe("useAuth", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debería devolver handleLogin y handleRegister", () => {
    const mockLogin = vi.fn();
    const mockRegister = vi.fn();

    (useLogin as vi.Mock).mockReturnValue(mockLogin);
    (useRegister as vi.Mock).mockReturnValue(mockRegister);

    const { result } = renderHook(() => useAuth());

    expect(result.current.handleLogin).toBe(mockLogin);
    expect(result.current.handleRegister).toBe(mockRegister);
  });

  it("debería llamar a handleLogin cuando se invoca desde useAuth", async () => {
    const mockLogin = vi.fn();
    (useLogin as vi.Mock).mockReturnValue(mockLogin);

    const { result } = renderHook(() => useAuth());

    const mockCredentials = { username: "test", password: "123456" };
    await result.current.handleLogin(mockCredentials);

    expect(mockLogin).toHaveBeenCalledWith(mockCredentials);
  });

  it("debería llamar a handleRegister cuando se invoca desde useAuth", async () => {
    const mockRegister = vi.fn();
    (useRegister as vi.Mock).mockReturnValue(mockRegister);

    const { result } = renderHook(() => useAuth());

    const mockRegistrationData = { username: "newUser", password: "password" };
    await result.current.handleRegister(mockRegistrationData);

    expect(mockRegister).toHaveBeenCalledWith(mockRegistrationData);
  });
});
