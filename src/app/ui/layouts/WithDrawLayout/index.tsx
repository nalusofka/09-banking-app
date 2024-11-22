import React from 'react';
import Nav from "@components/Nav";
import './style.scss';

const WithDrawLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const links = [
    { to: "/inicio", label: "Inicio" },
    { to: "/transacciones", label: "Transacciones" },
    { to: "/depositos", label: "Depósitos" },
    { to: "/retiros", label: "Retiros" },
    { to: "/compras", label: "Compras"}
  ];

  return (
    <div className="withdraw-layout-container">
      <Nav links={links} />

      <div className="withdraw-layout-container_children">
        {children}
      </div>
    </div>
  );
};

export default WithDrawLayout;
