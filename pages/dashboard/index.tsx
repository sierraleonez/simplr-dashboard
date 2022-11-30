import Button from "components/Button";
import { StaticPageProps } from "Constants/Pages";
import React from "react";
import Columns from "components/ToDo/Columns";
import { useCustomHook } from "./useCustomHooks";
import Texts from "components/Text";
import TextInput from "components/TextInput";
import { CreateTaskForm } from "./form";

function Dashboard() {
  const {
    logout,
    onDragEnd,
    items,
    deleteItem,
    register,
    errors,
    atColumn,
    handleSubmit,
    onCreateTaskSubmit,
    onCreateTaskInput,
  } = useCustomHook();
  return (
    <div>
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

export async function getStaticProps(): Promise<StaticPageProps> {
  return {
    props: {
      flow: "main",
    },
  };
}

export default Dashboard;
