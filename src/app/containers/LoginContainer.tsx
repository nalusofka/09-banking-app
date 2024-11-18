import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthCredentials } from "@interfaces/auth";
import Button from "../ui/components/Button";
import Input from "../ui/components/Input";
import LoginLayout from "../ui/layouts/LoginLayout";
import Title from "../ui/components/Title";
import Body from "../ui/components/Body";
import { Link } from "react-router-dom";
import { useAuth } from "../core/hooks/useAuth";

const LoginContainer: React.FC = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<AuthCredentials>({
    username: "",
    password: "",
  });
  const { handleLogin } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isSuccess = await handleLogin(credentials);

    if (isSuccess) {
      navigate("/inicio");
    } else {
      setErrorMessage("Error al iniciar sesión. Verifica tus credenciales.");
    }
  };

  return (
    <LoginLayout>
      <Title as="h1">Banca online</Title>
      <br />
      <Title as="h3">Inicia sesión</Title>
      <br />
      <Body>Bienvenido a la aplicación de banca online. Ingresa tus credenciales para comenzar.</Body>
      <form onSubmit={handleSubmit}>
        <Input type="text" id="username" name="username" value={credentials.username} onChange={handleChange} required label="Nombre de usuario" />
        <Input type="password" id="password" name="password" value={credentials.password} onChange={handleChange} required label="Contraseña" />
        <Button type="submit">Ingresar</Button>
      </form>
      <br />
      <Body>Si no tienes cuenta, puedes <Link to="/register" className="link">registrarte</Link></Body>
      {errorMessage && <Body className="error-message">Error al iniciar sesión, intenta de nuevo</Body>}
    </LoginLayout>
  );
};

export default LoginContainer;
