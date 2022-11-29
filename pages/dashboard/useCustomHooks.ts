import { useAuth } from "components/Auth/provider";
import { DummyTodoData_multiColumn, TodoTable } from "Constants/Todo";
import { useState } from "react";
import { DropResult } from "react-beautiful-dnd";

export function useCustomHook() {
  const auth = useAuth();
  const [items, setItems] = useState(DummyTodoData_multiColumn);

  function logout() {
    auth?.setAuthState("");
  }

  // Todo item manipulation function list

  function onDragEnd(res: DropResult) {
    console.log(res.destination)
    let src_droppableId = res.source.droppableId;
    let dest_droppableId = res.destination?.droppableId || "";
    // Create copy of task id queue and column object
    let src_taskList = items.columns[src_droppableId].taskIds;

    // If no droppable handles user drop
    if (!res.destination) {
      return;
    }

    // If user drop the item at the same table
    if (src_droppableId === dest_droppableId) {
      // Remove source item from src_taskList
      src_taskList.splice(res.source.index, 1);

      // Add source item to destinationIdx + 1
      src_taskList.splice(res.destination.index, 0, res.draggableId);

      // Create new state with modified taskIds src_taskList
      let newState: TodoTable = {
        ...items,
        columns: {
          ...items["columns"],
          [src_droppableId]: {
            ...items.columns[src_droppableId],
            taskIds: src_taskList,
          },
        },
      };

      setItems(newState);
    } else {
      let dest_taskList = items.columns[dest_droppableId].taskIds;

      // Remove source item from source task list
      src_taskList.splice(res.source.index, 1);

      // Add source item to destination column at destinationIdx + 1
      dest_taskList.splice(res.destination.index, 0, res.draggableId);

      let newState: TodoTable = {
        ...items,
        columns: {
          ...items["columns"],
          [src_droppableId]: {
            ...items.columns[src_droppableId],
            taskIds: src_taskList,
          },
          [dest_droppableId]: {
            ...items.columns[dest_droppableId],
            taskIds: dest_taskList,
          },
        },
      };

      setItems(newState);
    }
  }

  function deleteItem(columnId: string, index: number) {
    let taskList = items.columns[columnId].taskIds;

    taskList.splice(index, 1);

    let newState: TodoTable = {
      ...items,
      columns: {
        ...items.columns,
        [columnId]: {
          ...items.columns[columnId],
          taskIds: taskList,
        },
      },
    };

    setItems(newState);
  }

  // End of todo item manipulation function list

  return {
    items,
    logout,
    onDragEnd,
    deleteItem
  };
}