import React, { useState } from "react";
import { useTransaction } from "../core/hooks/useTransaction";
import { DepositRequest } from "../core/interfaces/transaction";
import Input from "../ui/components/Input";
import Button from "../ui/components/Button";
import DepositsLayout from "../ui/layouts/DepositsLayout";
import Title from "../ui/components/Title";
import Body from "../ui/components/Body";
import { dinHeader } from "../core/utils/headerUtils";

const DepositsContainer: React.FC = () => {
  const { handleDeposit } = useTransaction();

  const [depositRequest, setDepositRequest] = useState<DepositRequest>({
    dinHeader,
    dinBody: { accountNumber: "", amount: 0, type: "", username: "" },
  });

  const handleDepositChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDepositRequest((prev) => ({
      ...prev,
      dinBody: { ...prev.dinBody, [name]: name === "amount" ? parseFloat(value) : value },
    }));
  };

  const submitDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleDeposit(depositRequest);
  };

  return (
    <DepositsLayout>
      <form onSubmit={submitDeposit}>
        <Title as="h3" color="primary">Depósitos</Title>
        <br />
        <Body color="primary">Realiza depósitos rápidos en cajeros. Los depósitos se pueden hacer desde la sucursal o desde el cajero. Tienen un coste dependiendo desde dónde se realicen</Body>
        <br />
        <Body color="primary"><b>Desde sucursal:</b> sin costo</Body>
        <Body color="primary"><b>Desde cajero:</b> $U2.00</Body>
        <Body color="primary"><b>Desde otra cuenta:</b> $U1.5</Body>
        <Input color="primary" type="text" id="username" name="username" value={depositRequest.dinBody.username} onChange={handleDepositChange} required label="Nombre de usuario" />
        <Input color="primary" type="text" id="accountNumber" name="accountNumber" value={depositRequest.dinBody.accountNumber} onChange={handleDepositChange} required label="Número de cuenta" />
        <Input color="primary" type="number" id="amount" name="amount" value={depositRequest.dinBody.amount === 0 ? '' : depositRequest.dinBody.amount} onChange={handleDepositChange} required label="Monto" />
        <Button type="submit">Depositar</Button>
      </form>
    </DepositsLayout>
  );
};

export default DepositsContainer;
