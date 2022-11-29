import Button from "components/Button";
import { StaticPageProps } from "Constants/Pages";
import React from "react";
import Columns from "components/ToDo/Columns";
import { useCustomHook } from "./useCustomHooks";

function Dashboard() {
  const { logout, onDragEnd, items, deleteItem } = useCustomHook();
  return (
    <div>
      <Button onPress={logout} type="link">
        <p>Logout</p>
      </Button>
      <Columns item={items} onDragEnd={onDragEnd} onDelete={deleteItem} />
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
