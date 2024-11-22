import React from 'react';
import Nav from "@components/Nav";
import './style.scss';

const RegisterLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const links = [
    { to: "/register", label: "Registrarse" },
    { to: "/login", label: "Iniciar sesión" }
  ];

  return (
    <div className="register-layout-container">
      <Nav links={links} />
      <div className="register-layout-container_left">{children}</div>
      <div className="register-layout-container_right"></div>
    </div>
  );
};

export default RegisterLayout;
