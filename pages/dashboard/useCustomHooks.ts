import { useAuth } from "components/Auth/provider";
import { DummyTodoData_multiColumn, TodoTable } from "Constants/Todo";
import { useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import { SubmitHandler, useForm } from "react-hook-form";
import { ICreateTaskInput } from "./form";

export function useCustomHook() {
  const auth = useAuth();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const [items, setItems] = useState(DummyTodoData_multiColumn);
  const [atColumn, setAtColumn] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateTaskInput>();

  function logout() {
    auth?.setAuthState("");
  }

  // Set which column target of created task
  function onCreateTaskInput(columnId: string) {
    setIsModalOpen(true)
    setAtColumn(columnId);
  }

  // Todo item manipulation function list

  function onDragEnd(res: DropResult) {
    const src_droppableId = res.source.droppableId;
    const dest_droppableId = res.destination?.droppableId || "";
    // Create copy of task id queue and column object
    const src_taskList = items.columns[src_droppableId].taskIds;

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
      const newState: TodoTable = {
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
      const dest_taskList = items.columns[dest_droppableId].taskIds;

      // Remove source item from source task list
      src_taskList.splice(res.source.index, 1);

      // Add source item to destination column at destinationIdx + 1
      dest_taskList.splice(res.destination.index, 0, res.draggableId);

      const newState: TodoTable = {
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
    const taskList = items.columns[columnId].taskIds;

    taskList.splice(index, 1);

    const newState: TodoTable = {
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

  // On submit valid
  const onCreateTaskSubmit: SubmitHandler<ICreateTaskInput> = (data) => {
    const newTaskID = createId(items);
    const newTasks = items.tasks;
    const newColumn = items.columns[atColumn];
    // Append new task at tasks
    newTasks[newTaskID] = {
      id: newTaskID,
      content: data.content,
    };

    // Append new task id at task list of target column
    newColumn.taskIds.push(newTaskID);

    // Create new state with modified tasks and column
    const newState: TodoTable = {
      ...items,
      tasks: newTasks,
      columns: {
        ...items.columns,
        [atColumn]: newColumn,
      },
    };

    setItems(newState);
  };

  // End of todo item manipulation function list

  return {
    items,
    logout,
    errors,
    register,
    atColumn,
    onDragEnd,
    deleteItem,
    isModalOpen,
    handleSubmit,
    setIsModalOpen,
    onCreateTaskInput,
    onCreateTaskSubmit,
  };
}

function createId(items: TodoTable): string {
  const listId = Object.keys(items.tasks);
  const lastTask = listId[listId.length - 1].split("-");
  let lastId = Number(lastTask[1]);
  let newId = "";
  lastId++;
  newId = `${lastTask[0]}-${lastId}`;
  return newId;
}
