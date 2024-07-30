// import React, { useState, useEffect } from "react";

// interface DailyrewardProps {
//   balanceRef: React.MutableRefObject<{ value: number }>;
//   onRewardClaimed: () => void;
// }

// const dailyRewards = [100, 200, 300, 400, 500, 600, 700, 800];

// const Dailyreward: React.FC<DailyrewardProps> = ({ balanceRef, onRewardClaimed }) => {
//   const [currentDay, setCurrentDay] = useState<number>(1);
//   const [claimableDay, setClaimableDay] = useState<number>(1);
//   const [lastClaimTimestamp, setLastClaimTimestamp] = useState<number>(Date.now());
//   const [hasClaimed, setHasClaimed] = useState<boolean>(false);
//   const [initialLoad, setInitialLoad] = useState<boolean>(true);

//   useEffect(() => {
//     const storedDay = localStorage.getItem("currentDay");
//     const storedClaimableDay = localStorage.getItem("claimableDay");
//     const storedTimestamp = localStorage.getItem("lastClaimTimestamp");
//     const storedHasClaimed = localStorage.getItem("hasClaimed");

//     if (storedDay && storedTimestamp && storedClaimableDay && storedHasClaimed) {
//       const day = parseInt(storedDay, 10);
//       const claimable = parseInt(storedClaimableDay, 10);
//       const timestamp = parseInt(storedTimestamp, 10);
//       const hasClaimed = storedHasClaimed === "true";

//       const currentTime = Date.now();
//       const timeDifference = currentTime - timestamp;

//       console.log("Stored Day:", day);
//       console.log("Stored Claimable Day:", claimable);
//       console.log("Stored Timestamp:", timestamp);
//       console.log("Current Time:", currentTime);
//       console.log("Time Difference (minutes):", timeDifference / (60 * 1000));

//       if (timeDifference > 60 * 1000) { // 1 minute
//         const nextClaimableDay = claimable === 8 ? 1 : claimable + 1;
//         setClaimableDay(nextClaimableDay);
//         setLastClaimTimestamp(Date.now());
//         setHasClaimed(false);
//       } else {
//         setClaimableDay(claimable);
//         setLastClaimTimestamp(timestamp);
//         setHasClaimed(hasClaimed);
//       }

//       setCurrentDay(day);
//     }

//     setInitialLoad(false);
//   }, []);

//   useEffect(() => {
//     if (!initialLoad) {
//       localStorage.setItem("currentDay", currentDay.toString());
//       localStorage.setItem("claimableDay", claimableDay.toString());
//       localStorage.setItem("lastClaimTimestamp", lastClaimTimestamp.toString());
//       localStorage.setItem("hasClaimed", hasClaimed.toString());
//       console.log("Updated Current Day:", currentDay);
//       console.log("Updated Claimable Day:", claimableDay);
//       console.log("Updated Last Claim Timestamp:", lastClaimTimestamp);
//       console.log("Updated Has Claimed:", hasClaimed);
//     }
//   }, [currentDay, claimableDay, lastClaimTimestamp, hasClaimed, initialLoad]);

//   const handleClaimReward = (day: number) => {
//     if (day !== claimableDay || hasClaimed || initialLoad) return;

//     const reward = dailyRewards[day - 1];
//     balanceRef.current.value += reward;
//     onRewardClaimed();

//     const nextDay = currentDay === 8 ? 1 : currentDay + 1;
//     setCurrentDay(nextDay);
//     setLastClaimTimestamp(Date.now());
//     setHasClaimed(true);

//     console.log(`Reward for Day ${day} claimed: ${reward} coins`);
//     console.log("Next Current Day:", nextDay);
//   };

//   return (
//     <div>
//       <h2>Daily Reward</h2>
//       {dailyRewards.map((reward, index) => {
//         const day = index + 1;
//         return (
//           <div key={day}>
//             <p>Day {day} Reward: {reward} Coins</p>
//             <button
//               onClick={() => handleClaimReward(day)}
//               disabled={day !== claimableDay || hasClaimed || initialLoad}
//             >
//               Claim Reward
//             </button>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default Dailyreward;


//down is 2


// import React, { useState, useEffect } from "react";

// interface DailyrewardProps {
//   balanceRef: React.MutableRefObject<{ value: number }>;
//   onRewardClaimed: () => void;
// }

// const dailyRewards = [100, 200, 300, 400, 500, 600, 700, 800];

// const Dailyreward: React.FC<DailyrewardProps> = ({ balanceRef, onRewardClaimed }) => {
//   const [currentDay, setCurrentDay] = useState<number>(1);
//   const [claimableDay, setClaimableDay] = useState<number>(1);
//   const [lastClaimTimestamp, setLastClaimTimestamp] = useState<number>(Date.now());
//   const [hasClaimed, setHasClaimed] = useState<boolean>(false);
//   const [initialLoad, setInitialLoad] = useState<boolean>(true);

//   useEffect(() => {
//     const storedDay = localStorage.getItem("currentDay");
//     const storedClaimableDay = localStorage.getItem("claimableDay");
//     const storedTimestamp = localStorage.getItem("lastClaimTimestamp");
//     const storedHasClaimed = localStorage.getItem("hasClaimed");

