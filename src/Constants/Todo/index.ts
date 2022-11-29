/**
 * Todo data type
 */

export type TaskType = {
  id: string;
  content: string;
};

/**
 * - title will be shown as column label
 * - taskIds contain array of ID from task,
 *   it used to maintain the order of our task list
 */
export type ColumnType = {
  id: string;
  title: string;
  taskIds: Array<string>;
};

export type TodoTable = {
  tasks: {
    [key: string]: TaskType;
  };
  columns: {
    [key: string]: ColumnType;
  };
  columnOrder: Array<string>;
};

// Example + Dummy
export const DummyTodoData: TodoTable = {
  tasks: {
    "task-1": { id: "task-1", content: "hi this is task 1" },
    "task-2": { id: "task-2", content: "hi this is task 2" },
    "task-3": { id: "task-3", content: "hi this is task 3" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To-Do",
      taskIds: ["task-1", "task-2", "task-3"],
    },
  },
  columnOrder: ["column-1"],
};
