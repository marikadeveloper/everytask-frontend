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
import {
  taskImpactArray,
  taskImpactLabels,
  useCreateTask,
} from "../../utils/task";
import { Button } from "../button";
import { ErrorMessage } from "../errors/index";
import {
  CategoryInput,
  DatetimePicker,
  EmojiInput,
  Input,
  Select,
} from "../input/index";
import "./styles.scss";

const taskImpacts = taskImpactArray.map((impact) => ({
  value: impact,
  label: taskImpactLabels[impact],
}));

function TaskCreateModal() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { register, handleSubmit, setValue } = useForm();
  const { mutate, status, isPending, error, isError } = useCreateTask();

  useEffect(() => {
    if (status === "success") {
      toast.success("Task created successfully");
      onClose();
    }
  }, [status, onClose]);

  useEffect(() => {
    // register manually form fields that are not native inputs
    register("emoji");
    register("dueDate", { required: true });
    register("categoryId");
  }, [register]);

  const onManualFieldChange = ({ field, value }) => {
    setValue(field, value);
  };

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <>
      <Button onClick={onOpen} size="lg">
        New Task
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="auto">
        <ModalContent>
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
                <DatetimePicker
                  onDateChange={(value) =>
                    onManualFieldChange({ field: "dueDate", value })
                  }
                />
                <Select
                  label="Impact"
                  placeholder="Select impact"
                  items={taskImpacts}
                  {...register("impact", { required: true })}
                />
                <Input
                  id="description"
                  label="Description"
                  placeholder="Enter a description"
                  {...register("description")}
                />
                {/* Keep these for last */}
                <CategoryInput
                  onCategoryChange={(value) =>
                    onManualFieldChange({ field: "categoryId", value })
                  }
                />
                <EmojiInput
                  onEmojiChange={(value) =>
                    onManualFieldChange({ field: "emoji", value })
                  }
                />

                {isError ? <ErrorMessage error={error} /> : null}
              </form>
            </ModalBody>
            <ModalFooter>
              <Button variant="bordered" size="md" onPress={onClose}>
                Close
              </Button>
              <Button
                isLoading={isPending}
                size="md"
                type="submit"
                form="task-create-form"
              >
                Create
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}

export default TaskCreateModal;
