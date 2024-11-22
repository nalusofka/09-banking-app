import React from "react";
import Nav from "@components/Nav";
import "./style.scss";

const LoginLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const links = [
    { to: "/register", label: "Registrarse" },
    { to: "/login", label: "Iniciar sesión" }
  ];
  
  return (
    <div className="login-layout-container">
      <Nav links={links} />
      <div className="login-layout-container_left">{children}</div>
      <div className="login-layout-container_right"></div>
    </div>
  );
};

export default LoginLayout;
