import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth-context";
import { useAsync } from "../../utils/hooks";
import "./styles.scss";
import { Input } from "../../components/input";
import { ErrorMessage } from "../../components/errors/index";
import { Button } from "../../components/button/index";

function ResetPasswordScreen() {
  const { resetPassword } = useAuth();
  const { register, handleSubmit } = useForm();
  const { data, error, isLoading, isError, run } = useAsync();
  const [token, setToken] = useState(null);
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    setToken(params.get("token"));
  }, [params]);

  useEffect(() => {
    if (data && data.ok) {
      toast("Password reset successfully");
      navigate("/");
    }
  }, [data, navigate]);

  const onSubmit = (formData) => {
    run(resetPassword({ ...formData, token }));
  };

  return (
    <div className="reset-password">
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="reset-password__form">
        <Input
          label="Password"
          id="password"
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />

        <Input
          label="Password Confirmation"
          id="passwordConfirmation"
          type="password"
          placeholder="Password Confirmation"
          {...register("passwordConfirmation", { required: true })}
        />
        {isError ? <ErrorMessage error={error} /> : null}
        <div>
          <Button
            type="submit"
            isLoading={isLoading}
            className="reset-password__form__submit"
          >
            Reset Password
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ResetPasswordScreen;
