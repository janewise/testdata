import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import "./task.css";

interface AirtwoProps {
  userId: string | null;
  balanceRef: React.MutableRefObject<{ value: number }>;
  onRewardClaimed: () => void;
}

const Airtwo: React.FC<AirtwoProps> = ({ userId, balanceRef, onRewardClaimed }) => {
  const [taskState, setTaskState] = useState<'go' | 'check' | 'countdown' | 'claim' | 'done'>('go');
  const [countdown, setCountdown] = useState(20);
  const [upgradeLevels, setUpgradeLevels] = useState<number[]>([]);
  const [initialLoad, setInitialLoad] = useState(true);
  const Airtwo =700;

  useEffect(() => {
    if (userId) {
      const db = getDatabase();
      const upgradesRef = ref(db, `users/${userId}/upgrades`);

      onValue(upgradesRef, (snapshot) => {
        const data = snapshot.val() || {};
        const levels = [
          data.autoClicker01 || 0,
          data.autoClicker02 || 0,
          data.autoClicker03 || 0,
          data.autoClicker04 || 0,
          data.autoClicker05 || 0,
          data.autoClicker06 || 0,
          data.autoClicker07 || 0,
          data.refClicker01 || 0,
          data.refClicker02 || 0,
        ];
        setUpgradeLevels(levels);
      });
    }
  }, [userId]);

  const calculateTotalValue = (levels: number[]) => {
    return levels.reduce((acc, level) => acc + (level > 0 ? 1 : 0), 0);
  };

  useEffect(() => {
    const savedState = localStorage.getItem("airTwoTaskState");
    if (savedState === "done") {
      setTaskState("done");
    } else {
      setTaskState("go");
    }
    setInitialLoad(false);
  }, []);

  useEffect(() => {
    if (!initialLoad) {
      if (taskState === "done") {
        localStorage.setItem("airTwoTaskState", taskState);
      } else {
        localStorage.removeItem("airTwoTaskState");
      }
    }
  }, [taskState, initialLoad]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (taskState === "countdown" && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (taskState === "countdown" && countdown === 0) {
      setTaskState("claim");
    }
    return () => clearTimeout(timer);
  }, [taskState, countdown]);

  const handleGoClick = () => {
     const totalValue = calculateTotalValue(upgradeLevels);
    if (totalValue >= 4) {
      setTaskState("check");
    }
  };

  const handleCheckClick = () => {
    setTaskState("countdown");
  };

  const handleClaimClick = () => {
    balanceRef.current.value += Airtwo;
    onRewardClaimed(); // Notify parent that reward was claimed
    setTaskState("done");
  };

  const renderButton = () => {
    switch (taskState) {
      case "go":
        return <button className="taskgo" onClick={handleGoClick}>Go</button>;
      case "check":
        return <button className="taskcheck" onClick={handleCheckClick}>Check</button>;
      case "countdown":
        return <button className="taskcount" disabled>{countdown}s</button>;
      case "claim":
        return <button className="taskclaim" onClick={handleClaimClick}>Claim</button>;
      case "done":
        return <button className="taskdone" disabled>✔️</button>;
      default:
        return null;
    }
  };

  const totalValue = calculateTotalValue(upgradeLevels);
  return (
    <div className="task-box">
      <span className="taskspan">
        <p className="taskp">
          <span>Upgrade Cards ({Airtwo} Coin)</span>
          <span>{renderButton()}</span>
        </p>
      </span>
    </div>
  );
};

export default Airtwo;
