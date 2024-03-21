import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Button } from "../button";
import { CategoryInput, EmojiInput, Input } from "../input/index";
import "./styles.scss";

function TaskCreateModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    // register emoji field for form validation
    register("emoji");
  }, [register]);

  const onEmojiChange = (emoji) => {
    setValue("emoji", emoji);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  /* TODO: finish */
  return (
    <>
      <Button onClick={onOpen} size="lg">
        New Task
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="auto">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>New Task</ModalHeader>
              <ModalBody>
                <form
                  className="task-create"
                  id="task-create-form"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Input
                    autoFocus
                    id="title"
                    label="Title"
                    placeholder="Enter the task title"
                    {...register("title", { required: true })}
                  />
                  {/* TODO: deadline (required) */}
                  {/* TODO: impact & effort (required) */}
                  {/* TODO: description */}
                  {/* Keep those for last */}
                  <CategoryInput {...register("category")} />
                  <EmojiInput onEmojiChange={onEmojiChange} />
                </form>
              </ModalBody>
              <ModalFooter>
                <Button variant="bordered" size="md" onPress={onClose}>
                  Close
                </Button>
                <Button size="md" type="submit" form="task-create-form">
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
