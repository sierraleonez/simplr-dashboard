import { StaticPageProps } from "Constants/Pages";

import Button from "components/Button";
import styles from "styles/login.module.css";
import TextInput from "components/TextInput";
import useCustomHook from "./useCustomHook";
import { LoginForm } from './form'

const Login = () => {
  const { errors, handleSubmit, onSubmit, register, router } =
    useCustomHook();
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.form}
        >
          {
            LoginForm(register, errors).map(inputProps => (
              <TextInput {...inputProps}/>
            ))
          }
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
