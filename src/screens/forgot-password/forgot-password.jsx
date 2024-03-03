import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, ErrorMessage, Input } from '../../components/lib';
import { useAuth } from '../../context/auth-context';
import { useAsync } from '../../utils/hooks';
import './styles.scss';

function ForgotPasswordScreen() {
  const { resetPasswordRequest } = useAuth();
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const { data, error, isLoading, isError, isSuccess, run } = useAsync();

  useEffect(() => {
    console.log(data); // {ok: true}
  }, [data]);

  useEffect(() => {
    console.log(error); // {message: 'Unauthorized'}
  }, [error]);

  useEffect(() => {
    console.log('form errors', errors);
  }, [errors]);

  function onSubmit(data) {
    run(resetPasswordRequest(data));
  }

  return (
    <div className='forgot-password'>
      <h1>Forgot Password</h1>
      {isSuccess ? (
        <div className='forgot-password__success-message'>
          Password reset instructions sent to your email
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='forgot-password__form'
        >
          <Input
            label='Email'
            id='email'
            type='email'
            {...register('email', {
              required: 'Required',
            })}
          />
          <div>
            <Button
              type='submit'
              isLoading={isLoading}
              className='forgot-password__form__submit'
            >
              Submit
            </Button>
          </div>
          {isError ? <ErrorMessage error={error} /> : null}
        </form>
      )}
    </div>
  );
}

export { ForgotPasswordScreen };
