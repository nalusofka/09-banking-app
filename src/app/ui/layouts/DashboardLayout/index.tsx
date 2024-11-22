import React from 'react';
import Nav from "@components/Nav";
import './style.scss';

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const links = [
    { to: "/inicio", label: "Inicio" },
    { to: "/transacciones", label: "Transacciones" },
    { to: "/depositos", label: "Depósitos" },
    { to: "/retiros", label: "Retiros" },
    { to: "/compras", label: "Compras"}
  ];

  return (
    <div className="dashboard-layout-container">
      <Nav links={links} />

      <div className="dashboard-layout-container_children">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
