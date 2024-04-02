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
import BadgesModal from "../components/badges-modal";

export const CelebrationEvent = {
  LevelUp: "level-up",
  Badges: "badges",
  Points: "points",
  Streak: "streak",
};

const emptyLevelUp = { id: 0, name: "", points: 0 };

const CelebrationContext = createContext();
export function CelebrationProvider({ children }) {
  const [levelUpModalOpen, setLevelUpModalOpen] = useState(false);
  const [badgesModalOpen, setBadgesModalOpen] = useState(false);
  const [levelUp, setLevelUp] = useState(emptyLevelUp);
  const [badges, setBadges] = useState([]);

  const triggerEvent = useCallback((event) => {
    switch (event.type) {
      case CelebrationEvent.LevelUp:
        /* event.value.levelUp = {
             id: number;
             name: string;
             points: number;
         } */
        // show fireworks
        moreSpecialHurray();
        setLevelUp(event.value.levelUp);
        setLevelUpModalOpen(true);
        break;
      case CelebrationEvent.Badges:
        /* event.value.badges: [
          'night-owl', 'task-master'
        ] */
        hurray();
        setBadges(event.value.badges);
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
      case CelebrationEvent.Streak:
        // show confetti
        hurray();
        // show a toast with the streak
        toast(`Streak: ${event.value.streak.current} day(s)`, {
          icon: "🔥",
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
      <LevelUpModal
        level={levelUp}
        levelUpModalOpen={levelUpModalOpen}
        setLevelUpModalOpen={setLevelUpModalOpen}
      />
      <BadgesModal
        badges={badges || []}
        badgesModalOpen={badgesModalOpen}
        setBadgesModalOpen={setBadgesModalOpen}
      />
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
