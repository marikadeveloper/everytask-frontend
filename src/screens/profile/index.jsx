import { Select, SelectItem } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/button';
import { ChangePassword } from '../../components/change-password';
import { Input } from '../../components/input';
import { useAuth } from '../../context/auth-context';
import { dateFormats } from '../../utils/constants';
import { useAsync } from '../../utils/hooks';
import { useUpdateUser } from '../../utils/user.js';
import './styles.scss';

function ProfileScreen() {
  const { user } = useAuth();
  const { isLoading } = useAsync();
  const { handleSubmit, register, getValues } = useForm();
  const { mutate } = useUpdateUser();

  const onSubmit = (data) => {
    mutate(data);
  }

  return (
    <div className='layout profile'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='profile__form'
      >
        <header className='profile__form__header'>
          <h1>Profile</h1>
          <Button
            isLoading={isLoading}
            className='profile__form__header__submit-save'
            type='submit'
          >
            Save
          </Button>
        </header>
        <section className='profile__form__account-info'>
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
          <ChangePassword />
        </section>
        <section className='profile__form__customization'>
          <h2>Customization</h2>
          <Select
            items={dateFormats}
            label='Date Format'
            placeholder='Select a date format'
            defaultSelectedKeys={['DD/MM/YYYY']}
            className='input'
            variant={'bordered'}
            color='default'
            {...register('dateFormat')}
          >
            {(dateFormat) => (
              <SelectItem key={dateFormat.value}>{dateFormat.label}</SelectItem>
            )}
          </Select>
        </section>
        <section className='profile__form__danger-zone'>
          <h2>Danger zone</h2>
          <Button
            className='profile__form__danger-zone__submit-delete'
            type='button'
            color='danger'
            variant='bordered'
          >
            Delete account
          </Button>
        </section>
      </form>
    </div>
  );
}

export default ProfileScreen;
