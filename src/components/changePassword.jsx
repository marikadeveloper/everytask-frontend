import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { useUpdatePassword } from "../utils/user.js";

function ChangePassword() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { handleSubmit, register, getValues } = useForm();
  const { mutate, isPending, isSuccess, error } = useUpdatePassword();

  /* 🤔 Alberto: 3.
    il pulsante di submit deve ricevere una prop isLoading con il valore di isPending
     */

  /* 🤔 Alberto: 4.
    se isSuccess è true, mostra un toast con scritto "Password changed successfully"
    */

  /* 🤔 Alberto: 5.
    se error è definito, vai a vedere nel file screens/login/index.jsx come è stato gestito l'errore e fai la stessa cosa
    HINT: usa <ErrorMessage ...
    mettilo infondo al body del modal
   */

  const modalOnSubmit = () => {
    const currentPassword = getValues("currentPassword");
    const newPassword = getValues("newPassword");
    const confirmPassword = getValues("confirmPassword");

    /* 🤔 Alberto: 2.
    chiama la funzione mutate(payload) passando un oggetto con le chiavi:
    - oldPassword (la password vecchia dell'utente)
    - password (la nuova password)
    - passwordConfirmation (la conferma della nuova password)
     */

    console.log("Current Password:", currentPassword);
    console.log("New Password:", newPassword);
    console.log("Confirm Password:", confirmPassword);
  };

  return (
    <>
      <Button
        className="profile__form__account-info__submit-change"
        type="button"
        variant={"bordered"}
        onPress={onOpen}
      >
        Change password
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="auto"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Change password</ModalHeader>
              <ModalBody>
                <Input
                  id="currentPassword"
                  type="password"
                  label="Current Password"
                  placeholder="Enter your current password"
                  {...register("currentPassword")}
                />
                <Input
                  id="newPassword"
                  type="password"
                  label="New Password"
                  placeholder="Enter your new password"
                  {...register("newPassword")}
                />
                <Input
                  id="confirmPassword"
                  type="password"
                  label="Confirm Password"
                  placeholder="Confirm your new password"
                  {...register("confirmPassword")}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="bordered"
                  size="md"
                  onPress={onClose}
                >
                  Close
                </Button>
                <Button
                  color="primary"
                  size="md"
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
