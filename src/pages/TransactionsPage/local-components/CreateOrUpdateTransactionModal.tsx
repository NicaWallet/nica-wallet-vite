import React, { useEffect } from "react";
import Modal from "../../../components/Modal";
import { useForm } from "react-hook-form";
import { useTransactionStore } from "../../../stores/transactions/transactionStore";
import { useTranslation } from "react-i18next";
import TransactionForm from "../../../forms/TransactionsForms";

interface TransactionFormData {
  amount: number;
  category_id: number;
  subcategory_id: number;
  classification_id: number;
}

interface CreateOrUpdateTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "update";
  categories: { category_id: number; name: string }[];
  subcategories: { subcategory_id: number; name: string }[];
  classifications: { classification_id: number; name: string }[];
  transactionData?: TransactionFormData;
}

export const CreateOrUpdateTransactionModal: React.FC<
  CreateOrUpdateTransactionModalProps
> = ({
  isOpen,
  onClose,
  mode,
  categories,
  subcategories,
  classifications,
  transactionData,
}) => {
    const { t } = useTranslation();
    const { setTransactionData, clearTransactionData } = useTransactionStore();

    const form = useForm<TransactionFormData>({
      defaultValues: {
        amount: transactionData?.amount || 0,
        category_id: transactionData?.category_id || 0,
        subcategory_id: transactionData?.subcategory_id || 0,
        classification_id: transactionData?.classification_id || 0,
      },
    });

    useEffect(() => {
      if (transactionData && mode === "update") {
        form.reset({
          amount: transactionData.amount,
          category_id: transactionData.category_id,
          subcategory_id: transactionData.subcategory_id,
          classification_id: transactionData.classification_id,
        });
      } else if (mode === "create") {
        form.reset({
          amount: 0,
          category_id: 0,
          subcategory_id: 0,
          classification_id: 0,
        });
      }
    }, [transactionData, mode, form]);

    const handleSubmit = form.handleSubmit((data) => {
      setTransactionData(data);
      console.log("Submitted data:", data);
      onClose(); // Cierra el modal después de enviar los datos
    });

    const handleClose = () => {
      clearTransactionData();
      onClose();
    };

    return (
      <Modal
        isOpen={isOpen}
        title={
          mode === "create"
            ? t("CREATE_TRANSACTION_TITLE")
            : t("UPDATE_TRANSACTION_TITLE")
        }
        onClose={handleClose}
        onConfirm={handleSubmit} // Ejecuta la función de envío del formulario
        confirmText={t("SUBMIT")}
        cancelText={t("CANCEL")}
        variant={mode === "create" ? "info" : "warning"} // Estilo visual diferente para "create" y "update"
        importantAction={true}
        fullWidth={true} // Opción para ancho completo
        maxWidth="md" // Tamaño máximo del modal
        showCloseIcon={true} // Muestra el ícono de cierre
        modalContent={
          <TransactionForm
            form={form}
            categories={categories}
            subcategories={subcategories}
            classifications={classifications}
            mode={mode}
            initialData={transactionData}
          />
        }
        open={false}
      />
    );
  };