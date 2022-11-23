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
  openErrorModal: openErrorModal;
};

type GlobalModalType = "error" | "warning" | "success" | "notification";

type GlobalModalState = {
  isVisible: boolean;
  message?: string;
  type?: GlobalModalType;
};

type openModal = (message: string, type: GlobalModalType) => void;
type openErrorModal = (error: any) => void;

const ModalContext = React.createContext<ModalContextInterface | null>(null);
const { Provider } = ModalContext;
function ModalProvider({ children }: ModalProviderProps) {
  const [modalState, setModalState] = useState<GlobalModalState>({
    isVisible: false,
    message: "",
    type: "notification",
  });

  /**
   * Open general modal, you can specify what type of modal that you want
   * @param message Message to be displayed on modal
   * @param type Type of the modal
   */
  function openModal(
    message: string = "",
    type: GlobalModalType = "notification"
  ) {
    setModalState({ isVisible: true, message, type });
  }

  /**
   * Open error modal with specific payload, only accepting AxiosError object
   * 
   * if error message from BE response is undefined,
   * then we'll use axios.message field for the error message
   * @warning Use it only with simplr context
   * @param error Error object from catch block (AxiosError Object)
   */
  function openErrorModal(error: any) {
    setModalState({
      isVisible: true,
      message: error.error?.response?.data?.Message || error.error.message,
      type: "error",
    });
  }

  useEffect(() => {
    if (modalState.isVisible) {
      // Close modal after 4s inactivity
      // 4000ms + animateIn(400ms) + animateOut(400ms)
      setTimeout(() => {
        setModalState({ isVisible: false });
      }, 4800);
    }
  }, [modalState.isVisible]);

  return (
    <Provider
      value={{
        modalState,
        openModal,
        openErrorModal
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
