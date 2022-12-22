import styles from "./ActionModal.module.css";

type ActionModalProps = {
  onClose: () => void;
  isOpen: boolean;
  children: React.ReactNode;
};

function ActionModal({ children, isOpen, onClose }: ActionModalProps) {
  if (isOpen) {
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContainer}>{children}</div>
      </div>
    );
  } else {
    return null;
  }
}

export default ActionModal;
