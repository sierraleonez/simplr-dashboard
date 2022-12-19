import { TextInputForm } from "Constants/form";

export type ICreateTaskInput = {
  content: string
}

export const CreateTaskForm: TextInputForm<ICreateTaskInput> = (register, errors) => {
  return [
    {
      label: "Content",
      // containerclass: styles.inputContainer,
      error: errors.content,
      validation: register("content", {
        required: { value: true, message: "This input is required" },
      }),
      placeholder: "Please input content of task",
    },
  ];
};