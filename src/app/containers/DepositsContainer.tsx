import React, { useState, useEffect } from "react";
import { DepositRequest } from "@interfaces/transaction";
import { dinHeader } from "@utils/headerUtils";
import { useTransaction } from "@hooks/useTransaction";
import Body from "@components/Body";
import Button from "@components/Button";
import CustomSelect from "@components/Select";
import DepositsLayout from "@layouts/DepositsLayout";
import Input from "@components/Input";
import Title from "@components/Title";
import { decryptAES, encryptAES } from "@core/utils/encryptionUtils";

const DepositsContainer: React.FC = () => {
  const { handleDeposit } = useTransaction();

  const [depositRequest, setDepositRequest] = useState<DepositRequest>({
    dinHeader,
    dinBody: { accountNumber: "", amount: 0, type: "", username: "" },
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const options = [
    { value: "ATM", label: "ATM" },
    { value: "BRANCH", label: "BRANCH" },
    { value: 'OTHER_ACCOUNT', label: 'OTHER_ACCOUNT'}
  ];

  useEffect(() => { 
    const accountNumber = "1234567890";
    const encryptedAccountNumber = encryptAES(accountNumber);
    console.log("Encrypted Account Number:", encryptedAccountNumber);
    
    const decryptedAccountNumber = decryptAES(encryptedAccountNumber);
    console.log("Decrypted Account Number:", decryptedAccountNumber); 
    }, []);

  useEffect(() => {
    const { accountNumber, amount, type } = depositRequest.dinBody;
    const isValid = accountNumber.trim() !== "" && amount > 0 && type.trim() !== "";
    setIsFormValid(isValid);
  }, [depositRequest]);

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

  const handleSelectChange = (selectedOption: { value: string } | null) => {
    setDepositRequest((prev) => ({
      ...prev,
      dinBody: { ...prev.dinBody, type: selectedOption?.value || "" },
    }));
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
        <br />
        <CustomSelect value={ depositRequest.dinBody.type ? { value: depositRequest.dinBody.type, label: depositRequest.dinBody.type } : null} onChange={handleSelectChange} options={options} />
        <Input color="primary" type="text" id="accountNumber" name="accountNumber" value={depositRequest.dinBody.accountNumber} onChange={handleDepositChange} required label="Número de cuenta" />
        <Input color="primary" type="number" id="amount" name="amount" value={depositRequest.dinBody.amount === 0 ? "" : depositRequest.dinBody.amount} onChange={handleDepositChange} required label="Monto" />
        <Button type="submit" disabled={!isFormValid}>Depositar</Button>
      </form>
    </DepositsLayout>
  );
};

export default DepositsContainer;