//     if (storedDay && storedTimestamp && storedClaimableDay && storedHasClaimed) {
//       const day = parseInt(storedDay, 10);
//       const claimable = parseInt(storedClaimableDay, 10);
//       const timestamp = parseInt(storedTimestamp, 10);
//       const hasClaimed = storedHasClaimed === "true";

//       const currentTime = Date.now();
//       const timeDifference = currentTime - timestamp;

//       console.log("Stored Day:", day);
//       console.log("Stored Claimable Day:", claimable);
//       console.log("Stored Timestamp:", timestamp);
//       console.log("Current Time:", currentTime);
//       console.log("Time Difference (minutes):", timeDifference / (60 * 1000));

//       setCurrentDay(day);
//       setClaimableDay(claimable);
//       setLastClaimTimestamp(timestamp);
//       setHasClaimed(hasClaimed);

//       if (timeDifference > 60 * 1000 && hasClaimed) { // 1 minute
//         const nextClaimableDay = claimable === 8 ? 1 : claimable + 1;
//         setClaimableDay(nextClaimableDay);
//         setHasClaimed(false);
//         console.log(`Time difference exceeded 1 minute. Next claimable day: ${nextClaimableDay}`);
//       }
//     }

//     setInitialLoad(false);
//   }, []);

//   useEffect(() => {
//     if (!initialLoad) {
//       localStorage.setItem("currentDay", currentDay.toString());
//       localStorage.setItem("claimableDay", claimableDay.toString());
//       localStorage.setItem("lastClaimTimestamp", lastClaimTimestamp.toString());
//       localStorage.setItem("hasClaimed", hasClaimed.toString());
//       console.log("Updated Current Day:", currentDay);
//       console.log("Updated Claimable Day:", claimableDay);
//       console.log("Updated Last Claim Timestamp:", lastClaimTimestamp);
//       console.log("Updated Has Claimed:", hasClaimed);
//     }
//   }, [currentDay, claimableDay, lastClaimTimestamp, hasClaimed, initialLoad]);

//   const handleClaimReward = (day: number) => {
//     if (day !== claimableDay || hasClaimed || initialLoad) return;

//     const reward = dailyRewards[day - 1];
//     balanceRef.current.value += reward;
//     onRewardClaimed();

//     const nextDay = currentDay === 8 ? 1 : currentDay + 1;
//     setCurrentDay(nextDay);
//     setClaimableDay(nextDay);
//     setLastClaimTimestamp(Date.now());
//     setHasClaimed(true);

//     console.log(`Reward for Day ${day} claimed: ${reward} coins`);
//     console.log("Next Current Day:", nextDay);
//   };

//   const cardStyle: React.CSSProperties = {
//     border: '1px solid #ccc',
//     padding: '10px',
//     margin: '10px',
//     cursor: 'pointer',
//     display: 'inline-block',
//     opacity: 0.5,
//   };

//   const activeCardStyle: React.CSSProperties = {
//     ...cardStyle,
//     opacity: 1,
//   };

//   return (
//     <div>
//       <h2>Daily Reward</h2>
//       <div
//         style={1 === claimableDay && !hasClaimed && !initialLoad ? activeCardStyle : cardStyle}
//         onClick={() => handleClaimReward(1)}
//       >
//         <h4>Day-1</h4>
//         <p>100 Coins</p>
//       </div>
//       <div
//         style={2 === claimableDay && !hasClaimed && !initialLoad ? activeCardStyle : cardStyle}
//         onClick={() => handleClaimReward(2)}
//       >
//         <h4>Day-2</h4>
//         <p>200 Coins</p>
//       </div>
//       <div
//         style={3 === claimableDay && !hasClaimed && !initialLoad ? activeCardStyle : cardStyle}
//         onClick={() => handleClaimReward(3)}
//       >
//         <h4>Day-3</h4>
//         <p>300 Coins</p>
//       </div>
//       <div
//         style={4 === claimableDay && !hasClaimed && !initialLoad ? activeCardStyle : cardStyle}
//         onClick={() => handleClaimReward(4)}
//       >
//         <h4>Day-4</h4>
//         <p>400 Coins</p>
//       </div>
//       <div
//         style={5 === claimableDay && !hasClaimed && !initialLoad ? activeCardStyle : cardStyle}
//         onClick={() => handleClaimReward(5)}
//       >
//         <h4>Day-5</h4>
//         <p>500 Coins</p>
//       </div>
//       <div
//         style={6 === claimableDay && !hasClaimed && !initialLoad ? activeCardStyle : cardStyle}
//         onClick={() => handleClaimReward(6)}
//       >
//         <h4>Day-6</h4>
//         <p>600 Coins</p>
//       </div>
//       <div
//         style={7 === claimableDay && !hasClaimed && !initialLoad ? activeCardStyle : cardStyle}
//         onClick={() => handleClaimReward(7)}
//       >
//         <h4>Day-7</h4>
//         <p>700 Coins</p>
//       </div>
//       <div
//         style={8 === claimableDay && !hasClaimed && !initialLoad ? activeCardStyle : cardStyle}
//         onClick={() => handleClaimReward(8)}
//       >
//         <h4>Day-8</h4>
//         <p>800 Coins</p>
//       </div>
//     </div>
//   );
// };

// export default Dailyreward;



////down is 3

// import React, { useState, useEffect } from "react";

// interface DailyrewardProps {
//   balanceRef: React.MutableRefObject<{ value: number }>;
//   onRewardClaimed: () => void;
// }

