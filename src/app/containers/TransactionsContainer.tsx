import React from "react";
import Body from "@components/Body";
import Card from "@components/Card";
import Title from "@components/Title";
import TransactionsLayout from "@layouts/TransactionsLayout";

const TransactionsContainer: React.FC = () => {
  return (
    <TransactionsLayout>
      <Title as="h2" color='primary'>Transacciones</Title>
      <Body color="primary">Administra tus depósitos, retiros y compras de forma segura y conveniente.</Body>
      <Card title="Depósitos" description="Opciones de depósito desde sucursal, cuenta o cajero" to="/depositos" />
      <Card title="Retiros" description="Realiza retiros rápidos en cajeros" to="/retiros" />
      <Card title="Compras" description="Gestiona tus compras en tiendas físicas y online" to="/compras" />
    </TransactionsLayout>
  );
};

export default TransactionsContainer;
