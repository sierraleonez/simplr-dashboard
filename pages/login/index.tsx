import { StaticPageProps } from "../../src/Constants/Pages";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "styles/login.module.css";
import "Constants/Auth/Auth";
interface IFormInput {
  username: string;
  password: string;
}
const Login = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <label htmlFor="username">Username</label>
          <input
            className={styles.input}
            {...register("username", {
              required: { value: true, message: "This input is required" },
            })}
          />
          <label htmlFor="password">Password</label>
          <input
            className={styles.input}
            type={'password'}
            {...register("password", {
              required: { value: true, message: "This input is required" },
            })}
          />
          <input type={"submit"} className={styles.submitButton}/>
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
