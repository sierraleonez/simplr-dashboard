import { StaticPageProps } from "Constants/Pages";
import { useCustomHook } from "./useCustomHooks";
import { Button, Columns } from "components";
import ContentModal from "./Component/ContentModal";

function Dashboard() {
  const {
    logout,
    items,
    onDragEnd,
    deleteItem,
    contentValue,
    setContentValue,
    setTitleValue,
    titleValue,
    isModalOpen,
    onSubmitModal,
    onCreateTaskInput,
    onCreateTaskSubmit,
    onCloseModal,
    openEditModal,
  } = useCustomHook();
  return (
    <div>
      <ContentModal
        isOpen={isModalOpen}
        onClose={onCloseModal}
        onSubmitModal={onSubmitModal}
        contentValue={contentValue}
        titleValue={titleValue}
        setTitlevalue={setTitleValue}
        setContentValue={setContentValue}
        onCreateTaskSubmit={onCreateTaskSubmit}
      />
      <Button onPress={logout} type="link">
        Logout
      </Button>
      <Columns
        item={items}
        onDragEnd={onDragEnd}
        onEdit={openEditModal}
        onDelete={deleteItem}
        onCreateTaskInput={onCreateTaskInput}
      />
    </div>
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
