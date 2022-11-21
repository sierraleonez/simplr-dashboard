import Texts from "components/Text";
import { StaticPageProps } from "Constants/Pages";

import styles from "./register.module.css";
import { useCustomHook } from "./useCustomHook";
import { Form } from './form'
import TextInput from "components/TextInput";
function Register() {
  const { errors, handleSubmit, onSubmit, register } = useCustomHook()
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Texts>Register</Texts>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {Form(register, errors).map(inputProps => (
              <TextInput {...inputProps}/>
            ))}
            <input type={'submit'}/>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;

export async function getStaticProps(): Promise<StaticPageProps> {
  return {
    props: {
      flow: "auth",
    },
  };
}