// const dailyRewards = [100, 200, 300, 400, 500, 600, 700, 800];

// const Dailyreward: React.FC<DailyrewardProps> = ({ balanceRef, onRewardClaimed }) => {
//   const [currentDay, setCurrentDay] = useState<number>(1);
//   const [claimableDay, setClaimableDay] = useState<number>(1);
//   const [lastClaimTimestamp, setLastClaimTimestamp] = useState<number>(Date.now());
//   const [hasClaimed, setHasClaimed] = useState<boolean>(false);
//   const [initialLoad, setInitialLoad] = useState<boolean>(true);

//   useEffect(() => {
//     const storedDay = localStorage.getItem("currentDay");
//     const storedClaimableDay = localStorage.getItem("claimableDay");
//     const storedTimestamp = localStorage.getItem("lastClaimTimestamp");
//     const storedHasClaimed = localStorage.getItem("hasClaimed");

//     if (storedDay && storedTimestamp && storedClaimableDay && storedHasClaimed) {
//       const day = parseInt(storedDay, 10);
//       const claimable = parseInt(storedClaimableDay, 10);
//       const timestamp = parseInt(storedTimestamp, 10);
//       const hasClaimed = storedHasClaimed === "true";

//       const currentTime = Date.now();
//       const timeDifference = currentTime - timestamp;

//       console.log("Stored Day:", day);
//       console.log("Stored Claimable Day:", claimable);
//       console.log("Stored Timestamp:", timestamp);
//       console.log("Current Time:", currentTime);
//       console.log("Time Difference (minutes):", timeDifference / (60 * 1000));

//       setCurrentDay(day);
//       setClaimableDay(claimable);
//       setLastClaimTimestamp(timestamp);
//       setHasClaimed(hasClaimed);

//       if (timeDifference > 60 * 1000 && timeDifference <= 120 * 1000 && hasClaimed) { // 1 minute to 2 minutes
//         const nextClaimableDay = claimable === 8 ? 1 : claimable + 1;
//         setClaimableDay(nextClaimableDay);
//         setHasClaimed(false);
//         console.log(`Time difference exceeded 1 minute. Next claimable day: ${nextClaimableDay}`);
//       } else if (timeDifference > 120 * 1000) { // 2 minutes
//         setCurrentDay(1);
//         setClaimableDay(1);
//         setHasClaimed(false);
//         console.log("Time difference exceeded 2 minutes. Reset to day 1.");
//       }
//     }

//     setInitialLoad(false);
//   }, []);

//   useEffect(() => {
//     if (!initialLoad) {
//       localStorage.setItem("currentDay", currentDay.toString());
//       localStorage.setItem("claimableDay", claimableDay.toString());
//       localStorage.setItem("lastClaimTimestamp", lastClaimTimestamp.toString());
//       localStorage.setItem("hasClaimed", hasClaimed.toString());
//       console.log("Updated Current Day:", currentDay);
//       console.log("Updated Claimable Day:", claimableDay);
//       console.log("Updated Last Claim Timestamp:", lastClaimTimestamp);
//       console.log("Updated Has Claimed:", hasClaimed);
//     }
//   }, [currentDay, claimableDay, lastClaimTimestamp, hasClaimed, initialLoad]);

//   const handleClaimReward = (day: number) => {
//     if (day !== claimableDay || hasClaimed || initialLoad) return;

//     const reward = dailyRewards[day - 1];
//     balanceRef.current.value += reward;
//     onRewardClaimed();

//     const nextDay = currentDay === 8 ? 1 : currentDay + 1;
//     setCurrentDay(nextDay);
//     const nextClaimableDay = nextDay;
//     setClaimableDay(nextClaimableDay);
//     setLastClaimTimestamp(Date.now());
//     setHasClaimed(true);

//     console.log(`Reward for Day ${day} claimed: ${reward} coins`);
//     console.log("Next Current Day:", nextDay);
//     console.log("Next Claimable Day:", nextClaimableDay);
//   };

//   const cardStyle: React.CSSProperties = {
//     border: '1px solid #ccc',
//     padding: '10px',
//     margin: '10px',
//     cursor: 'pointer',
//     display: 'inline-block',
//     opacity: 0.5,
//   };

//   const activeCardStyle: React.CSSProperties = {
//     ...cardStyle,
//     opacity: 1,
//   };

//   return (
//     <div>
//       <h2>Daily Reward</h2>
//       {dailyRewards.map((reward, index) => (
//         <div
//           key={index}
//           style={(index + 1) === claimableDay && !hasClaimed && !initialLoad ? activeCardStyle : cardStyle}
//           onClick={() => handleClaimReward(index + 1)}
//         >
//           <h4>Day-{index + 1}</h4>
//           <p>{reward} Coins</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Dailyreward;

