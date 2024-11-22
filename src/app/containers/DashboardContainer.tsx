/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { dinHeader } from "@utils/headerUtils";
import { useAccount } from "@hooks/useAccount";
import { useGetCustomer } from "@hooks/useGetCustomer";
import Body from "@components/Body";
import CreateAccountCard from "@components/CreateAccountCard";
import DashboardLayout from "@layouts/DashboardLayout";
import Title from "@components/Title";
import UserInfo from "@components/UserInfo";

const DashboardContainer: React.FC = () => {
  const { handleFetchCustomerAccounts, handleCreateBankAccount, handleRemoveAccount } = useAccount();
  const { state: customerState, fetchCustomer } = useGetCustomer();
  const [accounts, setAccounts] = useState<any[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);

  const customerId = localStorage.getItem("customerId");

  useEffect(() => {
    if (customerId) {
      fetchCustomer(customerId);
    }
  }, []);

  useEffect(() => {
    if (customerState.data) {
      localStorage.setItem("username", customerState.data.username);
      localStorage.setItem("name", customerState.data.name);
      localStorage.setItem("lastname", customerState.data.lastname);
    }
  }, [customerState]);

  useEffect(() => {
    if(customerId) {
      (async () => {
        try {
          const { dinBody } = await handleFetchCustomerAccounts({ dinHeader, dinBody: { id: customerId } });
          setAccounts(dinBody.map(({ id, number, amount }: { id: string, number: string, amount: number }) => ({
            accountId: id,
            accountNumber: number,
            amount,
          })));
        } catch (error) {
          return error;
        }
      })();
    }
  }, [customerId, handleFetchCustomerAccounts, refresh]); 

  const handleCreateAccount = async () => {
    if (customerId) {
      try {
        await handleCreateBankAccount({ dinHeader, dinBody: { customerId, amount: 1000 } });
        setRefresh(!refresh);
      } catch (error) {
        return error;
      }
    }
  };

  const handleDeleteAccount = async (accountNumber: number) => {
    const accountToDelete = accounts.find((account) => account.accountNumber === accountNumber);
        try {
        await handleRemoveAccount({ dinHeader, dinBody: { id: accountToDelete.accountId } });
        setRefresh(!refresh);
      } catch (error) {
        return error;
      }
  };

  return (
    <DashboardLayout>
      <UserInfo name={localStorage.getItem("name")!} lastname={localStorage.getItem("lastname")!} username={localStorage.getItem("username")!} />
      <Title as="h3" color="primary">Tus cuentas</Title>
      <Body color="primary">Administra tus cuentas de forma segura y conveniente. Crea tu cuenta para comenzar a depositar y retirar dinero</Body>
      <CreateAccountCard accounts={accounts} onCreateAccount={handleCreateAccount} onRemoveAccount={handleDeleteAccount} />
    </DashboardLayout>
  );
};

export default DashboardContainer;
