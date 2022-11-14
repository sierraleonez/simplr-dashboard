import { SubmitHandler, useForm } from "react-hook-form";
import { StaticPageProps } from "Constants/Pages";
import styles from "styles/login.module.css";
import "Constants/Auth/Auth";
import { useRouter } from "next/router";
import { CLogin } from "Microservice/Auth/auth";
import { useAuth } from "components/Auth/provider";
type IFormInput = {
  email: string;
  password: string;
}

const Login = () => {
  const router = useRouter()
  const authCtx = useAuth()
  const { register, handleSubmit } = useForm<IFormInput>();
  async function saveToken(data: IFormInput) {
    let res = await CLogin(data)
    console.log(res.data)
    let token = res.data || ''
    if (!res.error) {
      authCtx?.setAuthState(token)
    }
  }
  const onSubmit: SubmitHandler<IFormInput> = (data) => saveToken(data);
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
