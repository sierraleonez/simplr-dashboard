import React, { useEffect, useRef, useState } from "react";
import Button from "components/Button";
import { MdClose } from "react-icons/md";
import { StaticPageProps } from "Constants/Pages";
import Columns from "components/ToDo/Columns";
import { useCustomHook } from "./useCustomHooks";
import Texts from "components/Text";
import TextInput from "components/TextInput";
import { CreateTaskForm } from "./form";
import styles from "./dashboard.module.css";

function Dashboard() {
  const {
    logout,
    items,
    errors,
    atColumn,
    register,
    onDragEnd,
    deleteItem,
    isModalOpen,
    handleSubmit,
    setIsModalOpen,
    onCreateTaskInput,
    onCreateTaskSubmit,
  } = useCustomHook();
  return (
    <div>
      <ActionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Button onPress={logout} type="link">
        <p>Logout</p>
      </Button>
      <Columns
        item={items}
        onDragEnd={onDragEnd}
        onDelete={deleteItem}
        onCreateTaskInput={onCreateTaskInput}
      />
      <div style={{ width: "300px" }}>
        <Texts>At column: {atColumn}</Texts>
        <form onSubmit={handleSubmit(onCreateTaskSubmit)}>
          {CreateTaskForm(register, errors).map((inputProps) => (
            <TextInput {...inputProps} key={inputProps.label} />
          ))}
          <input type={"submit"} />
        </form>
      </div>
    </div>
  );
}

function useFocus() {
  const htmlRef = useRef<HTMLInputElement>(null);
  const setFocus = () => {
    console.log(!!htmlRef.current?.id);
    htmlRef.current && htmlRef.current.focus();
  };

  return { htmlRef, setFocus };
}

type Provided = {
  ref: React.RefObject<HTMLInputElement | HTMLTextAreaElement>;
  className: string;
  disabled: boolean;
  onBlur: () => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};
type FocusWrapperProps = {
  children: (provided: Provided) => React.ReactNode;
};
function FocusWrapper({ children }: FocusWrapperProps) {
  const [isFieldDisabled, setIsFieldDisabled] = useState<boolean>(true);
  const { htmlRef, setFocus } = useFocus();

  useEffect(() => {
    if (!isFieldDisabled) {
      setFocus();
    }
  }, [isFieldDisabled]);

  function onBlur() {
    setIsFieldDisabled(true);
  }

  function onKeyDown(
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    if (event.code === "Escape") {
      event.currentTarget.blur();
    }
  }
  console.log(children.name);
  const Provided = {
    ref: htmlRef,
    className: styles.inputContainer,
    disabled: isFieldDisabled,
    onBlur,
    onKeyDown,
  };
  return (
    <div
      onClick={() => {
        setIsFieldDisabled(false);
      }}
    >
      {children(Provided)}
    </div>
  );
}

type ActionModalProps = {
  onClose: () => void;
  isOpen: boolean;
};

function ActionModal({ isOpen, onClose }: ActionModalProps) {
  if (isOpen) {
    return (
      <div className={styles.modalOverlay}>
        <div
          style={{
            backgroundColor: "#FFF",
            width: "40%",
            height: "60%",
            borderRadius: 16,
            padding: "16px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <FocusWrapper>{(provided) => <input {...provided} />}</FocusWrapper>

            <Button onPress={onClose} type="link">
              <MdClose />
            </Button>
          </div>
        </div>
          <FocusWrapper>
            {(provided) => <textarea {...provided} />}
          </FocusWrapper>
      </div>
    );
  } else {
    return null;
  }
}

export async function getStaticProps(): Promise<StaticPageProps> {
  return {
    props: {
      flow: "main",
    },
  };
}

export default Dashboard;
