import Texts from "components/Text";
import { ColumnType, TodoTable } from "Constants/Todo";
import { Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DraggableCard";

type ColumnProps = {
  columnData: ColumnType;
  tasks: TodoTable["tasks"];
};

export default function Column({ columnData, tasks }: ColumnProps) {
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
