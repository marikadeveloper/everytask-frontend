import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { Button } from '../components/button';
import { Input } from '../components/input';

function ChangePassword() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { handleSubmit, register, getValues } = useForm();

  const modalOnSubmit = () => {
    const currentPassword = getValues('currentPassword');
    const newPassword = getValues('newPassword');
    const confirmPassword = getValues('confirmPassword');

    console.log('Current Password:', currentPassword);
    console.log('New Password:', newPassword);
    console.log('Confirm Password:', confirmPassword);
  };

  return (
    <>
      <Button
        className='profile__form__account-info__submit-change'
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
