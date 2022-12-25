import { TextInputForm } from "Constants/form";

export type ICreateTaskInput = {
  title: string;
  content: string;
};

export const CreateTaskForm: TextInputForm<ICreateTaskInput> = (
  register,
  errors
) => {
  return [
    {
      error: errors.title,
      validation: register("title", {
        required: { value: true, message: "This input is required" },
      }),
    },
    {
      error: errors.content,
      validation: register("content", {
        required: false
      }),
    },
  ];
};
