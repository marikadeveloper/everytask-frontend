import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, ErrorMessage, Input } from '../../components/lib';
import { useAuth } from '../../context/auth-context';
import { useAsync } from '../../utils/hooks';
import './styles.scss';

function RegisterScreen() {
  const { register: registerUser } = useAuth();
  const { register, handleSubmit } = useForm();
  const { error, isLoading, isError, run, isSuccess } = useAsync();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      toast('Registration successful, log in to continue');
      navigate('/');
    }
  }, [isSuccess, navigate]);

  const onSubmit = (data) => {
    run(registerUser(data));
  };

  return (
    <div className='register'>
      <h1>Register</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='register__form'
      >
        <Input
          label='Email'
          id='email'
          type='email'
          placeholder='Email'
          {...register('email', { required: true })}
        />

        <Input
          label='Password'
          id='password'
          type='password'
          placeholder='Password'
          {...register('password', { required: true })}
        />

        <Input
          id='passwordConfirmation'
          type='password'
          label='Password Confirmation'
          placeholder='Password Confirmation'
          {...register('passwordConfirmation', {
            required: true,
          })}
        />

        {isError ? <ErrorMessage error={error} /> : null}
        <div>
          <Button
            isLoading={isLoading}
            type='submit'
            size='lg'
            className='register__form__submit'
          >
            Register
          </Button>
        </div>
      </form>
      <p className='register__sign-in'>
        Already registered? <Link to='/'>Sign in</Link>
      </p>
    </div>
  );
}

export { RegisterScreen };
