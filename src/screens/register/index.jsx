import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/button/index";
import { ErrorMessage } from "../../components/errors/index";
import { Input } from "../../components/input";
import { useAuth } from "../../context/auth-context";
import { useAsync } from "../../utils/hooks";
import "./styles.scss";

function RegisterScreen() {
  const { register: registerUser } = useAuth();
  const { register, handleSubmit } = useForm();
  const { error, isLoading, isError, run, isSuccess } = useAsync();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      toast("Registration successful, log in to continue");
      navigate("/");
    }
  }, [isSuccess, navigate]);

  const onSubmit = (data) => {
    run(registerUser(data));
  };

  return (
    <div className="register">
      <h1>Register</h1>
      <form
        id="register-form"
        onSubmit={handleSubmit(onSubmit)}
        className="register__form"
      >
        <Input
          label="Email"
          id="email"
          type="email"
          placeholder="The email that will be used for log in"
          {...register("email", { required: true })}
        />

        <Input
          label="Name"
          id="name"
          type="text"
          placeholder="The name you want to use"
          {...register("name")}
        />

        <Input
          label="Password"
          id="password"
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />

        <Input
          id="passwordConfirmation"
          type="password"
          label="Password Confirmation"
          placeholder="Password Confirmation"
          {...register("passwordConfirmation", {
            required: true,
          })}
        />

        {isError ? <ErrorMessage error={error} /> : null}
        <div>
          <Button
            isLoading={isLoading}
            type="submit"
            size="lg"
            className="register__form__submit"
            form="register-form"
          >
            Register
          </Button>
        </div>
      </form>
      <p className="register__sign-in">
        Already registered? <Link to="/">Sign in</Link>
      </p>
    </div>
  );
}

export default RegisterScreen;
