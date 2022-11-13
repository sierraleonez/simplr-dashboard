import { SubmitHandler, useForm } from "react-hook-form";
import { StaticPageProps } from "Constants/Pages";
import styles from "styles/login.module.css";
import "Constants/Auth/Auth";
import { useRouter } from "next/router";
import { CLogin } from "Microservice/Auth/auth";
type IFormInput = {
  email: string;
  password: string;
}

const Login = () => {
  const router = useRouter()
  const { register, handleSubmit } = useForm<IFormInput>();
  console.log('test')
  const onSubmit: SubmitHandler<IFormInput> = (data) => CLogin(data);
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <label htmlFor="username">Username</label>
          <input
            className={styles.input}
            {...register("email", {
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
          <a onClick={() => router.push('register')} className={styles.signUpContainer}>Sign Up</a>
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
