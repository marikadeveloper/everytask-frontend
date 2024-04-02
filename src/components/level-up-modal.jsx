import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import PropTypes from "prop-types";
import { Button } from "./button/index";

function LevelUpModal({ level, levelUpModalOpen, setLevelUpModalOpen }) {
  return (
    <Modal
      disableAnimation
      isOpen={levelUpModalOpen}
      onOpenChange={setLevelUpModalOpen}
      placement="auto"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Level up! 🏆</ModalHeader>
            <ModalBody>
              <p>
                Congratulations! You&apos;ve reached level{" "}
                <strong>{level.name}</strong>!
              </p>
            </ModalBody>
            <ModalFooter>
              <Button variant="bordered" size="md" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
LevelUpModal.propTypes = {
  level: PropTypes.object.isRequired,
  levelUpModalOpen: PropTypes.bool.isRequired,
  setLevelUpModalOpen: PropTypes.func.isRequired,
};

export default LevelUpModal;
