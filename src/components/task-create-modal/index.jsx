import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { Button } from "../button";
import { EmojiInput, Input } from "../input/index";

function TaskCreateModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { register } = useForm();

  const onEmojiChange = (emoji) => {
    console.log(emoji);
  };

  /* TODO: finish */
  return (
    <>
      <Button onClick={onOpen}>New Task</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="auto">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>New Task</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  id="title"
                  label="Title"
                  placeholder="Enter the task title"
                  {...register("title", { required: true })}
                />

                <EmojiInput onEmojiChange={onEmojiChange} />
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
