/**
 * Todo data type
 */

export type TaskType = {
  id: string;
  content: string;
  title: string;
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

export type TasksType = {
  [key: string]: TaskType
}

export type TodoTable = {
  tasks: TasksType;
  columns: {
    [key: string]: ColumnType;
  };
  columnOrder: Array<string>;
};

// Example + Dummy
export const DummyTodoData: TodoTable = {
  tasks: {
    "task-1": { id: "task-1", content: "hi this is task 1", title: "" },
    "task-2": { id: "task-2", content: "hi this is task 2", title: "" },
    "task-3": { id: "task-3", content: "hi this is task 3", title: "" },
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

// tasks have to be sorted by ID desc
export const DummyTodoData_multiColumn: TodoTable = {
  tasks: {
    "task-1": { id: "task-1", content: "hi this is task 1", title: "" },
    "task-2": { id: "task-2", content: "hi this is task 2", title: "" },
    "task-3": { id: "task-3", content: "hi this is task 3", title: "" },
    "task-4": { id: "task-4", content: "hi this is task 4", title: "" },
    "task-5": { id: "task-5", content: "hi this is task 5", title: "" },
    "task-6": { id: "task-6", content: "hi this is task 6", title: "" },
    "task-7": { id: "task-7", content: "hi this is task 7", title: "" },
    "task-8": { id: "task-8", content: "hi this is task 8", title: "" },
    "task-9": { id: "task-9", content: "hi this is task 9", title: "" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To-Do 1",
      taskIds: ["task-1", "task-2", "task-3", "task-4", "task-5"],
    },
    "column-2": {
      id: "column-2",
      title: "To-Do 2",
      taskIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "To-Do 3",
      taskIds: [],
    },
  },
  columnOrder: ["column-1", "column-2", "column-3"],
}
