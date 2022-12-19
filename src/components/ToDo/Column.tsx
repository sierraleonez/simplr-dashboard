import Button from "components/Button";
import Texts from "components/Text";
import { ColumnType, TodoTable } from "Constants/Todo";
import { Droppable } from "react-beautiful-dnd";
import { MdPostAdd } from "react-icons/md";
import DraggableCard from "./DraggableCard";

type ColumnProps = {
  columnData: ColumnType;
  tasks: TodoTable["tasks"];
  onDelete: (columnId: string, index: number) => void;
  onCreateTaskInput: (columnId: string) => void;
};

export default function Column({
  columnData,
  tasks,
  onDelete,
  onCreateTaskInput,
}: ColumnProps) {
  return (
    <Droppable droppableId={columnData.id} key={columnData.id}>
      {(provided) => (
        <div
          style={{
            padding: "16px",
            border: "black solid 1px",
            borderRadius: "8px",
            width: "220px",
            minHeight: "200px",
            display: "flex",
            flexDirection: "column",
            margin: "16px",
          }}
          {...provided.droppableProps}
          ref={provided.innerRef}
          key={columnData.id}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Texts style={{ marginBottom: "12px" }}>{columnData.title} ({columnData.taskIds.length} items)</Texts>
            <Button
              type="link"
              onPress={() => onCreateTaskInput(columnData.id)}
            >
              <MdPostAdd />
            </Button>
          </div>
          <div style={{ flexGrow: 1 }}>
            {columnData.taskIds.map((taskId, idx) => (
              <DraggableCard
                key={taskId}
                idx={idx}
                taskData={tasks[taskId]}
                onDelete={(index) => onDelete(columnData.id, index)}
              />
            ))}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
