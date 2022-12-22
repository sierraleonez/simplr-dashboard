import { MdClose } from "react-icons/md";
import { StaticPageProps } from "Constants/Pages";
import { useCustomHook } from "./useCustomHooks";
import { CreateTaskForm } from "./form";
import styles from "./dashboard.module.css";
import {
  FocusWrapper,
  Button,
  Text,
  TextInput,
  Columns,
  ActionModal,
} from "components";

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
      <ContentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
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
        <Text>At column: {atColumn}</Text>
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

type ActionModalProps = {
  onClose: () => void;
  isOpen: boolean;
};

function ContentModal({ isOpen, onClose }: ActionModalProps) {
  return (
    <ActionModal isOpen={isOpen} onClose={onClose}>
      <div style={{ display: "flex" }}>
        <FocusWrapper style={{ flex: 1 }}>
          {(provided) => (
            <input
              {...provided}
              className={styles.inputContainer}
              placeholder="Input your title here"
              style={{
                width: "100%",
                flex: 1,
                padding: "8px",
                borderRadius: "4px",
              }}
            />
          )}
        </FocusWrapper>
        <FocusWrapper style={{ flex: 1, height: "50%" }}>
          {(provided) => (
            <textarea
              {...provided}
              placeholder="input your content here"
              style={{
                overflowY: "scroll",
                height: "100%",
                resize: "none",
                width: "95%",
                borderRadius: 8,
                padding: 8,
              }}
            />
          )}
        </FocusWrapper>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: 16,
            marginRight: 32,
          }}
        >
          <Button
            type="regular"
            onPress={() => "hello"}
            style={{ width: "10%", borderRadius: 8 }}
            bgColor="#ADD8E6"
          >
            Save
          </Button>
        </div>
        <div>
          <Button onPress={onClose} type="link" style={{ marginLeft: "64px" }}>
            <MdClose size={24} />
          </Button>
        </div>
      </div>
    </ActionModal>
  );
}

export async function getStaticProps(): Promise<StaticPageProps> {
  return {
    props: {
      flow: "main",
    },
  };
}

export default Dashboard;
