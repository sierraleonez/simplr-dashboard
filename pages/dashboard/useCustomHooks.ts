import { useAuth } from "components/Auth/provider";
import {
  DummyTodoData_multiColumn,
  TasksType,
  TodoTable,
} from "Constants/Todo";
import { useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import { ICreateTaskInput } from "./form";

type ActionModalType = "create" | "edit";
type EditModalProps = {
  columnId: string;
  taskId: string;
};
export function useCustomHook() {
  const auth = useAuth();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [titleValue, setTitleValue] = useState("");
  const [contentValue, setContentValue] = useState("");
  const [modalType, setModalType] = useState<ActionModalType>("create");
  const [items, setItems] = useState(DummyTodoData_multiColumn);
  const [ModalData, setModalData] = useState<EditModalProps>();
  const [atColumn, setAtColumn] = useState<string>("");

  function logout() {
    auth?.setAuthState("");
  }

  // Set which column target of created task
  function onCreateTaskInput(columnId: string) {
    setModalType("create");
    setIsModalOpen(true);
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
  const onCreateTaskSubmit: (data: ICreateTaskInput) => void = (data) => {
    const newTaskID = createId(items);
    const newTasks = items.tasks;
    const newColumn = items.columns[atColumn];
    // Append new task at tasks
    newTasks[newTaskID] = {
      id: newTaskID,
      content: data.content,
      title: data.title,
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

  function onEditItem() {
    const taskList = items.tasks;
    const currentTask = items.tasks[ModalData?.taskId || ""];
    const newTasks: TasksType = {
      ...taskList,
      [ModalData?.taskId || ""]: {
        ...currentTask,
        content: contentValue,
        title: titleValue,
      },
    };

    const newState: TodoTable = {
      ...items,
      tasks: newTasks,
    };

    setItems(newState);
  }

  // End of todo item manipulation function list

  // Modal relation function //////////////////////

  function openEditModal(columnId: string, index: number) {
    const taskId = items.columns[columnId].taskIds[index];
    const taskDetail = items.tasks[taskId];
  
    // Save task reference data for editInput submit
    setModalData({ columnId, taskId });

    setContentValue(taskDetail.content);
    setTitleValue(taskDetail.title);
    setModalType("edit");
    setIsModalOpen(true);
  }

  function onCloseModal() {
    // Set modal input value to empty before closing
    // This is required to avoid input value filled by latest opened modal
    setContentValue("");
    setTitleValue("");
  
    setIsModalOpen(false);
  }

  function onSubmitModal() {
    switch (modalType) {
      case "create":
        onCreateTaskSubmit({ content: contentValue, title: titleValue });
        break;
      case "edit":
        onEditItem();
        break;
    }
    onCloseModal();
  }

  // End of modal related function //////////////////

  return {
    items,
    logout,
    atColumn,
    onDragEnd,
    deleteItem,
    titleValue,
    isModalOpen,
    contentValue,
    onCloseModal,
    setTitleValue,
    openEditModal,
    onSubmitModal,
    setIsModalOpen,
    setContentValue,
    onCreateTaskInput,
    onCreateTaskSubmit,
  };
}

/**
 * Generate new unique ID by examining current data
 * MIGRATE TO NANOID ASAP
 * @param items
 * @returns new ID
 */
function createId(items: TodoTable): string {
  const listId = Object.keys(items.tasks);
  const lastTask = listId[listId.length - 1].split("-");
  let lastId = Number(lastTask[1]);
  let newId = "";
  lastId++;
  newId = `${lastTask[0]}-${lastId}`;
  return newId;
}
