import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import toast from "react-hot-toast";
import { hurray, moreSpecialHurray } from "../utils/misc";
import LevelUpModal from "../components/level-up-modal";
import Index from "../components/badges-modal/index";

export const CelebrationEvent = {
  LevelUp: "level-up",
  Badges: "badges",
  Points: "points",
};

const CelebrationContext = createContext();

export function CelebrationProvider({ children }) {
  const [levelUpModalOpen, setLevelUpModalOpen] = useState(false);
  const [badgesModalOpen, setBadgesModalOpen] = useState(false);
  const [eventValue, setEventValue] = useState(null);

  const triggerEvent = useCallback((event) => {
    // TODO: remove
    console.log({ event });

    setEventValue(event.value);
    switch (event.type) {
      case CelebrationEvent.LevelUp:
        /* event.value.levelUp = {
             id: number;
             name: string;
             points: number;
         } */
        // show fireworks
        moreSpecialHurray();
        setLevelUpModalOpen(true);
        break;
      case CelebrationEvent.Badges:
        /* event.value.badges: [
          'night-owl', 'task-master'
        ] */
        hurray();
        setBadgesModalOpen(true);
        break;
      case CelebrationEvent.Points:
        // show confetti
        hurray();
        // show a toast with the points earned
        toast(`Points earned: ${event.value.points}`, {
          icon: "🎉",
          position: "bottom-right",
        });
        break;
      default:
        console.warn("Unhandled event type:", event.type);
    }
  }, []);

  const value = useMemo(() => ({ triggerEvent }), [triggerEvent]);

  return (
    <CelebrationContext.Provider value={value}>
      {children}
      {!!eventValue?.levelUp && (
        <LevelUpModal
          level={eventValue.levelUp}
          levelUpModalOpen={levelUpModalOpen}
          setLevelUpModalOpen={setLevelUpModalOpen}
        />
      )}
      {!!eventValue?.badges && (
        <Index
          badges={eventValue.badges}
          badgesModalOpen={badgesModalOpen}
          setBadgesModalOpen={setBadgesModalOpen}
        />
      )}
    </CelebrationContext.Provider>
  );
}

CelebrationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useCelebrationContext() {
  const context = useContext(CelebrationContext);
  if (!context) {
    throw new Error(
      "useCelebrationContext must be used within a CelebrationProvider",
    );
  }
  return context;
}
