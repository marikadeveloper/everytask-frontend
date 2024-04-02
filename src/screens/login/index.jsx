import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import { useAsync } from "../../utils/hooks";
import "./styles.scss";
import { Input } from "../../components/input/index";
import { ErrorMessage } from "../../components/errors/index";
import { Button } from "../../components/button/index";

function LoginScreen() {
  const { login } = useAuth();
  const { register, handleSubmit } = useForm();
  // const {errors} = formState;

  const { error, isLoading, isError, run } = useAsync();

  const onSubmit = (data) => {
    run(login(data));
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <form
        id="login-form"
        onSubmit={handleSubmit(onSubmit)}
        className="login__form"
      >
        <Input
          id="email"
          type="email"
          label="Email"
          placeholder="Email"
          {...register("email", { required: true })}
        />
        <Input
          id="password"
          type="password"
          label="Password"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        <Link to="/forgot-password" className="login__form__forgot-password">
          Forgot password
        </Link>
        {isError ? <ErrorMessage error={error} /> : null}
        <div>
          <Button
            isLoading={isLoading}
            type="submit"
            size="lg"
            className="login__form__submit"
            form="login-form"
          >
            Login
          </Button>
        </div>
      </form>
      <p className="login__sign-up">
        Not registered? <Link to="/register">Sign up</Link>
      </p>
    </div>
  );
}

export default LoginScreen;
