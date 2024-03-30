import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useUpdatePassword } from "../../utils/user";
import { Button } from "../button/index";
import { ErrorMessage } from "../errors/index";
import { Input } from "../input";
import "./styles.scss";

function ChangePassword() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { formState, handleSubmit, register, getValues } = useForm();
  const { mutate, isPending, isSuccess, error, isError } = useUpdatePassword();

  useEffect(() => {
    if (isSuccess) {
      toast("Password changed successfully");
      onClose();
    }
  }, [isSuccess, onClose]);

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <>
      <Button
        className="change-password__submit-change"
        type="button"
        variant="bordered"
        onPress={onOpen}
      >
        Change password
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="auto">
        <ModalContent>
          {() => (
            <>
              <ModalHeader>Change password</ModalHeader>
              <ModalBody>
                <form
                  className="change-password__form"
                  id="change-password-form"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Input
                    id="oldPassword"
                    type="password"
                    label="Current Password"
                    placeholder="Enter your current password"
                    isInvalid={formState.errors?.oldPassword}
                    errorMessage={formState.errors?.oldPassword?.message}
                    {...register("oldPassword", {
                      required: "Please enter your current password",
                    })}
                  />
                  <Input
                    id="password"
                    type="password"
                    label="New Password"
                    placeholder="Enter your new password"
                    isInvalid={formState.errors?.password}
                    errorMessage={formState.errors?.password?.message}
                    {...register("password", {
                      required: "Please enter your new password",
                    })}
                  />
                  <Input
                    id="passwordConfirmation"
                    type="password"
                    label="Confirm Password"
                    placeholder="Confirm your new password"
                    isInvalid={formState.errors?.passwordConfirmation}
                    errorMessage={
                      formState.errors?.passwordConfirmation?.message
                    }
                    {...register("passwordConfirmation", {
                      required: "Please confirm your new password",
                      validate: (value) =>
                        value === getValues("password") ||
                        "Passwords do not match",
                    })}
                  />
                </form>
                {isError ? <ErrorMessage error={error} /> : null}
              </ModalBody>
              <ModalFooter>
                <Button variant="bordered" size="md" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  size="md"
                  isLoading={isPending}
                  type="submit"
                  form="change-password-form"
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

export default ChangePassword;
