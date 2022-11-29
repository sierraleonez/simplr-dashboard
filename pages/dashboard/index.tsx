import { useAuth } from "components/Auth/provider";
import Button from "components/Button";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
  ResponderProvided,
} from "react-beautiful-dnd";
import { StaticPageProps } from "Constants/Pages";
import React, { useState } from "react";
import Texts from "components/Text";
import { ColumnType, DummyTodoData, TaskType, TodoTable } from "Constants/Todo";
import Columns from "components/ToDo/Columns";

function Dashboard() {
  const auth = useAuth();
  const [items, setItems] = useState(DummyTodoData);

  function logout() {
    auth?.setAuthState("");
  }

  function onDragEnd(res: DropResult) {
    let src_droppableId = res.source.droppableId;
    if (!res.destination) {
      return;
    }

    if (src_droppableId === res.destination.droppableId) {
      // Create copy of task id queue
      let queue = items.columns[src_droppableId].taskIds;

      // Remove source item from queue
      queue.splice(res.source.index, 1);

      // Add source item to destinationIdx + 1
      queue.splice(res.destination.index, 0, res.draggableId);

      // Create new state with modified taskIds queue
      let newState: TodoTable = {
        ...items,
        columns: {
          [src_droppableId]: {
            ...items.columns[src_droppableId],
            taskIds: queue,
          },
        },
      };

      setItems(newState);
    }
  }

  return (
    <div>
      <Button onPress={logout} type="link">
        <p>Logout</p>
      </Button>
      <Columns item={items} onDragEnd={onDragEnd} />
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
