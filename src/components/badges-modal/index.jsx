import PropTypes from "prop-types";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { Button } from "../button/index";
import Badge from "../badge/index";
import "./styles.scss";

function BadgesModal({ badges, badgesModalOpen, setBadgesModalOpen }) {
  return (
    <Modal
      isOpen={badgesModalOpen}
      onOpenChange={setBadgesModalOpen}
      placement="auto"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>New badges earned! ✨</ModalHeader>
            <ModalBody>
              <p>You&apos;ve earned the following badges:</p>
              {/* show badges icons (inside assets/badges/badge-name.png */}
              <div className="badges">
                {badges.map((badge) => (
                  <Badge key={badge} userBadge={badge} />
                ))}
              </div>
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
BadgesModal.propTypes = {
  badges: PropTypes.array.isRequired,
  setBadgesModalOpen: PropTypes.func.isRequired,
  badgesModalOpen: PropTypes.bool.isRequired,
};

export default BadgesModal;
