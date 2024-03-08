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
    - dai un'occhiata a figma per capire come deve essere il layout di questa schermata
    - devi creare:
      - un h2 "Account information"
      - un form con:
        - un campo input per il nome
        - un campo input per la email (quest'ultimo non modificabile)
          - https://nextui.org/docs/components/input cerca qui come fare un campo input non modificabile
        - un pulsante per il cambio password (intanto predisponi il pulsante, non deve fare nulla per ora)
      - un h2 "Customization"
      - un form con:
        - un campo input per il dateFormat
      - un h2 "Danger zone"
        - un bottone rosso con scritto "Delete account" (intanto predisponi il pulsante, non deve fare nulla per ora)
          - https://nextui.org/docs/components/button#colors cerca qui come fare un bottone rosso ("danger")
     
    - per ogni campo input, usa il componente Input
    - per ogni pulsante, usa il componente Button
    - ricordati di registrare i campi input con register(...)
    - se premi invio scrivendo qualcosa in un campo di input, vedrai il risultato del console.log della funzione onSubmit 
  
    - fai gli stili in src/screens/profile/styles.scss

    - quando hai finito tutto ciò, scrivimi che ti faccio collegare il form con le API
    */
  }

  const onSubmit = (data) => {
    // lascia pure questa funzione così
    console.log(data);
  };

  return (
    <div className='profile-layout'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='profile-layout__form'
      >
        <header className='profile-layout__form__header'>
          <h1>Profile</h1>
          <Button
            isLoading={isLoading}
            className='profile-layout__form__header__submit'
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
            id='email'
            type='email'
            label='Email'
            placeholder='Your email'
            defaultValue={user.email}
            {...register('email')}
            disabled
          />
          <Button
            className='profile-layout__form__account-info__submit-change'
            type='button'
          >
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
          <Button
            className='profile-layout__form__danger-zone__submit-delete'
            type='button'
          >
            Delete account
          </Button>
        </section>
      </form>
    </div>
  );
}

export default ProfileScreen;
