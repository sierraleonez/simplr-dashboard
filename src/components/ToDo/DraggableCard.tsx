import Button from "components/Button";
import { TaskType } from "Constants/Todo";
import { Draggable } from "react-beautiful-dnd";
import { MdDelete } from "react-icons/md";

type DraggableCardProps = {
  taskData: TaskType;
  idx: number;
  isDeleteable?: boolean;
  onDelete: (index: number) => void;
};

export default function DraggableCard({
  taskData,
  idx,
  isDeleteable = true,
  onDelete,
}: DraggableCardProps) {
  return (
    <Draggable draggableId={taskData.id} key={taskData.id} index={idx}>
      {(provided) => (
        <div
          style={{
            padding: "8px",
            border: "black solid 1px",
          }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div
            style={{
              padding: "8px",
              border: "black solid 1px",
              borderRadius: "8px",
              backgroundColor: "white",
              marginBottom: "8px",
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            {taskData.content}
            {isDeleteable && (
              <Button type="link" onPress={() => onDelete(idx)}>
                <MdDelete color="red"/>
              </Button>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
}
