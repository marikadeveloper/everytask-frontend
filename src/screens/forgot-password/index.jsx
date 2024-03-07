import { useForm } from 'react-hook-form';
import { Button, LinkButton } from '../../components/button/index.jsx';
import { ErrorMessage } from '../../components/errors/index.jsx';
import { Input } from '../../components/input.jsx';
import { useAuth } from '../../context/auth-context.jsx';
import { useAsync } from '../../utils/hooks.js';
import './styles.scss';

function ForgotPasswordScreen() {
  const { resetPasswordRequest } = useAuth();
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const { data, error, isLoading, isError, isSuccess, run } = useAsync();

  function onSubmit(data) {
    run(resetPasswordRequest(data));
  }

  return (
    <div className='forgot-password'>
      <div className='forgot-password__back'>
        <LinkButton to='/'>Back to login</LinkButton>
      </div>
      <h1>Forgot Password</h1>
      {isSuccess ? (
        <div className='forgot-password__success-message'>
          Password reset instructions sent to your email
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='forgot-password__form'>
          <Input
            label='Email'
            id='email'
            type='email'
            placeholder='Email'
            {...register('email', {
              required: 'Required',
            })}
          />
          <div>
            <Button
              type='submit'
              isLoading={isLoading}
              className='forgot-password__form__submit'>
              Submit
            </Button>
          </div>
          {isError ? <ErrorMessage error={error} /> : null}
        </form>
      )}
    </div>
  );
}

export default ForgotPasswordScreen;