// Time difference exceeded 2 minutes. Reset to day 1.
// App.tsx:49 timePassed (seconds): 1.36
// App.tsx:54 calculatedEnergy: 100
// App.tsx:101 Telegram SDK is already loaded
// telegram-web-app.js:135 [Telegram.WebView] > postEvent web_app_ready 
// App.tsx:88 Telegram Web App SDK initialized
// App.tsx:89 tg.initDataUnsafe: {}
// task.tsx:34 Saving task state for Follow on Telegram: done
// task.tsx:34 Saving task state for Follow on X: done
// task.tsx:34 Saving task state for Follow on U-tube: done
// dailyreward.tsx:338 Updated Current Day: 1
// dailyreward.tsx:339 Updated Claimable Day: 1
// dailyreward.tsx:340 Updated Last Claim Timestamp: 1722155149075
// dailyreward.tsx:341 Updated Has Claimed: false        
// dailyreward.tsx:359 Reward for Day 1 claimed: 100 coins
// dailyreward.tsx:360 Next Current Day: 2
// dailyreward.tsx:361 Next Claimable Day: 2
// dailyreward.tsx:338 Updated Current Day: 2
// dailyreward.tsx:339 Updated Claimable Day: 2
// dailyreward.tsx:340 Updated Last Claim Timestamp: 1722155300600
// dailyreward.tsx:341 Updated Has Claimed: true
// Stored Day: 2
// dailyreward.tsx:306 Stored Claimable Day: 2
// dailyreward.tsx:307 Stored Timestamp: 1722155300600
// dailyreward.tsx:308 Current Time: 1722155372022
// dailyreward.tsx:309 Time Difference (minutes): 1.1903666666666666
// dailyreward.tsx:320 Time difference exceeded 1 minute. Next claimable day: 3
// App.tsx:49 timePassed (seconds): 1.791
// App.tsx:54 calculatedEnergy: 100
// App.tsx:101 Telegram SDK is already loaded
// telegram-web-app.js:135 [Telegram.WebView] > postEvent web_app_ready 
// App.tsx:88 Telegram Web App SDK initialized
// App.tsx:89 tg.initDataUnsafe: {}
// task.tsx:34 Saving task state for Follow on Telegram: done
// task.tsx:34 Saving task state for Follow on X: done
// task.tsx:34 Saving task state for Follow on U-tube: done
// dailyreward.tsx:338 Updated Current Day: 2
// dailyreward.tsx:339 Updated Claimable Day: 3
// dailyreward.tsx:340 Updated Last Claim Timestamp: 1722155300600
// dailyreward.tsx:341 Updated Has Claimed: false


//down is 4

// import React, { useState, useEffect } from "react";

// interface DailyrewardProps {
//   balanceRef: React.MutableRefObject<{ value: number }>;
//   onRewardClaimed: () => void;
// }

// const dailyRewards = [100, 200, 300, 400, 500, 600, 700, 800];

// const Dailyreward: React.FC<DailyrewardProps> = ({ balanceRef, onRewardClaimed }) => {
//   const [currentDay, setCurrentDay] = useState<number>(1);
//   const [claimableDay, setClaimableDay] = useState<number>(1);
//   const [lastClaimTimestamp, setLastClaimTimestamp] = useState<number>(Date.now());
//   const [hasClaimed, setHasClaimed] = useState<boolean>(false);
//   const [initialLoad, setInitialLoad] = useState<boolean>(true);

//   useEffect(() => {
//     const storedDay = localStorage.getItem("currentDay");
//     const storedClaimableDay = localStorage.getItem("claimableDay");
//     const storedTimestamp = localStorage.getItem("lastClaimTimestamp");
//     const storedHasClaimed = localStorage.getItem("hasClaimed");

//     if (storedDay && storedTimestamp && storedClaimableDay && storedHasClaimed) {
//       const day = parseInt(storedDay, 10);
//       const claimable = parseInt(storedClaimableDay, 10);
//       const timestamp = parseInt(storedTimestamp, 10);
//       const hasClaimed = storedHasClaimed === "true";

//       const currentTime = Date.now();
//       const timeDifference = currentTime - timestamp;

//       console.log("Stored Day:", day);
//       console.log("Stored Claimable Day:", claimable);
//       console.log("Stored Timestamp:", timestamp);
//       console.log("Current Time:", currentTime);
//       console.log("Time Difference (minutes):", timeDifference / (60 * 1000));

//       setCurrentDay(day);
//       setClaimableDay(claimable);
//       setLastClaimTimestamp(timestamp);
//       setHasClaimed(hasClaimed);

//       if (timeDifference > 60 * 1000 && timeDifference <= 120 * 1000 && hasClaimed) { // 1 minute to 2 minutes
//         const nextClaimableDay = claimable === 8 ? 1 : claimable + 1;
//         setClaimableDay(nextClaimableDay);
//         setHasClaimed(false);
//         console.log(`Time difference exceeded 1 minute. Next claimable day: ${nextClaimableDay}`);
//       } else if (timeDifference > 120 * 1000) { // 2 minutes
//         setCurrentDay(1);
//         setClaimableDay(1);
//         setHasClaimed(false);
//         console.log("Time difference exceeded 2 minutes. Reset to day 1.");
//       }
//     }

//     setInitialLoad(false);
//   }, []);

//   useEffect(() => {
//     if (!initialLoad) {
//       localStorage.setItem("currentDay", currentDay.toString());
//       localStorage.setItem("claimableDay", claimableDay.toString());
//       localStorage.setItem("lastClaimTimestamp", lastClaimTimestamp.toString());
//       localStorage.setItem("hasClaimed", hasClaimed.toString());
//       console.log("Updated Current Day:", currentDay);
//       console.log("Updated Claimable Day:", claimableDay);
//       console.log("Updated Last Claim Timestamp:", lastClaimTimestamp);
//       console.log("Updated Has Claimed:", hasClaimed);
//     }
//   }, [currentDay, claimableDay, lastClaimTimestamp, hasClaimed, initialLoad]);

