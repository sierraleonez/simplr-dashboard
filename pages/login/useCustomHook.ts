import { useAuth } from "components/Auth/provider";
import { CLogin } from "Microservice/Auth/auth";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { useModal } from "components/Modal/Global";

type IFormInput = {
  email: string;
  password: string;
};

function useCustomHook() {
  const router = useRouter();
  const authCtx = useAuth();
  const modalCtx = useModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  async function saveToken(data: IFormInput) {
    let res = await CLogin(data);
    let token = res?.data?.Token || "";
    if (!res?.error) {
      authCtx?.setAuthState(token);
    }
  }

  const onSubmit: SubmitHandler<IFormInput> = (data) => saveToken(data);
  const onInvalid = () =>
    modalCtx?.openModal("something is wrong...", "notification");
  return {
    onSubmit,
    register,
    handleSubmit,
    router,
    errors,
    onInvalid,
  };
}

export default useCustomHook;
