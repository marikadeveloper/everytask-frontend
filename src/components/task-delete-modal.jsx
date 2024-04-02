import PropTypes from "prop-types";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { Button } from "./button";
import { useDeleteTask } from "../utils/task";

function TaskDeleteModal({ taskId, onTaskDeleted }) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { mutate, isPending } = useDeleteTask(taskId);

  const onConfirmDeletion = () => {
    mutate(taskId, {
      onSuccess: () => {
        onTaskDeleted();
        onClose();
      },
    });
  };

  return (
    <>
      <Button color="danger" onClick={onOpen}>Delete task</Button>
      <Modal isOpen={isOpen} onOpenChange={onClose} placement="auto">
        <ModalContent>
          {() => (
            <>
              <ModalHeader>Delete Task</ModalHeader>
              <ModalBody>Are you sure you want to delete the task?</ModalBody>
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

TaskDeleteModal.propTypes = {
  onTaskDeleted: PropTypes.func.isRequired,
  taskId: PropTypes.string.isRequired,
};

export default TaskDeleteModal;