//   const handleClaimReward = (day: number) => {
//     if (day !== claimableDay || hasClaimed || initialLoad) return;

//     const reward = dailyRewards[day - 1];
//     balanceRef.current.value += reward;
//     onRewardClaimed();

//     const nextDay = currentDay === 8 ? 1 : currentDay + 1;
//     setCurrentDay(nextDay);
//     const nextClaimableDay = nextDay;
//     setClaimableDay(nextClaimableDay);
//     setLastClaimTimestamp(Date.now());
//     setHasClaimed(true);

//     console.log(`Reward for Day ${day} claimed: ${reward} coins`);
//     console.log("Next Current Day:", nextDay);
//     console.log("Next Claimable Day:", nextClaimableDay);
//   };

//   const cardStyle: React.CSSProperties = {
//     border: '1px solid #ccc',
//     padding: '10px',
//     margin: '10px',
//     cursor: 'pointer',
//     display: 'inline-block',
//     opacity: 0.5,
//   };

//   const activeCardStyle: React.CSSProperties = {
//     ...cardStyle,
//     opacity: 1,
//   };

//   return (
//     <div>
//       <h2>Daily Reward</h2>
//       <div
//         style={1 === claimableDay && !hasClaimed && !initialLoad ? activeCardStyle : cardStyle}
//         onClick={() => handleClaimReward(1)}
//       >
//         <h4>Day-1</h4>
//         <p>100 Coins</p>
//       </div>
//       <div
//         style={2 === claimableDay && !hasClaimed && !initialLoad ? activeCardStyle : cardStyle}
//         onClick={() => handleClaimReward(2)}
//       >
//         <h4>Straight</h4>
//         <p>200 Coins</p>
//       </div>
//       <div
//         style={3 === claimableDay && !hasClaimed && !initialLoad ? activeCardStyle : cardStyle}
//         onClick={() => handleClaimReward(3)}
//       >
//         <h4>Day-3</h4>
//         <p>300 Coins</p>
//       </div>
//       <div
//         style={4 === claimableDay && !hasClaimed && !initialLoad ? activeCardStyle : cardStyle}
//         onClick={() => handleClaimReward(4)}
//       >
//         <h4>Day-4</h4>
//         <p>400 Coins</p>
//       </div>
//       <div
//         style={5 === claimableDay && !hasClaimed && !initialLoad ? activeCardStyle : cardStyle}
//         onClick={() => handleClaimReward(5)}
//       >
//         <h4>Day-5</h4>
//         <p>500 Coins</p>
//       </div>
//       <div
//         style={6 === claimableDay && !hasClaimed && !initialLoad ? activeCardStyle : cardStyle}
//         onClick={() => handleClaimReward(6)}
//       >
//         <h4>Day-6</h4>
//         <p>600 Coins</p>
//       </div>
//       <div
//         style={7 === claimableDay && !hasClaimed && !initialLoad ? activeCardStyle : cardStyle}
//         onClick={() => handleClaimReward(7)}
//       >
//         <h4>Day-7</h4>
//         <p>700 Coins</p>
//       </div>
//       <div
//         style={8 === claimableDay && !hasClaimed && !initialLoad ? activeCardStyle : cardStyle}
//         onClick={() => handleClaimReward(8)}
//       >
//         <h4>Day-8</h4>
//         <p>800 Coins</p>
//       </div>
//     </div>
//   );
// };

// export default Dailyreward;


////down is 5


// import React, { useState, useEffect } from "react";
// import './Dailyreward.css';

// interface DailyrewardProps {
//   balanceRef: React.MutableRefObject<{ value: number }>;
//   onRewardClaimed: () => void;
// }

// const dailyRewards = [100, 200, 300, 400, 500, 600, 700, 800];

// const Dailyreward: React.FC<DailyrewardProps> = ({ balanceRef, onRewardClaimed }) => {
//   const [currentDay, setCurrentDay] = useState<number>(1);
//   const [claimableDay, setClaimableDay] = useState<number>(1);
//   const [lastClaimTimestamp, setLastClaimTimestamp] = useState<number>(Date.now());
//   const [hasClaimed, setHasClaimed] = useState<boolean>(false);
//   const [initialLoad, setInitialLoad] = useState<boolean>(true);
//   const [claimedDays, setClaimedDays] = useState<number[]>([]);

//   useEffect(() => {
//     const storedDay = localStorage.getItem("currentDay");
//     const storedClaimableDay = localStorage.getItem("claimableDay");
//     const storedTimestamp = localStorage.getItem("lastClaimTimestamp");
//     const storedHasClaimed = localStorage.getItem("hasClaimed");
//     const storedClaimedDays = localStorage.getItem("claimedDays");

//     if (storedDay && storedTimestamp && storedClaimableDay && storedHasClaimed && storedClaimedDays) {
//       const day = parseInt(storedDay, 10);
//       const claimable = parseInt(storedClaimableDay, 10);
//       const timestamp = parseInt(storedTimestamp, 10);
//       const hasClaimed = storedHasClaimed === "true";
//       const claimedDays = JSON.parse(storedClaimedDays);

