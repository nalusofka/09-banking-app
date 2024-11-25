import React, { useState, useEffect } from "react";
import { dinHeader } from "@utils/headerUtils";
import { handleInputChange, handleSelectChange } from "@utils/formUtils";
import { options } from "@constants/select";
import { PurchaseCardRequest } from "@interfaces/transaction";
import { useTransaction } from "@hooks/useTransaction";
import Body from "@components/Body";
import Button from "@components/Button";
import CustomSelect from "@components/Select";
import DepositsLayout from "@layouts/DepositsLayout";
import Input from "@components/Input";
import Title from "@components/Title";
import Toast from "@components/Toast"

const PurchaseContainer: React.FC = () => {
  const { handlePurchaseCard } = useTransaction();

  const [purchaseRequest, setPurchaseRequest] = useState<PurchaseCardRequest>({
    dinHeader,
    dinBody: { accountNumber: "", amount: 0, purchaseType: "" },
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    const { accountNumber, amount, purchaseType } = purchaseRequest.dinBody;
    setIsFormValid(accountNumber.trim() !== "" && amount > 0 && purchaseType.trim() !== "");
  }, [purchaseRequest]);

  const submitPurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await handlePurchaseCard(purchaseRequest);
      showToast("Compra realizada con éxito", "success");
    } catch (error) {
      showToast("Error al realizar la compra", "error");
    }
  };

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  return (
    <DepositsLayout>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <form onSubmit={submitPurchase}>
        <Title as="h3" color="primary">Compras</Title>
        <br />
        <Body color="primary">Realiza tus compras en tiendas físicas y online. Las compras se pueden hacer desde la sucursal o desde la web. Tienen un coste dependiendo desde dónde se realicen</Body>
        <br />
        <Body color="primary"><b>En establecimiento físico:</b> sin costo adicional</Body>
        <Body color="primary"><b>En página web:</b> $U5.00</Body>
        <br />
        <CustomSelect value={purchaseRequest.dinBody.purchaseType ? { value: purchaseRequest.dinBody.purchaseType, label: purchaseRequest.dinBody.purchaseType } : null} onChange={(option) => handleSelectChange("purchaseType", option, setPurchaseRequest)} options={options} />
        <Input color="primary" type="text" id="accountNumber" name="accountNumber" value={purchaseRequest.dinBody.accountNumber} onChange={(e) => handleInputChange(e, setPurchaseRequest)} required label="Número de cuenta" />
        <Input color="primary" type="number" id="amount" name="amount" value={purchaseRequest.dinBody.amount === 0 ? "" : purchaseRequest.dinBody.amount} onChange={(e) => handleInputChange(e, setPurchaseRequest)} required label="Monto" />
        <Button type="submit" disabled={!isFormValid}>Comprar</Button>
      </form>
    </DepositsLayout>
  );
};

export default PurchaseContainer;
