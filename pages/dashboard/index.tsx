import { MdClose } from "react-icons/md";
import { StaticPageProps } from "Constants/Pages";
import { useCustomHook } from "./useCustomHooks";
import { ICreateTaskInput } from "./form";
import styles from "./dashboard.module.css";
import { FocusWrapper, Button, Text, Columns, ActionModal } from "components";

function Dashboard() {
  const {
    logout,
    items,
    atColumn,
    onDragEnd,
    deleteItem,
    contentValue,
    setContentValue,
    setTitleValue,
    titleValue,
    isModalOpen,
    setIsModalOpen,
    onCreateTaskInput,
    onCreateTaskSubmit,
  } = useCustomHook();
  return (
    <div>
      <ContentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        contentValue={contentValue}
        titleValue={titleValue}
        setTitlevalue={setTitleValue}
        setContentValue={setContentValue}
        onCreateTaskSubmit={onCreateTaskSubmit}
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
      </div>
    </div>
  );
}

type ActionModalProps = {
  onClose: () => void;
  isOpen: boolean;
  contentValue: string;
  titleValue: string;
  setTitlevalue: (title: string) => void;
  setContentValue: (content: string) => void;
  onCreateTaskSubmit: (data: ICreateTaskInput) => void;
};

function ContentModal({
  isOpen,
  onClose,
  contentValue,
  setContentValue,
  setTitlevalue,
  titleValue,
  onCreateTaskSubmit,
}: ActionModalProps) {
  return (
    <ActionModal isOpen={isOpen} onClose={onClose}>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 2 }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onCreateTaskSubmit({ content: contentValue, title: titleValue });
            }}
          >
            <FocusWrapper style={{ flex: 1 }}>
              {(provided) => (
                <input
                  value={titleValue}
                  onChange={(event) => setTitlevalue(event.target.value)}
                  {...provided}
                  className={styles.titleInput}
                  placeholder="Input your title here"
                />
              )}
            </FocusWrapper>
            <FocusWrapper style={{ flex: 1, height: "60%" }}>
              {(provided) => (
                <textarea
                  value={contentValue}
                  onChange={(event) => setContentValue(event.target.value)}
                  {...provided}
                  placeholder="input your content here"
                  className={styles.contentTextArea}
                />
              )}
            </FocusWrapper>
            <input type={"submit"} />
          </form>
        </div>
        <Button onPress={onClose} type="link" style={{ marginLeft: "64px" }}>
          <MdClose size={24} />
        </Button>
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
