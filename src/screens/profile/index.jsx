import { useForm } from 'react-hook-form';
import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { useAuth } from '../../context/auth-context';
import { useAsync } from '../../utils/hooks';
import './styles.scss';

function ProfileScreen() {
  const { user } = useAuth();
  const { error, isLoading, isError, run } = useAsync();
  const { test, handleSubmit, register } = useForm();
  {
    /* 
    🤔 Alberto: 2.
      - https://nextui.org/docs/components/input cerca qui come fare un campo input non modificabile
      - https://nextui.org/docs/components/button#colors cerca qui come fare un bottone rosso ("danger")
    */
  }

  const onSubmit = (data) => {
    // lascia pure questa funzione così
    console.log(data);
  };

  return (
    <div className='layout'>
      <div className='profile-layout'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='profile-layout__form'>
          <header className='profile-layout__form__header'>
            <h1>Profile</h1>
            <Button
              isLoading={isLoading}
              className='profile-layout__form__header__submit'
              type='submit'>
              Save
            </Button>
          </header>

          <section className='profile-layout__form__account-info'>
            <h2>Account information</h2>
            <Input
              id='name'
              type='text'
              label='Name'
              placeholder='Your name'
              defaultValue={user.name}
              {...register('name')}
            />
            <Input
              id='email'
              type='email'
              label='Email'
              placeholder='Your email'
              defaultValue={user.email}
              {...register('email')}
              disabled
            />
            {/* il bordo puyò essere fatto con la prop variant='bordered' del pulsante */}
            <Button
              className='profile-layout__form__account-info__submit-change'
              type='button'>
              Change password
            </Button>
          </section>

          <section className='profile-layout__form__customization'>
            <h2>Customization</h2>
            <Input
              id='dateFormat'
              type='text'
              label='Date format'
              placeholder='DD/MM/YYYY'
              defaultValue={user.dateFormat}
              {...register('dateFormat')}
            />
          </section>

          <section className='profile-layout__form__danger-zone'>
            <h2>Danger zone</h2>
            {/* il bordo ed il colore puyò essere fatto con la prop variant='bordered' e color="danger" del pulsante */}
            <Button
              className='profile-layout__form__danger-zone__submit-delete'
              type='button'>
              Delete account
            </Button>
          </section>
        </form>
      </div>
    </div>
  );
}

export default ProfileScreen;
