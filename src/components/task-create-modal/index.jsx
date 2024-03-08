import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import EmojiPicker from "emoji-picker-react";
import { useForm } from "react-hook-form";
import { Button } from "../button";
import { Input } from "../input";

function TaskCreateModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { register } = useForm();

  return (
    <>
      <Button onClick={onOpen}>New Task</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="auto">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>New Task</ModalHeader>
              <ModalBody>
                <EmojiPicker />
                <Input
                  autoFocus
                  id="title"
                  label="Title"
                  placeholder="Enter the task title"
                  {...register("title", { required: true })}
                />
              </ModalBody>
              <ModalFooter>
                <Button variant="bordered" size="md" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" size="md" onPress={onClose}>
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default TaskCreateModal;
