import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import {Button, ErrorMessage, FormGroup} from '../components/lib';
import { useAuth } from '../context/auth-context';
import { useAsync } from '../utils/hooks';

function LoginScreen() {
  const { login } = useAuth();
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const { error, isLoading, isError, run } = useAsync();

  const onSubmit = (data) => {
    run(login(data));
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type='text'
            {...register('email', { required: true })}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            {...register('password', { required: true })}
          />
        </FormGroup>
        <Link to='/forgot-password'>Forgot password</Link>
        {isError ? <ErrorMessage error={error} /> : null}
        <div>
          <Button isLoading={isLoading} type='submit'>Login</Button>
        </div>
      </form>
      <p>
        Not registered? <Link to='/register'>Sign up</Link>
      </p>
    </div>
  );
}

export { LoginScreen };
