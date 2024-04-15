import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import PropTypes from "prop-types";
import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  taskImpactArray,
  taskImpactLabels,
  useCreateTask,
  useUpdateTask,
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

function TaskCreateEditModal({ task, disabled = false }) {
  const isEditMode = !!task;
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    control,
    register,
    handleSubmit,
    setValue,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: useMemo(() => {
      return {
        title: task ? task.title : "",
        description: task ? task.description : "",
        dueDate: task ? new Date(task.dueDate) : new Date(),
        categoryId: task ? task.category?.id : undefined,
        impact: task ? task.impact : undefined,
      };
    }, [task]),
  });
  const updateTaskHook = useUpdateTask();
  const createTaskHook = useCreateTask();
  const { mutate, status, isPending, error, isError } = isEditMode
    ? updateTaskHook
    : createTaskHook;

  useEffect(() => {
    if (status === "success") {
      toast.success(`Task ${isEditMode ? "updated" : "created"} successfully`);
      // reset form values
      reset();
      // close dialog
      onClose();
    }
  }, [status, onClose, isEditMode, reset]);

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
    console.log(data);
    let hasError = false;

    if (!data.impact) {
      setError("impact", {
        type: "manual",
        message: "Please select a valid impact for the task.",
      });
      hasError = true;
    }

    if (!data.title) {
      setError("title", {
        type: "manual",
        message: "Please provide a title for the task.",
      });
      hasError = true;
    }

    if (hasError) {
      return;
    }

    if (isEditMode) {
      mutate({ ...data, id: task.id }); // Ensure you pass the task ID for updates
    } else {
      // remove null/undefined values from the data object
      mutate(data);
    }
  };

  return (
    <>
      <Button
        onClick={onOpen}
        size={isEditMode ? "md" : "lg"}
        isDisabled={disabled}
      >
        {isEditMode ? "Edit Task" : "New Task"}
      </Button>
      <Modal
        disableAnimation
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="auto"
      >
        <ModalContent>
          <>
            <ModalHeader>{isEditMode ? "Edit Task" : "New Task"}</ModalHeader>
            <ModalBody>
              <form
                className="task-create"
                id="task-create-form"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoFocus
                      id="title"
                      label="Title"
                      placeholder="Enter the task title"
                      {...field}
                    />
                  )}
                />
                {errors.title && (
                  <p className="error-message">{errors.title.message}</p>
                )}
                <DatetimePicker
                  date={task ? new Date(task?.dueDate) : new Date()}
                  onDateChange={(value) =>
                    onManualFieldChange({ field: "dueDate", value })
                  }
                />
                <Controller
                  name="impact"
                  control={control}
                  render={({ field }) => (
                    <Select
                      label="Impact"
                      placeholder="Select impact"
                      items={taskImpacts}
                      defaultSelectedKeys={task ? [task.impact] : []}
                      {...field}
                    />
                  )}
                />
                {errors.impact && (
                  <p className="error-message">{errors.impact.message}</p>
                )}
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="description"
                      label="Description"
                      placeholder="Enter a description"
                      {...field}
                    />
                  )}
                />
                {/* Keep these for last */}
                <CategoryInput
                  preselectedCategory={task?.category?.id}
                  onCategoryChange={(value) =>
                    onManualFieldChange({ field: "categoryId", value })
                  }
                />
                <EmojiInput
                  defaultEmoji={task?.emoji}
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
                {isEditMode ? "Update" : "Create"}
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}

TaskCreateEditModal.defaultProps = {
  task: null,
  disabled: false,
};
TaskCreateEditModal.propTypes = {
  task: PropTypes.object,
  disabled: PropTypes.bool,
};

export default TaskCreateEditModal;
