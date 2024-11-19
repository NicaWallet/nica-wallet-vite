import Modal from "../../../components/Modal";
import { DetailTransaction } from "./DetailTransaction";

interface ITransactionDetailModalProps {
  isOpen: boolean;
  transactionData: any; // TODO: Cambiar el tipado
  onClose: () => void;
}

export const TransactionDetailModal = (props: ITransactionDetailModalProps) => {
  return (
    <Modal
      title={"DETAILS_OF_TRANSACTION"}
      variant="info"
      onClose={props.onClose}
      modalContent={<DetailTransaction transaction={props.transactionData} />}
      isOpen={props.isOpen}
      open={false}
    >
      {/* <DetailTransaction transaction={props.transactionData} /> */}
    </Modal>
  );
};
