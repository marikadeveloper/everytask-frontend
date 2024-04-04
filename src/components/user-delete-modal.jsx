import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { Button } from "./button";
import { useDeleteUser } from "../utils/user";
import { useAuth } from "../context/auth-context";

function UserDeleteModal() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { mutate, isPending } = useDeleteUser();

  const onConfirmDeletion = () => {
    mutate(undefined, {
      onSuccess: () => {
        navigate("/");
        logout();
        onClose();
      },
    });
  };

  return (
    <>
      <Button
        className="profile__form__danger-zone__submit-delete"
        type="button"
        color="danger"
        variant="bordered"
        onClick={onOpen}
      >
        Delete account
      </Button>
      <Modal
        disableAnimation
        isOpen={isOpen}
        onOpenChange={onClose}
        placement="auto"
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader>Delete User</ModalHeader>
              <ModalBody>
                Are you sure you want to delete your profile?
              </ModalBody>
              <ModalFooter>
                <Button variant="bordered" onPress={onClose}>
                  Discard
                </Button>
                <Button
                  color="danger"
                  isDisabled={isPending}
                  auto
                  onPress={onConfirmDeletion}
                >
                  Confirm deletion
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default UserDeleteModal;
