import { useAuth } from "components/Auth/provider";
import Button from "components/Button";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { StaticPageProps } from "Constants/Pages";
import { useState } from "react";

const data = {
  tasks: {
    "task-1": { id: "task-1", content: "" },
    "task-2": { id: "task-2", content: "" },
    "task-3": { id: "task-3", content: "" },
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

  return (
    <div>
      <Button onPress={logout} type="link">
        <p>Logout</p>
      </Button>
      <DragDropContext
        onDragEnd={(a) => {
          console.log(a.type);
        }}
      >
        <Droppable droppableId="test-1" type="drop">
          {(provided, snapshot) => (
            <div>
              {items.columnOrder.map((column) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <Draggable draggableId="test-1" index={0} key="aa-1">
                    {(a) => (
                      <div
                        {...a.draggableProps}
                        {...a.dragHandleProps}
                        ref={a.innerRef}
                      >
                        aaa1
                      </div>
                    )}
                  </Draggable>
                  <Draggable draggableId="test-2" index={1} key="aa-2">
                    {(a) => (
                      <div
                        {...a.draggableProps}
                        {...a.dragHandleProps}
                        ref={a.innerRef}
                      >
                        aaa2
                      </div>
                    )}
                  </Draggable>
                  {provided.placeholder}
                </div>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
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
