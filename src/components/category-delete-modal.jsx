import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React from "react";
import { Button } from "./button";

function DeleteCategoryModal({ isOpen, onClose, onConfirmDeletion }) {
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onClose} placement="auto">
        <ModalContent>
          {() => (
            <>
              <ModalHeader>Delete Category</ModalHeader>
              <ModalBody>
                Are you sure you want to delete this category?
              </ModalBody>
              <ModalFooter>
                <Button variant="bordered" onPress={onClose}>
                  Discard
                </Button>
                <Button color="danger" auto onPress={onConfirmDeletion}>
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

export default DeleteCategoryModal;
