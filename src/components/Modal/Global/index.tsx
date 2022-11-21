import Button from "components/Button";
import styles from "components/Modal/modal.module.css";
import Texts from "components/Text";
import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";

type ModalProviderProps = {
  children: React.ReactNode;
};

type ModalContextInterface = {
  modalState: GlobalModalState;
  openModal: openModal;
};

type GlobalModalType = "error" | "warning" | "success" | "notification";

type GlobalModalState = {
  isVisible: boolean;
  message?: string;
  type?: GlobalModalType;
};

type openModal = (message: string, type: GlobalModalType) => void;

const ModalContext = React.createContext<ModalContextInterface | null>(null);
const { Provider } = ModalContext;
function ModalProvider({ children }: ModalProviderProps) {
  const [modalState, setModalState] = useState<GlobalModalState>({
    isVisible: false,
    message: "",
    type: "notification",
  });
  function openModal(
    message: string = "",
    type: GlobalModalType = "notification"
  ) {
    setModalState({ isVisible: true, message, type });
  }
  useEffect(() => {
    if (modalState.isVisible) {
      setTimeout(() => {
        setModalState({ isVisible: false });
      }, 4900);
    }
  }, [modalState.isVisible]);
  return (
    <Provider
      value={{
        modalState,
        openModal,
      }}
    >
      {modalState.isVisible && (
        <GlobalModal
          isVisible={modalState.isVisible}
          onCloseModal={() => setModalState({ isVisible: false })}
          message={modalState.message || ""}
        />
      )}
      {children}
    </Provider>
  );
}
const useModal = () => useContext(ModalContext);

type GlobalModalProps = {
  isVisible: boolean;
  onCloseModal: () => void;
  message: string;
};

function GlobalModal({ isVisible, onCloseModal, message }: GlobalModalProps) {
  return (
    <div
      className={styles.globalModal}
      style={{ animationPlayState: isVisible ? "running" : "paused" }}
    >
      <Texts color="#FFF" style={{ flex: 10 }}>
        {message}
      </Texts>
      <Button type="link" onPress={onCloseModal} style={{ flex: 0.5 }}>
        <MdClose />
      </Button>
    </div>
  );
}
export { ModalProvider, useModal };
