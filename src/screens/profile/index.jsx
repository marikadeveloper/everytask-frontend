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
    <div className='layout profile'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <header>
          <h1>Profile</h1>
          <Button
            isLoading={isLoading}
            size='lg'
            type='submit'>
            Save
          </Button>
        </header>

        {/* Sezione di test */}
        <section>
          <h2>Bla bla bla</h2>
          {/* Input di test, ha come valore di default l'email dell'utente ma si può sovrascrivere */}
          <Input
            id='test'
            type='text'
            label='Test field'
            placeholder='This is a test field'
            defaultValue={user.email}
            {...register('test', { required: false, disabled: false })}
          />
        </section>
      </form>
    </div>
  );
}

export default ProfileScreen;