//       const currentTime = Date.now();
//       const timeDifference = currentTime - timestamp;

//       setCurrentDay(day);
//       setClaimableDay(claimable);
//       setLastClaimTimestamp(timestamp);
//       setHasClaimed(hasClaimed);
//       setClaimedDays(claimedDays);

//       if (timeDifference > 60 * 1000 && timeDifference <= 120 * 1000 && hasClaimed) { // 1 minute to 2 minutes
//         const nextClaimableDay = claimable === 8 ? 1 : claimable + 1;
//         setClaimableDay(nextClaimableDay);
//         setHasClaimed(false);
//       } else if (timeDifference > 120 * 1000) { // 2 minutes
//         setCurrentDay(1);
//         setClaimableDay(1);
//         setHasClaimed(false);
//         setClaimedDays([]);
//       }
//     }

//     setInitialLoad(false);
//   }, []);

//   useEffect(() => {
//     if (!initialLoad) {
//       localStorage.setItem("currentDay", currentDay.toString());
//       localStorage.setItem("claimableDay", claimableDay.toString());
//       localStorage.setItem("lastClaimTimestamp", lastClaimTimestamp.toString());
//       localStorage.setItem("hasClaimed", hasClaimed.toString());
//       localStorage.setItem("claimedDays", JSON.stringify(claimedDays));
//     }
//   }, [currentDay, claimableDay, lastClaimTimestamp, hasClaimed, claimedDays, initialLoad]);

//   const handleClaimReward = (day: number) => {
//     if (day !== claimableDay || hasClaimed || initialLoad) return;

//     const reward = dailyRewards[day - 1];
//     balanceRef.current.value += reward;
//     onRewardClaimed();

//     const nextDay = currentDay === 8 ? 1 : currentDay + 1;
//     setCurrentDay(nextDay);
//     const nextClaimableDay = nextDay;
//     setClaimableDay(nextClaimableDay);
//     setLastClaimTimestamp(Date.now());
//     setHasClaimed(true);
//     setClaimedDays([...claimedDays, day]);

//     if (nextDay === 1) {
//       setClaimedDays([]);
//     }
//   };

//   return (
//     <div>
//       <h2>Daily Reward</h2>
//       {dailyRewards.map((reward, index) => (
//         <div
//           key={index}
//           className={`card ${claimedDays.includes(index + 1) ? 'claimed' : (index + 1 === claimableDay && !hasClaimed && !initialLoad ? 'clickable' : 'unclickable')}`}
//           onClick={() => handleClaimReward(index + 1)}
//         >
//           <h4>Day-{index + 1}</h4>
//           <p>{reward} Coins</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Dailyreward;


//down is 6

// import React, { useState, useEffect } from "react";
// import "./Dailyreward.css"; // Import the CSS file

// interface DailyrewardProps {
//   balanceRef: React.MutableRefObject<{ value: number }>;
//   onRewardClaimed: () => void;
// }

// const dailyRewards = [100, 200, 300, 400, 500, 600, 700, 800];

// const Dailyreward: React.FC<DailyrewardProps> = ({ balanceRef, onRewardClaimed }) => {
//   const [currentDay, setCurrentDay] = useState<number>(1);
//   const [claimableDay, setClaimableDay] = useState<number>(1);
//   const [lastClaimTimestamp, setLastClaimTimestamp] = useState<number>(Date.now());
//   const [hasClaimed, setHasClaimed] = useState<boolean>(false);
//   const [initialLoad, setInitialLoad] = useState<boolean>(true);
//   const [claimedDays, setClaimedDays] = useState<boolean[]>(Array(8).fill(false));

//   useEffect(() => {
//     const storedDay = localStorage.getItem("currentDay");
//     const storedClaimableDay = localStorage.getItem("claimableDay");
//     const storedTimestamp = localStorage.getItem("lastClaimTimestamp");
//     const storedHasClaimed = localStorage.getItem("hasClaimed");
//     const storedClaimedDays = localStorage.getItem("claimedDays");

//     if (storedDay && storedTimestamp && storedClaimableDay && storedHasClaimed && storedClaimedDays) {
//       const day = parseInt(storedDay, 10);
//       const claimable = parseInt(storedClaimableDay, 10);
//       const timestamp = parseInt(storedTimestamp, 10);
//       const hasClaimed = storedHasClaimed === "true";
//       const claimed = JSON.parse(storedClaimedDays);

//       const currentTime = Date.now();
//       const timeDifference = currentTime - timestamp;

//       console.log("Stored Day:", day);
//       console.log("Stored Claimable Day:", claimable);
//       console.log("Stored Timestamp:", timestamp);
//       console.log("Current Time:", currentTime);
//       console.log("Time Difference (minutes):", timeDifference / (60 * 1000));

//       setCurrentDay(day);
//       setClaimableDay(claimable);
//       setLastClaimTimestamp(timestamp);
//       setHasClaimed(hasClaimed);
//       setClaimedDays(claimed);

//       if (timeDifference > 60 * 1000 && timeDifference <= 120 * 1000 && hasClaimed) { // 1 minute to 2 minutes
//         const nextClaimableDay = claimable === 8 ? 1 : claimable + 1;
//         setClaimableDay(nextClaimableDay);
//         setHasClaimed(false);
//         console.log(`Time difference exceeded 1 minute. Next claimable day: ${nextClaimableDay}`);
//       } else if (timeDifference > 120 * 1000) { // 2 minutes
//         setCurrentDay(1);
//         setClaimableDay(1);
//         setHasClaimed(false);
//         setClaimedDays(Array(8).fill(false));
//         console.log("Time difference exceeded 2 minutes. Reset to day 1.");
//       }
//     }

