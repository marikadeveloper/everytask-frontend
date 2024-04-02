import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { Button } from "./button";
import { useDeleteCategory } from "../utils/category";

function DeleteCategoryModal({ category, isOpen, onClose }) {
  const { mutate, isPending } = useDeleteCategory();

  const onConfirmDeletion = () => {
    mutate(category.id, {
      onSuccess: () => {
        toast.success(`Category ${category.name} deleted successfully.`);
        onClose();
      },
    });
  };

  return (
    <Modal
      disableAnimation
      isOpen={isOpen}
      onOpenChange={onClose}
      placement="auto"
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader>Delete Category</ModalHeader>
            <ModalBody>
              Are you sure you want to delete category {category.name}?
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
  );
}
DeleteCategoryModal.defaultProps = {
  category: {},
};
DeleteCategoryModal.propTypes = {
  category: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DeleteCategoryModal;
