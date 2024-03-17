import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useUpdatePassword } from '../utils/user.js';
import { Button } from './button/index.jsx';
import { ErrorMessage } from './errors/index.jsx';
import { Input } from './input.jsx';

function ChangePassword() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { handleSubmit, register, getValues } = useForm();
  const { mutate, isPending, isSuccess, error, isError } = useUpdatePassword();

  /* 🤔 Alberto: 3.
    il pulsante di submit deve ricevere una prop isLoading con il valore di isPending
    OK, fatto
     */

  /* 🤔 Alberto: 4.
    se isSuccess è true, mostra un toast con scritto "Password changed successfully"
    useeffect
    */

  const modalOnSubmit = () => {
    const currentPassword = getValues('currentPassword');
    const newPassword = getValues('newPassword');
    const confirmPassword = getValues('confirmPassword');

    /* 🤔 Alberto: 2.
    chiama la funzione mutate(payload) passando un oggetto con le chiavi:
    - oldPassword (la password vecchia dell'utente)
    - password (la nuova password)
    - passwordConfirmation (la conferma della nuova password)
    OK, fatto 
    */
    const payload = {
      oldPassword: currentPassword,
      password: newPassword,
      passwordConfirmation: confirmPassword,
    };

    mutate(payload);

    // 🤔 Alberto: 4.
    if (isSuccess) {
      //  if (testSuccess) {
      toast.success('Password changed successfully');
    }

    console.log('Current Password:', currentPassword);
    console.log('New Password:', newPassword);
    console.log('Confirm Password:', confirmPassword);
  };

  // const testSuccess = true; // test

  return (
    <>
      <Button
        className='profile__form__account-info__submit-change'
        /* Marika: se tolgo la classe perdo lo stile width:fit-content nel
          file styles.scss della cartella profile      
        */
        type='button'
        variant={'bordered'}
        onPress={onOpen}
      >
        Change password
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement='auto'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Change password</ModalHeader>
              <ModalBody>
                <Input
                  id='currentPassword'
                  type='password'
                  label='Current Password'
                  placeholder='Enter your current password'
                  {...register('currentPassword')}
                />
                <Input
                  id='newPassword'
                  type='password'
                  label='New Password'
                  placeholder='Enter your new password'
                  {...register('newPassword')}
                />
                <Input
                  id='confirmPassword'
                  type='password'
                  label='Confirm Password'
                  placeholder='Confirm your new password'
                  {...register('confirmPassword')}
                />
                {isError ? <ErrorMessage error={error} /> : null}
              </ModalBody>
              <ModalFooter>
                <Button
                  variant='bordered'
                  size='md'
                  onPress={onClose}
                >
                  Close
                </Button>
                <Button
                  color='primary'
                  size='md'
                  onPress={modalOnSubmit}
                  isLoading={isPending}
                >
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export { ChangePassword };
