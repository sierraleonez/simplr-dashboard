import Texts from "components/Text";
import { StaticPageProps } from "Constants/Pages";

import styles from "./register.module.css";
import { useCustomHook } from "./useCustomHook";
import { Form } from './form'
import TextInput from "components/TextInput";
import Button from "components/Button";
function Register() {
  const { errors, handleSubmit, onSubmit, register, redirectToLogin } = useCustomHook()
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Texts>Register</Texts>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {Form(register, errors).map(inputProps => (
              <TextInput {...inputProps} key={inputProps.label}/>
            ))}
            <input type={'submit'}/>
          </form>
          <Button onPress={redirectToLogin} type={'link'}>Login</Button>
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
