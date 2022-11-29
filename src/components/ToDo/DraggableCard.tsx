import { TaskType } from "Constants/Todo";
import { Draggable } from "react-beautiful-dnd";

type DraggableCardProps = {
  taskData: TaskType;
  idx: number;
};

export default function DraggableCard({ taskData, idx }: DraggableCardProps) {
  return (
    <Draggable draggableId={taskData.id} key={taskData.id} index={idx}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {taskData.content}
        </div>
      )}
    </Draggable>
  );
}