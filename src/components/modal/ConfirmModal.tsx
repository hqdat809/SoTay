import { Button } from "@mui/material";
import "./ConfirmModal.scss";
import Modal from "./Modal";

interface IConfirmModalProps {
  isOpen: boolean;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal = ({
  isOpen,
  title,
  onConfirm,
  onCancel,
}: IConfirmModalProps) => {
  return (
    <Modal title={title} open={isOpen} handleCloseModal={onCancel}>
      <div className="ConfirmModal">
        <Button
          onClick={() => {
            onConfirm();
            onCancel();
          }}
          variant="contained"
        >
          Xác nhận
        </Button>
        <Button onClick={onCancel} color="error" variant="contained">
          Hủy
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
