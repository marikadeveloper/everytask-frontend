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
import { CategoryInput, DatetimePicker, EmojiInput, Input } from "../input/index";
import { taskImpactArray } from "../../utils/task";
import "./styles.scss";

// 🤔 Alberto: usa questi valori per la <Select> dell'impact
const taskImpacts = taskImpactArray;

function TaskCreateModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    // register manually form fields that are not native inputs
    register("emoji");
    register("dueDate", { required: true });
  }, [register]);

  const onEmojiChange = (emoji) => {
    setValue("emoji", emoji);
  };

  const onDateChange = (date) => {
    setValue("dueDate", date);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

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
                  <DatetimePicker onDateChange={onDateChange} />

                  {/* 🤔Alberto: */}
                  {/* TODO: impact (select) (required) */}
                  {/* TODO: description (normal input) */}

                  {/* Keep these for last */}
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
