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
import { useCreateTask } from "../../utils/task";
import { Button } from "../button";

import {
  CategoryInput,
  DatetimePicker,
  EmojiInput,
  Input,
  Select,
} from "../input/index";
import "./styles.scss";

// 🤔 Alberto: usa questi valori per la <Select> dell'impact FATTO!
const taskImpacts = [
  { value: "HIGH_EFFORT_HIGH_IMPACT", label: "High effort high impact" },
  { value: "HIGH_EFFORT_LOW_IMPACT", label: "High effort low impact" },
  { value: "LOW_EFFORT_HIGH_IMPACT", label: "Low effort high impact" },
  { value: "LOW_EFFORT_LOW_IMPACT", label: "Low effort low impact" },
];

function TaskCreateModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { register, handleSubmit, setValue } = useForm();
  const { mutate, status } = useCreateTask();

  useEffect(() => {
    console.log(status);
  }, [status]);

  {
    /*useEffect(() => {
    // register manually form fields that are not native inputs
    register("emoji");
    register("dueDate", { required: true });
  }, [register]);*/
  }

  const onEmojiChange = (emoji) => {
    setValue("emoji", emoji);
  };

  const onDateChange = (date) => {
    setValue("dueDate", date);
  };

  const onSubmit = (data) => {
    mutate(data);
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
                  {/* TODO: impact (select) (required) FATTO! */}
                  <Select
                    label="Impact"
                    placeholder="Select impact"
                    items={taskImpacts}
                    {...register("impact", { required: true })}
                  />
                  {/* TODO: description (normal input) FATTO! */}
                  <Input
                    id="description"
                    label="Description"
                    placeholder="Enter a description"
                    {...register("description")}
                  />
                  {/* Keep these for last */}
                  <CategoryInput {...register("categoryId")} />
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
