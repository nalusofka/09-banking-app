import React from 'react';
import Nav from "@components/Nav";
import './style.scss';

const TransactionsLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const links = [
    { to: "/inicio", label: "Inicio" },
    { to: "/transacciones", label: "Transacciones" },
    { to: "/depositos", label: "Depósitos" },
    { to: "/retiros", label: "Retiros" },
    { to: "/compras", label: "Compras"},
  ];

  return (
    <div className="transactions-layout-container">
      <Nav links={links} />

      <div className="transactions-layout-container_cards">
        {children}
      </div>
    </div>
  );
};

export default TransactionsLayout;
