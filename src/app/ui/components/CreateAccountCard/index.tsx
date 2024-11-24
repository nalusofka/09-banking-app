import React, { useState } from "react";
import { PiPlusLight, PiTrashLight, PiClipboardLight } from "react-icons/pi";
import Body from "../Body";
import Title from "../Title";
import Modal from "../Modal";
import "./style.scss";

interface Account {
  accountId: string;
  accountNumber: number;
  amount: number;
  deleted: boolean;
}

interface CreateAccountCardProps {
  accounts?: Account[];
  onCreateAccount: () => void;
  onRemoveAccount: (accountNumber: number) => void;
}

const CreateAccountCard: React.FC<CreateAccountCardProps> = ({ accounts = [], onCreateAccount, onRemoveAccount }) => {
  const [modalState, setModalState] = useState<{
    isModalOpen: boolean;
    isDeleteModalOpen: boolean;
    accountToDelete: number | null;
  }>({
    isModalOpen: false,
    isDeleteModalOpen: false,
    accountToDelete: null,
  });

  const [copiedAccount, setCopiedAccount] = useState<number | null>(null);

  const toggleModal = (modalType: 'isModalOpen' | 'isDeleteModalOpen', isOpen: boolean) => {
    setModalState((prevState) => ({ ...prevState, [modalType]: isOpen }));
  };

  const handleOpenDeleteModal = (accountNumber: number) => {
    setModalState({ ...modalState, accountToDelete: accountNumber, isDeleteModalOpen: true });
  };

  const handleConfirmCreateAccount = () => {
    onCreateAccount();
    toggleModal('isModalOpen', false);
  };

  const handleConfirmDeleteAccount = () => {
    if (modalState.accountToDelete) onRemoveAccount(modalState.accountToDelete);
    toggleModal('isDeleteModalOpen', false);
    setModalState((prevState) => ({ ...prevState, accountToDelete: null }));
  };

  const handleCopyToClipboard = (accountNumber: number) => {
    navigator.clipboard.writeText(accountNumber.toString())
      .then(() => setCopiedAccount(accountNumber)) 
      .catch(() => setCopiedAccount(null));

    setTimeout(() => {
      setCopiedAccount(null);
    }, 2000);
  };

  return (
    <div className="create-account-card">
      {accounts.filter(account => account.deleted === false).map((account) => (
        <div key={account.accountNumber} className="create-account-card_content">
          <div>
            <Title as="h4" className="create-account-card_title">
              <b className="create-account-card_label">N° de cuenta:</b> {account.accountNumber}
              <button className="create-account-card_copy-btn"onClick={() => handleCopyToClipboard(account.accountNumber)} title="Copiar al portapapeles">
                <PiClipboardLight size={20} color="#007bff" />
              </button>
              {copiedAccount === account.accountNumber && <span className="tooltip">¡Copiado!</span>}
            </Title>
            <Title as="h5" className="create-account-card_title"><b className="create-account-card_label">Saldo disponible:</b> $U{account.amount}</Title>
          </div>
          <PiTrashLight size={20} color="#ff0000" className="create-account-card_trash-icon" onClick={() => handleOpenDeleteModal(account.accountNumber)} />
        </div>
      ))}

      <div className="create-account-card_new-content" onClick={() => toggleModal('isModalOpen', true)}>
        <PiPlusLight size={30} color="#d1d1d1" />
        <Title as="h4" className="create-account-card_empty-title">Crear una nueva cuenta</Title>
        <Body className="create-account-card_empty-description">Puedes tener varias cuentas para organizar tus gastos y ahorrar dinero</Body>
      </div>

      <Modal isOpen={modalState.isModalOpen} onClose={() => toggleModal('isModalOpen', false)} title="Confirmar creación de cuenta" onConfirm={handleConfirmCreateAccount}><p>¿Estás seguro de que deseas crear una nueva cuenta?</p></Modal>
      <Modal isOpen={modalState.isDeleteModalOpen} onClose={() => toggleModal('isDeleteModalOpen', false)} title="Confirmar eliminación de cuenta" onConfirm={handleConfirmDeleteAccount}><p>¿Estás seguro de que deseas eliminar esta cuenta?</p></Modal>
    </div>
  );
};

export default CreateAccountCard;
