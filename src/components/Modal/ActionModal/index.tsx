import styles from "./ActionModal.module.css";

type ActionModalProps = {
  isOpen: boolean;
  children: React.ReactNode;
};

function ActionModal({ children, isOpen }: ActionModalProps) {
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