//     setInitialLoad(false);
//   }, []);

//   useEffect(() => {
//     if (!initialLoad) {
//       localStorage.setItem("currentDay", currentDay.toString());
//       localStorage.setItem("claimableDay", claimableDay.toString());
//       localStorage.setItem("lastClaimTimestamp", lastClaimTimestamp.toString());
//       localStorage.setItem("hasClaimed", hasClaimed.toString());
//       localStorage.setItem("claimedDays", JSON.stringify(claimedDays));
//       console.log("Updated Current Day:", currentDay);
//       console.log("Updated Claimable Day:", claimableDay);
//       console.log("Updated Last Claim Timestamp:", lastClaimTimestamp);
//       console.log("Updated Has Claimed:", hasClaimed);
//     }
//   }, [currentDay, claimableDay, lastClaimTimestamp, hasClaimed, claimedDays, initialLoad]);

//   const handleClaimReward = (day: number) => {
//     if (day !== claimableDay || hasClaimed || initialLoad) return;

//     const reward = dailyRewards[day - 1];
//     balanceRef.current.value += reward;
//     onRewardClaimed();

//     const nextDay = currentDay === 8 ? 1 : currentDay + 1;
//     const nextClaimableDay = nextDay;

//     setCurrentDay(nextDay);
//     setClaimableDay(nextClaimableDay);
//     setLastClaimTimestamp(Date.now());
//     setHasClaimed(true);

//     const updatedClaimedDays = [...claimedDays];
//     updatedClaimedDays[day - 1] = true;

//     if (day === 8) {
//       setClaimedDays(Array(8).fill(false));
//       setCurrentDay(1);
//       setClaimableDay(1);
//       console.log("Completed day 8, resetting to day 1.");
//     } else {
//       setClaimedDays(updatedClaimedDays);
//     }

//     console.log(`Reward for Day ${day} claimed: ${reward} coins`);
//     console.log("Next Current Day:", nextDay);
//     console.log("Next Claimable Day:", nextClaimableDay);
//   };

//   return (
//     <div>
//       <h2>Daily Reward</h2>
//       <div className="daily-reward-container">
//         {dailyRewards.map((reward, index) => (
//           <div
//             key={index}
//             className={
//               claimedDays[index]
//                 ? "card claimed"
//                 : index + 1 === claimableDay && !hasClaimed && !initialLoad
//                 ? "card active"
//                 : "card"
//             }
//             onClick={() => handleClaimReward(index + 1)}
//           >
//             <h4>Day-{index + 1}</h4>
//             <p>{reward} Coins</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Dailyreward;

//6
import React, { useState, useEffect } from "react";
import "./Dailyreward.css";

interface DailyrewardProps {
  balanceRef: React.MutableRefObject<{ value: number }>;
  onRewardClaimed: () => void;
}

const dailyRewards = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

