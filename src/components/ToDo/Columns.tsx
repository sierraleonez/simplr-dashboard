import { TodoTable } from "Constants/Todo";
import {
  DragDropContext,
  DropResult,
  ResponderProvided,
} from "react-beautiful-dnd";
import Column from "./Column";

type ColumnsProps<T> = {
  onDragEnd: (result: DropResult, provided: ResponderProvided) => void;
  item: T;
  onDelete: (columnId: string, index: number) => void;
};

export default function Columns({
  onDragEnd,
  item,
  onDelete,
}: ColumnsProps<TodoTable>) {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: "flex" }}>
        {item.columnOrder.map((columnId) => (
          <Column
            columnData={item.columns[columnId]}
            tasks={item.tasks}
            onDelete={onDelete}
          />
        ))}
      </div>
    </DragDropContext>
  );
}
