import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";

import { CLogin } from "Microservice/Auth/auth";
import { StaticPageProps } from "Constants/Pages";
import { useAuth } from "components/Auth/provider";

import Button from "components/Button";
import styles from "styles/login.module.css";
import TextInput from "components/TextInput";

type IFormInput = {
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  const authCtx = useAuth();
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
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <TextInput
            label="Username"
            isError={!!errors.password}
            validation={register("email", {
              required: { value: true, message: "This input is required" },
            })}
            className={styles.input}
            placeholder={
              errors.email ? errors.email.message : "Please input username"
            }
          />
          <TextInput
            label="Password"
            isError={!!errors.password}
            className={styles.input}
            type={"password"}
            validation={register("password", {
              required: { value: true, message: "This input is required" },
              minLength: { value: 8, message: "Minimum length is 8" },
            })}
            placeholder={
              errors.password
                ? errors.password.message
                : "Please input password"
            }
          />
          <Button
            type="link"
            onPress={() => router.push("/register")}
            className={styles.signUpContainer}
          >
            Sign Up
          </Button>
          <input type={"submit"} className={styles.submitButton} />
        </form>
      </div>
    </div>
  );
};

export default Login;

export async function getStaticProps(): Promise<StaticPageProps> {
  return {
    props: {
      flow: "auth",
    },
  };
}
