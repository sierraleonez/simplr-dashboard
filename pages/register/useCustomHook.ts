import { useModal } from "components/Modal/Global";
import { CRegister } from "Microservice/Auth/auth";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { RegisterFormFields } from "./form";

export const useCustomHook = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormFields>();
  const modalCtx = useModal();
  const router = useRouter();

  const onSubmit: SubmitHandler<RegisterFormFields> = async (data) => {
    try {
      await CRegister(data);
      modalCtx?.openModal(
        "Account registered! Please login to your account",
        "notification"
      );
      redirectToLogin();
      // error block only able to detect any / never type,
      // so we cannot specify type of error here
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      modalCtx?.openModal(err.error.response.data.Message, "error");
    }
  };

  function redirectToLogin() {
    router.push("login");
  }

  return {
    onSubmit,
    handleSubmit,
    register,
    errors,
    redirectToLogin,
  };
};
