import { Select, SelectItem } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { useAuth } from '../../context/auth-context';
import { useAsync } from '../../utils/hooks';
import { dateFormats } from './data';
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
          className='profile-layout__form'
        >
          <header className='profile-layout__form__header'>
            <h1>Profile</h1>
            <Button
              isLoading={isLoading}
              className='profile-layout__form__header__submit-save'
              type='submit'
            >
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
              isDisabled
              id='email'
              type='email'
              label='Email'
              placeholder='Your email'
              defaultValue={user.email}
              {...register('email')}
            />
            <Button
              className='profile-layout__form__account-info__submit-change'
              type='button'
              variant={'bordered'}
            >
              Change password
            </Button>
          </section>

          <section className='profile-layout__form__customization'>
            <h2>Customization</h2>
            <Select
              items={dateFormats}
              label='Date Format'
              placeholder='Select a date format'
              defaultSelectedKeys={['DD/MM/YYYY']}
              className='input'
              variant={'bordered'}
              color='default'
            >
              {(dateFormat) => (
                <SelectItem key={dateFormat.value}>
                  {dateFormat.label}
                </SelectItem>
              )}
            </Select>
          </section>

          <section className='profile-layout__form__danger-zone'>
            <h2>Danger zone</h2>
            <Button
              className='profile-layout__form__danger-zone__submit-delete'
              type='button'
              color='danger'
              variant='bordered'
            >
              Delete account
            </Button>
          </section>
        </form>
      </div>
    </div>
  );
}

export default ProfileScreen;
