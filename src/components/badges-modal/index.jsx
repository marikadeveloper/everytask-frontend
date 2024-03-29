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

function Index({ badges, badgesModalOpen, setBadgesModalOpen }) {
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
                  <Badge key={badge} code={badge} />
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
Index.propTypes = {
  badges: PropTypes.arrayOf(PropTypes.string).isRequired,
  setBadgesModalOpen: PropTypes.func.isRequired,
  badgesModalOpen: PropTypes.bool.isRequired,
};

export default Index;
