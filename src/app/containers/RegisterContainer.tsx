import React, { useState } from "react";
import { RegisterCredentials } from "../core/interfaces/auth";
import { useAuth } from "../core/hooks/useAuth";
import Button from "../ui/components/Button";
import Input from "../ui/components/Input";
import Title from "../ui/components/Title";
import Body from "../ui/components/Body";
import { Link, useNavigate } from "react-router-dom";
import RegisterLayout from "../ui/layouts/RegisterLayout";

const RegisterContainer: React.FC = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState<RegisterCredentials>({
    username: "",
    password: "",
    name: "",
    lastname: "",
    roles: ["CUSTOMER"]
  });
  const { handleRegister } = useAuth(); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleRegister(credentials); 
    navigate("/inicio");
  };

  return (
    <RegisterLayout>
      <Title as="h1">Banca online</Title>
      <br />
      <Title as="h3">Registro</Title>
      <br />
      <Body>Únete ingresando tus datos de usuario y contraseña</Body>
      <form onSubmit={handleSubmit}>
        <Input type="text" id="name" name="name" value={credentials.name} onChange={handleChange} required label="Nombre" />
        <Input type="text" id="lastname" name="lastname" value={credentials.lastname} onChange={handleChange} required label="Apellido" />
        <Input type="text" id="username" name="username" value={credentials.username} onChange={handleChange} required label="Nombre de usuario" />
        <Input type="password" id="password" name="password" value={credentials.password} onChange={handleChange} required label="Contraseña" />
        <Button type="submit">Registrarme</Button>
      </form>
      <br />
      <Body>Si ya tienes cuenta, puedes <Link to="/login" className="link">Iniciar sesión</Link></Body>
    </RegisterLayout>
  );
};

export default RegisterContainer;
