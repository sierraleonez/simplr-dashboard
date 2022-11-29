import { TodoTable } from "Constants/Todo";
import { DragDropContext, DropResult, ResponderProvided } from "react-beautiful-dnd";
import Column from "./Column";

type ColumnsProps<T> = {
  onDragEnd: (result: DropResult, provided: ResponderProvided) => void;
  item: T;
};

export default function Columns({ onDragEnd, item }: ColumnsProps<TodoTable>) {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {item.columnOrder.map((columnId) => (
        <Column columnData={item.columns[columnId]} tasks={item.tasks} />
      ))}
    </DragDropContext>
  );
}