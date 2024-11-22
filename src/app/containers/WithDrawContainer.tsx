import React, { useState, useEffect } from "react";
import { dinHeader } from "@utils/headerUtils";
import { useTransaction } from "@hooks/useTransaction";
import { WithdrawRequest } from "@interfaces/transaction";
import Body from "@components/Body";
import Button from "@components/Button";
import Input from "@components/Input";
import Title from "@components/Title";
import WithDrawLayout from "@layouts/WithDrawLayout";

const WithDrawContainer: React.FC = () => {
  const { handleWithdraw } = useTransaction();

  const [withdrawRequest, setWithdrawRequest] = useState<WithdrawRequest>({
    dinHeader,
    dinBody: { accountNumber: "", amount: 0 },
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const { accountNumber, amount } = withdrawRequest.dinBody;
    const isValid = accountNumber.trim() !== "" && amount > 0;
    setIsFormValid(isValid);
  }, [withdrawRequest]);

  const handleWithdrawChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWithdrawRequest((prev) => ({
      ...prev,
      dinBody: {
        ...prev.dinBody,
        [name]: name === "amount" ? parseFloat(value) : value,
      },
    }));
  };

  const submitWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleWithdraw(withdrawRequest);
  };

  return (
    <WithDrawLayout>
      <form onSubmit={submitWithdraw}>
        <Title as="h3" color="primary">Retiros</Title>
        <br />
        <Body color="primary">Realiza retiros rápidos en cajeros. Cada retiro tiene un coste de $U1.00</Body>
        <Input color="primary" type="text" id="accountNumber" name="accountNumber" value={withdrawRequest.dinBody.accountNumber} onChange={handleWithdrawChange} required label="Número de cuenta" />
        <Input color="primary" type="number" id="amount" name="amount" value={withdrawRequest.dinBody.amount === 0 ? "" : withdrawRequest.dinBody.amount} onChange={handleWithdrawChange} required label="Monto" />
        <Button type="submit" disabled={!isFormValid}>Retirar</Button>
      </form>
    </WithDrawLayout>
  );
};

export default WithDrawContainer;
