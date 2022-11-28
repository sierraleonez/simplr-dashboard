import { useAuth } from "components/Auth/provider";
import Button from "components/Button";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { StaticPageProps } from "Constants/Pages";
import React, { useState } from "react";
import Texts from "components/Text";
type task = {
  id: string;
  content: string;
};

type column = {
  id: string;
  title: string;
  taskIds: Array<string>;
};

type todoType = {
  tasks: {
    [key: string]: task;
  };
  columns: {
    [key: string]: column;
  };
  columnOrder: Array<string>;
};

const data: todoType = {
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

function Dashboard() {
  const auth = useAuth();
  const [items, setItems] = useState(data);

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
      let newState: todoType = {
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
      <DragDropContext onDragEnd={onDragEnd}>
        {items.columnOrder.map((column) => (
          <Column columnData={items.columns[column]} tasks={items.tasks} />
          // <Droppable
          // droppableId={items.columns[column].id}
          // type="drop"
          // key={items.columns[column].id}
          // >
          //   {(provided, snapshot) => (
          //     <div
          //     style={{
          //       backgroundColor: snapshot.isDraggingOver ? "green" : "red",
          //       transition: "background-color 0.1s ease",
          //     }}
          //     {...provided.droppableProps}
          //     ref={provided.innerRef}
          //     key={items.columns[column].title}
          //     >

          //       <Texts>{items.columns[column].title}</Texts>
          //       {items.columns[column].taskIds.map((taskId, idx) => (
          //         <Draggable
          //           draggableId={items.tasks[taskId].id}
          //           index={idx}
          //           key={items.tasks[taskId].id}
          //         >
          //           {(a) => (
          //             <div
          //               key={items.tasks[taskId].id}
          //               {...a.draggableProps}
          //               {...a.dragHandleProps}
          //               ref={a.innerRef}
          //             >
          //               {items.tasks[taskId].content}
          //             </div>
          //           )}
          //         </Draggable>
          //       ))}
          //       {provided.placeholder}
          //     </div>
          //   )}
          // </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
}

type ColumnProps = {
  columnData: column;
  tasks: todoType["tasks"];
};

function Column({ columnData, tasks }: ColumnProps) {
  return (
    <Droppable droppableId={columnData.id} key={columnData.id}>
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          key={columnData.id}
        >
          <Texts>{columnData.title}</Texts>
          {columnData.taskIds.map((taskId, idx) => (
            <DraggableCard idx={idx} taskData={tasks[taskId]} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

type DraggableCardProps = {
  taskData: task;
  idx: number;
};

function DraggableCard({ taskData, idx }: DraggableCardProps) {
  return (
    <Draggable draggableId={taskData.id} key={taskData.id} index={idx}>
      {(provided, snapshot) => (
        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          {taskData.content}
        </div>
      )}
    </Draggable>
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
