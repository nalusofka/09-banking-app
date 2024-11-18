import useLogin from "./auth/useLogin";
import useRegister from "./auth/useRegister";

export const useAuth = () => ({
  handleLogin: useLogin(),
  handleRegister: useRegister(),
});