const Dailyreward: React.FC<DailyrewardProps> = ({ balanceRef, onRewardClaimed }) => {
  const [currentDay, setCurrentDay] = useState<number>(1);
  const [claimableDay, setClaimableDay] = useState<number>(1);
  const [lastClaimTimestamp, setLastClaimTimestamp] = useState<number>(Date.now());
  const [hasClaimed, setHasClaimed] = useState<boolean>(false);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);
  const [claimedDays, setClaimedDays] = useState<boolean[]>(Array(10).fill(false));

  useEffect(() => {
    const storedDay = localStorage.getItem("currentDay");
    const storedClaimableDay = localStorage.getItem("claimableDay");
    const storedTimestamp = localStorage.getItem("lastClaimTimestamp");
    const storedHasClaimed = localStorage.getItem("hasClaimed");
    const storedClaimedDays = localStorage.getItem("claimedDays");

    if (storedDay && storedTimestamp && storedClaimableDay && storedHasClaimed && storedClaimedDays) {
      const day = parseInt(storedDay, 10);
      const claimable = parseInt(storedClaimableDay, 10);
      const timestamp = parseInt(storedTimestamp, 10);
      const hasClaimed = storedHasClaimed === "true";
      const claimed = JSON.parse(storedClaimedDays);

      const currentTime = Date.now();
      const timeDifference = currentTime - timestamp;

      console.log("Stored Day:", day);
      console.log("Stored Claimable Day:", claimable);
      console.log("Stored Timestamp:", timestamp);
      console.log("Current Time:", currentTime);
      console.log("Time Difference (minutes):", timeDifference / (60 * 1000));

      setCurrentDay(day);
      setClaimableDay(claimable);
      setLastClaimTimestamp(timestamp);
      setHasClaimed(hasClaimed);
      setClaimedDays(claimed);

      if (timeDifference > 60 * 1000 && timeDifference <= 120 * 1000 && hasClaimed) { // 1 minute to 2 minutes
        const nextClaimableDay = claimable === 10 ? 1 : claimable + 1;
        setClaimableDay(nextClaimableDay);
        setHasClaimed(false);
        console.log(`Time difference exceeded 1 minute. Next claimable day: ${nextClaimableDay}`);
      } else if (timeDifference > 120 * 1000) { // 2 minutes
        setCurrentDay(1);
        setClaimableDay(1);
        setHasClaimed(false);
        setClaimedDays(Array(10).fill(false));
        console.log("Time difference exceeded 2 minutes. Reset to day 1.");
      }
    }

    setInitialLoad(false);
  }, []);

  useEffect(() => {
    if (!initialLoad) {
      localStorage.setItem("currentDay", currentDay.toString());
      localStorage.setItem("claimableDay", claimableDay.toString());
      localStorage.setItem("lastClaimTimestamp", lastClaimTimestamp.toString());
      localStorage.setItem("hasClaimed", hasClaimed.toString());
      localStorage.setItem("claimedDays", JSON.stringify(claimedDays));
      console.log("Updated Current Day:", currentDay);
      console.log("Updated Claimable Day:", claimableDay);
      console.log("Updated Last Claim Timestamp:", lastClaimTimestamp);
      console.log("Updated Has Claimed:", hasClaimed);
    }
  }, [currentDay, claimableDay, lastClaimTimestamp, hasClaimed, claimedDays, initialLoad]);

  const handleClaimReward = (day: number) => {
    if (day !== claimableDay || hasClaimed || initialLoad) return;

    const reward = dailyRewards[day - 1];
    balanceRef.current.value += reward;
    onRewardClaimed();

    const nextDay = currentDay === 10 ? 1 : currentDay + 1;
    const nextClaimableDay = nextDay;

    setCurrentDay(nextDay);
    setClaimableDay(nextClaimableDay);
    setLastClaimTimestamp(Date.now());
    setHasClaimed(true);

    const updatedClaimedDays = [...claimedDays];
    updatedClaimedDays[day - 1] = true;

    if (day === 10) {
      setClaimedDays(Array(10).fill(false));
      setCurrentDay(1);
      setClaimableDay(1);
      console.log("Completed day 10, resetting to day 1.");
    } else {
      setClaimedDays(updatedClaimedDays);
    }

    console.log(`Reward for Day ${day} claimed: ${reward} coins`);
    console.log("Next Current Day:", nextDay);
    console.log("Next Claimable Day:", nextClaimableDay);
  };

  return (
    <div>
      <h2>Daily Reward</h2>
      <div className="daily-reward-container">
        <div
          className={`card ${claimedDays[0] ? "claimed" : claimableDay === 1 && !hasClaimed && !initialLoad ? "active" : ""}`}
          onClick={() => handleClaimReward(1)}
        >
          <h4>Day-1</h4>
          <p>100 Coins</p>
        </div>
        <div
          className={`card ${claimedDays[2] ? "claimed" : claimableDay === 3 && !hasClaimed && !initialLoad ? "active" : ""}`}
          onClick={() => handleClaimReward(3)}
        >
          <h4>Day-2</h4>
          <p>300 Coins</p>
        </div>
        <div
          className={`card ${claimedDays[3] ? "claimed" : claimableDay === 4 && !hasClaimed && !initialLoad ? "active" : ""}`}
          onClick={() => handleClaimReward(4)}
        >
          <h4>Day-3</h4>
          <p>400 Coins</p>
        </div>
        <div
          className={`card ${claimedDays[4] ? "claimed" : claimableDay === 5 && !hasClaimed && !initialLoad ? "active" : ""}`}
          onClick={() => handleClaimReward(5)}
        >
          <h4>Day-4</h4>
          <p>500 Coins</p>
        </div>
        <div
          className={`card ${claimedDays[5] ? "claimed" : claimableDay === 6 && !hasClaimed && !initialLoad ? "active" : ""}`}
          onClick={() => handleClaimReward(6)}
        >
          <h4>Day-5</h4>
          <p>600 Coins</p>
        </div>
        <div
          className={`card ${claimedDays[6] ? "claimed" : claimableDay === 7 && !hasClaimed && !initialLoad ? "active" : ""}`}
          onClick={() => handleClaimReward(7)}
        >
          <h4>Day-6</h4>
          <p>700 Coins</p>
        </div>
        <div
          className={`card ${claimedDays[7] ? "claimed" : claimableDay === 8 && !hasClaimed && !initialLoad ? "active" : ""}`}
          onClick={() => handleClaimReward(8)}
        >
          <h4>Day-7</h4>
          <p>800 Coins</p>
        </div>
        <div
          className={`card ${claimedDays[8] ? "claimed" : claimableDay === 9 && !hasClaimed && !initialLoad ? "active" : ""}`}
          onClick={() => handleClaimReward(9)}
        >
          <h4>Day-8</h4>
          <p>900 Coins</p>
        </div>
        <div
          className={`card ${claimedDays[9] ? "claimed" : claimableDay === 10 && !hasClaimed && !initialLoad ? "active" : ""}`}
          onClick={() => handleClaimReward(10)}
        >
          <h4>Day-9</h4>
          <p>1000 Coins</p>
        </div>
        <div
          className={`card ${claimedDays[1] ? "claimed" : claimableDay === 2 && !hasClaimed && !initialLoad ? "active" : ""}`}
          onClick={() => handleClaimReward(2)}
        >
          <h4>Random Bonus</h4>
          <p>200 Coins</p>
        </div>
      </div>
    </div>
  );
};

export default Dailyreward;
