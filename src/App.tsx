import React, { useRef, useEffect, useReducer, useState } from "react";
import "./App.css";
//for ts
import UpgradeState from "./classes/upgradeState";
import UpgradeEnergy from "./classes/upgradeEnergy";
//
import UpgradeButton from "./components/upgradeButton";
import RefUpgradeButton from "./components/refUpgradebutton"
import { ClickHandler } from "./components/clickHandler";
import { DisplayStats } from "./components/displayStats";
import { SaveGame } from "./components/saveGame";
//for booster
import UpgradeClick from "./components/click/upgradeClick";
import EnergyFill from "./components/click/energRefill";
import UpgradePool from "./components/click/poolUpgrade";
//for Task
import Task from "./components/OtherDiv/task";
import Dailyreward from "./components/OtherDiv/dailyreward"
//for Ref
import Refer from "./components/OtherDiv/ref";
//fire base
import { sendUserDataToFirebase,updateUserAutoIncrementInFirebase} from './firebaseFunctions';

export function App() {
  const balanceRef = useRef({ value: 0 });
  const forceUpdate = useReducer(x => x + 1, 0)[1];

  const [energy, setEnergy] = useState(100);
  const [maxEnergy, setMaxEnergy] = useState(100);
  const [refillRate, setRefillRate] = useState(1);
  const [lastUpdated, setLastUpdated] = useState(Date.now());
   //user
  const [userId, setUserId] = useState<string | null>(null);

  const [isInitialLoad, setIsInitialLoad] = useState(true); // Flag to check if initial load is done

  // Load state from localStorage on mount For energy and autoincrement on window close
  useEffect(() => {
    const storedEnergy = localStorage.getItem('energy');
    const storedMaxEnergy = localStorage.getItem('maxEnergy');
    const storedRefillRate = localStorage.getItem('refillRate');
    const storedLastUpdated = localStorage.getItem('lastUpdated');
//down is for autoincrement
 const storedBalance = localStorage.getItem('balance');
 const storedAutoIncrement = localStorage.getItem('autoIncrement');

    if (storedEnergy && storedMaxEnergy && storedRefillRate && storedLastUpdated && storedBalance && storedAutoIncrement) {
      const timePassed = (Date.now() - parseInt(storedLastUpdated, 10)) / 1000; // time in seconds
      console.log("timePassed (seconds):", timePassed);

      const storedRefillRateNum = parseInt(storedRefillRate, 10);
      const calculatedEnergy = Math.min(parseInt(storedEnergy, 10) + Math.floor(timePassed * storedRefillRateNum), parseInt(storedMaxEnergy, 10));
      
      console.log("calculatedEnergy:", calculatedEnergy);

      setEnergy(calculatedEnergy);
      setMaxEnergy(parseInt(storedMaxEnergy, 10));
      setRefillRate(storedRefillRateNum);
      setLastUpdated(Date.now());

//dowm is for autoincrement time on offline
    const storedAutoIncrementNum = parseFloat(storedAutoIncrement);
     const calculatedBalance = parseFloat(storedBalance) + Math.min(storedAutoIncrementNum * timePassed, storedAutoIncrementNum * 7200);
     balanceRef.current.value = Math.round(calculatedBalance * 100) / 100;
    }
    setIsInitialLoad(false); // Set initial load flag to false after loading from localStorage
  }, []);

  // Save state to localStorage only after the initial load is complete
  useEffect(() => {
    if (!isInitialLoad) {
      localStorage.setItem('energy', energy.toString());
      localStorage.setItem('maxEnergy', maxEnergy.toString());
      localStorage.setItem('refillRate', refillRate.toString());
      localStorage.setItem('lastUpdated', lastUpdated.toString());
 //down is auto increment
      localStorage.setItem('balance', balanceRef.current.value.toString());
      localStorage.setItem('autoIncrement', autoIncrement.toString());

    }
  }, [energy, maxEnergy, refillRate, lastUpdated, isInitialLoad]);
  useEffect(() => {
    // Initialize the Telegram Web App SDK
    const initTelegram = () => {
      const tg = window.Telegram.WebApp;
      tg.ready();
      // Debug logging
      console.log('Telegram Web App SDK initialized');
      console.log('tg.initDataUnsafe:', tg.initDataUnsafe);

      const user = tg.initDataUnsafe?.user;

      if (user) {
        const id = user.id.toString();
        setUserId(user.id.toString());
        sendUserDataToFirebase(id, autoIncrement);
      }
    };

    if (window.Telegram) {
      console.log('Telegram SDK is already loaded');
      initTelegram();
    } else {
      console.log('Waiting for Telegram SDK to be ready');
      window.addEventListener('TelegramWebAppReady', initTelegram);
    }

    return () => {
      window.removeEventListener('TelegramWebAppReady', initTelegram);
    };
  }, []);

  
//up is user

  const upgradeMap = useRef(new Map<string, UpgradeState>([
    ['clickUpgrade', new UpgradeState(15, 1.1, 1, 1)],
    ['autoClicker01', new UpgradeState(80, 1.15, 0, 1)],
    ['autoClicker02', new UpgradeState(200, 1.15, 0, 3)],
    ['autoClicker03', new UpgradeState(1100, 1.15, 0, 8)],
    ['autoClicker04', new UpgradeState(12000, 1.15, 0, 45)],
    ['autoClicker05', new UpgradeState(130000, 1.15, 0, 250)],
    ['autoClicker06', new UpgradeState(1400000, 1.15, 0, 1380)],
    ['autoClicker07', new UpgradeState(15, 1.15, 0 , 7600)],
    ['refClicker01', new UpgradeState(15, 1.15, 0 , 1)],
    ['refClicker02', new UpgradeState(35, 1.15, 0 , 2)],
  ]));

  const upgradeEnergyMap = useRef(new Map<string, UpgradeEnergy>([
    ['energyPool', new UpgradeEnergy(40, 1.4, 50,0)],
    ['energyfill', new UpgradeEnergy(70, 2,0, 1)],
  ]));

  let autoIncrement: number = Math.round(
    ( upgradeMap.current.get('autoClicker01')!.increment +
      upgradeMap.current.get('autoClicker02')!.increment +
      upgradeMap.current.get('autoClicker03')!.increment +
      upgradeMap.current.get('autoClicker04')!.increment +
      upgradeMap.current.get('autoClicker05')!.increment +
      upgradeMap.current.get('autoClicker06')!.increment +
      upgradeMap.current.get('autoClicker07')!.increment +
      upgradeMap.current.get('refClicker01')!.increment +
      upgradeMap.current.get('refClicker02')!.increment
    ) * 100) / 100;

    //database
    useEffect(() => {
      if (userId !== null) {
        updateUserAutoIncrementInFirebase(userId, autoIncrement);
      }
    }, [autoIncrement]);
//databse

  useEffect(() => {
    const interval = setInterval(() => {
      balanceRef.current.value = Math.round((balanceRef.current.value + (autoIncrement / 10)) * 100) / 100;
      forceUpdate();
    }, 100);

    return () => clearInterval(interval);
  });

  useEffect(() => {
    const refillInterval = setInterval(() => {
      setEnergy((prevEnergy) => {
        const newEnergy = Math.min(prevEnergy + refillRate, maxEnergy);
        setLastUpdated(Date.now());
        return newEnergy;
      });
    }, 1000);

    return () => clearInterval(refillInterval);
  }, [refillRate, maxEnergy]);

  const upgradeInvocationHandler = (
    id: string,
    upgradeMap: React.MutableRefObject<Map<string, UpgradeState>>,
    upgradeEnergyMap: React.MutableRefObject<Map<string, UpgradeEnergy>>,
    balanceRef: React.MutableRefObject<{ value: number }>,
    setMaxEnergy: React.Dispatch<React.SetStateAction<number>>,
    setRefillRate: React.Dispatch<React.SetStateAction<number>>,
  ): void => {
    if (upgradeMap.current.has(id)) {
      const cost = upgradeMap.current.get(id)!.currentCost;
      if (upgradeMap.current.get(id)!.upgrade(balanceRef.current.value)) {
        console.log(`Upgraded ${id} component.`);
        balanceRef.current.value = Math.round((balanceRef.current.value - cost) * 100) / 100;
      } else {
        console.log(`Balance is too low to upgrade ${id} component.`);
      }
    } else if (upgradeEnergyMap.current.has(id)) {
      const cost = upgradeEnergyMap.current.get(id)!.currentCost;
      if (upgradeEnergyMap.current.get(id)!.upgrade(balanceRef.current.value)) {
        console.log(`Upgraded ${id} energy component.`);
        balanceRef.current.value = Math.round((balanceRef.current.value - cost) * 100) / 100;
        // Handle changes to energy attributes
        if (id === 'energyPool') {
          const newMaxEnergy = upgradeEnergyMap.current.get(id)!.maxEnergyIncrement;
          setMaxEnergy((prevMaxEnergy) => prevMaxEnergy + newMaxEnergy);
          console.log("energy pool+");
        } else if (id === 'energyfill') {
          const newRefillRate = upgradeEnergyMap.current.get(id)!.energyRefillIncrement;
          setRefillRate((prevRefillRate) => prevRefillRate + newRefillRate);
        console.log("energy +");
        }
      } else {
        console.log(`Balance is too low to upgrade ${id} energy component.`);
      }
    }
  }

  const handleRewardClaimed = () => {
    forceUpdate(); // Force an update to reflect the new balance
  };

  return (
    <>
      <div className="overlay">
        <div className="container-fluid">
          <div className="row">
            {/*1r-1c first row first col */}
            <div className="col-md col-lg-5">
              <ClickHandler
                balanceRef={balanceRef}
                increment={upgradeMap.current.get('clickUpgrade')!.increment}
                energy={energy}
                maxEnergy={maxEnergy}
                setEnergy={setEnergy}
              />
              <DisplayStats 
                balanceRef={balanceRef}
                clickIncrement={upgradeMap.current.get('clickUpgrade')!.increment}
                autoIncrement={autoIncrement}
                refillRate={refillRate}
              />
            {userId && <SaveGame
  balanceRef={balanceRef}
  upgradeMap={upgradeMap}
  upgradeEnergyMap={upgradeEnergyMap}
  userId={userId} 
 />}

            </div>
            {/* 1r first row */}
            <div className="col-md-12 col-lg-7">
              <h1>Upgrades</h1>
              <div className="row">
                <div className="center col-6 col-sm-6 col-md-6 col-lg-6">
                  <UpgradeButton
                    id="autoClicker01"
                    name="Intern"                  
                    level={upgradeMap.current.get('autoClicker01')!.level}
                    cost={upgradeMap.current.get('autoClicker01')!.currentCost}
                    increment={upgradeMap.current.get('autoClicker01')!.incrementAdd}
                    balance={balanceRef.current.value}
                    autoIncrementTotal={autoIncrement}
                    clickHandler={(id) => { upgradeInvocationHandler(id, upgradeMap, upgradeEnergyMap, balanceRef, setMaxEnergy, setRefillRate); }}
                  /> 
                  <UpgradeButton
                    id="autoClicker03"
                    name="Senior developer"
                    level={upgradeMap.current.get('autoClicker03')!.level}
                    cost={upgradeMap.current.get('autoClicker03')!.currentCost}
                    increment={upgradeMap.current.get('autoClicker03')!.incrementAdd}
                    balance={balanceRef.current.value}
                    autoIncrementTotal={autoIncrement}
                    clickHandler={(id) => { upgradeInvocationHandler(id, upgradeMap, upgradeEnergyMap, balanceRef, setMaxEnergy, setRefillRate); }}
                  /> 
                  <UpgradeButton
                    id="autoClicker05"
                    name="Chief Manager"
                    level={upgradeMap.current.get('autoClicker05')!.level}
                    cost={upgradeMap.current.get('autoClicker05')!.currentCost}
                    increment={upgradeMap.current.get('autoClicker05')!.incrementAdd}
                   
                    balance={balanceRef.current.value}
                    autoIncrementTotal={autoIncrement}
                    clickHandler={(id) => { upgradeInvocationHandler(id, upgradeMap, upgradeEnergyMap, balanceRef, setMaxEnergy, setRefillRate); }}
                  />
                  <UpgradeButton
                    id="autoClicker07"
                    name="C.E.O"
                    level={upgradeMap.current.get('autoClicker07')!.level}
                    cost={upgradeMap.current.get('autoClicker07')!.currentCost}
                    increment={upgradeMap.current.get('autoClicker07')!.incrementAdd}
                    balance={balanceRef.current.value}
                    autoIncrementTotal={autoIncrement}
                    clickHandler={(id) => { upgradeInvocationHandler(id, upgradeMap, upgradeEnergyMap, balanceRef, setMaxEnergy, setRefillRate); }}
                  />
                </div>
                <div className="center col-6 col-sm-6 col-md-6 col-lg-6">
                  <UpgradeButton 
                    id="autoClicker02"
                    name="Junior developer"
                    level={upgradeMap.current.get('autoClicker02')!.level}
                    cost={upgradeMap.current.get('autoClicker02')!.currentCost}
                    increment={upgradeMap.current.get('autoClicker02')!.incrementAdd}
                    balance={balanceRef.current.value}
                    autoIncrementTotal={autoIncrement}
                    clickHandler={(id) => { upgradeInvocationHandler(id, upgradeMap, upgradeEnergyMap, balanceRef, setMaxEnergy, setRefillRate); }}
                  /> 
                  <UpgradeButton
                    id="autoClicker04"
                    name="Manager"
                    level={upgradeMap.current.get('autoClicker04')!.level}
                    cost={upgradeMap.current.get('autoClicker04')!.currentCost}
                    increment={upgradeMap.current.get('autoClicker04')!.incrementAdd}
                    balance={balanceRef.current.value}
                    autoIncrementTotal={autoIncrement}
                    clickHandler={(id) => { upgradeInvocationHandler(id, upgradeMap, upgradeEnergyMap, balanceRef, setMaxEnergy, setRefillRate); }}
                  />
                  <UpgradeButton
                    id="autoClicker06"
                    name="Director"
                    level={upgradeMap.current.get('autoClicker06')!.level}
                    cost={upgradeMap.current.get('autoClicker06')!.currentCost}
                    increment={upgradeMap.current.get('autoClicker06')!.incrementAdd}
                    balance={balanceRef.current.value}
                    autoIncrementTotal={autoIncrement}
                    clickHandler={(id) => { upgradeInvocationHandler(id, upgradeMap, upgradeEnergyMap, balanceRef, setMaxEnergy, setRefillRate); }}
                  />
                  <RefUpgradeButton
                    id="refClicker01"
                    name="REfer01"
                    refshow={1}
                    level={upgradeMap.current.get('refClicker01')!.level}
                    cost={upgradeMap.current.get('refClicker01')!.currentCost}
                    increment={upgradeMap.current.get('refClicker01')!.incrementAdd}
                    balance={balanceRef.current.value}
                    autoIncrementTotal={autoIncrement}
                    userId={userId}
                    clickHandler={(id) => { upgradeInvocationHandler(id, upgradeMap, upgradeEnergyMap, balanceRef, setMaxEnergy, setRefillRate); }}
                    />
                     <RefUpgradeButton
                    id="refClicker02"
                    name="REfer02"
                    refshow={2}
                    level={upgradeMap.current.get('refClicker02')!.level}
                    cost={upgradeMap.current.get('refClicker02')!.currentCost}
                    increment={upgradeMap.current.get('refClicker02')!.incrementAdd}
                    balance={balanceRef.current.value}
                    autoIncrementTotal={autoIncrement}
                    userId={userId}
                    clickHandler={(id) => { upgradeInvocationHandler(id, upgradeMap, upgradeEnergyMap, balanceRef, setMaxEnergy, setRefillRate); }}
                    />
                </div>         
              </div>
            </div>
          </div>
          {/*2r second row for Booster */}
          <div className="booster row">
            <h2>Booster</h2>
            <div className="col-sm-6 col-md-6 col-lg-4">
              <UpgradeClick
                id="clickUpgrade"
                name="Tab Booster"
                level={upgradeMap.current.get('clickUpgrade')!.level}
                cost={upgradeMap.current.get('clickUpgrade')!.currentCost}
                increment={upgradeMap.current.get('clickUpgrade')!.incrementAdd}
                balance={balanceRef.current.value}
                autoIncrementTotal={autoIncrement}
                clickHandler={(id) => { upgradeInvocationHandler(id, upgradeMap, upgradeEnergyMap, balanceRef, setMaxEnergy, setRefillRate); }}
              /> 
            </div>
            <div className="col-sm-6 col-md-6 col-lg-4">
            <EnergyFill
                id="energyfill"
                name="Energy Refill"
              
                level={upgradeEnergyMap.current.get('energyfill')!.level}
                cost={upgradeEnergyMap.current.get('energyfill')!.currentCost}
                increment={upgradeEnergyMap.current.get('energyfill')!.energyRefillIncrement}
                balance={balanceRef.current.value}
                autoIncrementTotal={autoIncrement}
                clickHandler={(id) => { upgradeInvocationHandler(id, upgradeMap, upgradeEnergyMap, balanceRef, setMaxEnergy, setRefillRate); }}
              /> 
            </div>
            <div className="col-sm-6 col-md-6 col-lg-4">
            <UpgradePool
              id="energyPool"
              name="Energy Pool"
              level={upgradeEnergyMap.current.get('energyPool')!.level}
              cost={upgradeEnergyMap.current.get('energyPool')!.currentCost}
              increment={upgradeEnergyMap.current.get('energyPool')!.maxEnergyIncrement}
              balance={balanceRef.current.value}
              autoIncrementTotal={autoIncrement}
              clickHandler={(id) => { upgradeInvocationHandler(id, upgradeMap, upgradeEnergyMap, balanceRef, setMaxEnergy, setRefillRate); }}
            />
            </div>
          </div>
          {/* 3r third row for Task*/}
          <div className=" Task row">
            <h2>Follow Our Social And Get More Coin </h2>
            <div className="col-sm col-md-6 col-lg-4">
              <Task
                name="Follow on Telegram"
                reward={500}
                show="500"
                link="https://telegram.me"
                balanceRef={balanceRef}
                onRewardClaimed={handleRewardClaimed}
              />
            </div>
            <div className="col-sm col-md-6 col-lg-4">
              <Task
                name="Follow on X"
                reward={300}
                show="300"
                link="https://telegram.me"
                balanceRef={balanceRef}
                onRewardClaimed={handleRewardClaimed}
              />
            </div>
            <div className="col-sm col-md-6 col-lg-4">
              <Task
                name="Follow on U-tube"
                reward={300}
                show="300"
                link="https://telegram.me"
                balanceRef={balanceRef}
                onRewardClaimed={handleRewardClaimed}
              />
            </div>
          </div>
          <div className="dailyreward">
              <Dailyreward
                balanceRef={balanceRef}
                onRewardClaimed={handleRewardClaimed}
              />
          </div>
          {/* 4th row for Ref */}
          <div className="Ref_box">
            {userId && <Refer userId={userId} balanceRef={balanceRef} onRewardClaimed={handleRewardClaimed}/>}
          </div>
          {/*down are overlay and container  */}
        </div>
      </div>
    </>
  )
}


//
//
// import React, { useRef, useEffect, useReducer, useState } from "react";
// import "./App.css";
// // for ts
// import UpgradeState from "./classes/upgradeState";
// import UpgradeEnergy from "./classes/upgradeEnergy";
// //
// import UpgradeButton from "./components/upgradeButton";
// import RefUpgradeButton from "./components/refUpgradebutton";
// import { ClickHandler } from "./components/clickHandler";
// import { DisplayStats } from "./components/displayStats";
// import { SaveGame } from "./components/saveGame";
// // for booster
// import UpgradeClick from "./components/click/upgradeClick";
// import EnergyFill from "./components/click/energRefill";
// import UpgradePool from "./components/click/poolUpgrade";
// // for Task
// import Task from "./components/OtherDiv/task";
// import Dailyreward from "./components/OtherDiv/dailyreward";
// // for Ref
// import Refer from "./components/OtherDiv/ref";
// // firebase
// import { sendUserDataToFirebase, updateUserAutoIncrementInFirebase, loadUserDataFromFirebase, saveUserDataToFirebase } from './firebaseFunctions';

// export function App() {
//   const balanceRef = useRef({ value: 0 });
//   const forceUpdate = useReducer(x => x + 1, 0)[1];

//   const [energy, setEnergy] = useState(100);
//   const [maxEnergy, setMaxEnergy] = useState(100);
//   const [refillRate, setRefillRate] = useState(1);
//   const [lastUpdated, setLastUpdated] = useState(Date.now());
//   // user
//   const [userId, setUserId] = useState<string | null>(null);

//   const [isInitialLoad, setIsInitialLoad] = useState(true); // Flag to check if initial load is done

//   useEffect(() => {
//     const storedEnergy = localStorage.getItem('energy');
//     const storedMaxEnergy = localStorage.getItem('maxEnergy');
//     const storedRefillRate = localStorage.getItem('refillRate');
//     const storedLastUpdated = localStorage.getItem('lastUpdated');
//     // down is for auto increment
//     const storedBalance = localStorage.getItem('balance');
//     const storedAutoIncrement = localStorage.getItem('autoIncrement');

//     if (storedEnergy && storedMaxEnergy && storedRefillRate && storedLastUpdated && storedBalance && storedAutoIncrement) {
//       const timePassed = (Date.now() - parseInt(storedLastUpdated, 10)) / 1000; // time in seconds
//       console.log("timePassed (seconds):", timePassed);

//       const storedRefillRateNum = parseInt(storedRefillRate, 10);
//       const calculatedEnergy = Math.min(parseInt(storedEnergy, 10) + Math.floor(timePassed * storedRefillRateNum), parseInt(storedMaxEnergy, 10));

//       console.log("calculatedEnergy:", calculatedEnergy);

//       setEnergy(calculatedEnergy);
//       setMaxEnergy(parseInt(storedMaxEnergy, 10));
//       setRefillRate(storedRefillRateNum);
//       setLastUpdated(Date.now());

//       // down is for auto increment time on offline
//       const storedAutoIncrementNum = parseFloat(storedAutoIncrement);
//       const calculatedBalance = parseFloat(storedBalance) + Math.min(storedAutoIncrementNum * timePassed, storedAutoIncrementNum * 7200);
//       balanceRef.current.value = Math.round(calculatedBalance * 100) / 100;
//     }
//     setIsInitialLoad(false); // Set initial load flag to false after loading from localStorage
//   }, []);

//   useEffect(() => {
//     if (!isInitialLoad) {
//       localStorage.setItem('energy', energy.toString());
//       localStorage.setItem('maxEnergy', maxEnergy.toString());
//       localStorage.setItem('refillRate', refillRate.toString());
//       localStorage.setItem('lastUpdated', lastUpdated.toString());
//       // down is auto increment
//       localStorage.setItem('balance', balanceRef.current.value.toString());
//       localStorage.setItem('autoIncrement', autoIncrement.toString());

//       if (userId) {
//         saveUserDataToFirebase(userId, { energy, maxEnergy, refillRate, lastUpdated, balance: balanceRef.current.value, autoIncrement });
//       }
//     }
//   }, [energy, maxEnergy, refillRate, lastUpdated, isInitialLoad, userId]);

//   useEffect(() => {
//     // Initialize the Telegram Web App SDK
//     const initTelegram = () => {
//       const tg = window.Telegram.WebApp;
//       tg.ready();
//       // Debug logging
//       console.log('Telegram Web App SDK initialized');
//       console.log('tg.initDataUnsafe:', tg.initDataUnsafe);

//       const user = tg.initDataUnsafe?.user;

//       if (user) {
//         const id = user.id.toString();
//         setUserId(id);
//         loadUserDataFromFirebase(id).then(data => {
//           if (data) {
//             setEnergy(data.energy);
//             setMaxEnergy(data.maxEnergy);
//             setRefillRate(data.refillRate);
//             setLastUpdated(data.lastUpdated);
//             balanceRef.current.value = data.balance;
//             autoIncrement = data.autoIncrement;
//           }
//         });
//       }
//     };

//     if (window.Telegram) {
//       console.log('Telegram SDK is already loaded');
//       initTelegram();
//     } else {
//       console.log('Waiting for Telegram SDK to be ready');
//       window.addEventListener('TelegramWebAppReady', initTelegram);
//     }

//     return () => {
//       window.removeEventListener('TelegramWebAppReady', initTelegram);
//     };
//   }, []);

//   const upgradeMap = useRef(new Map<string, UpgradeState>([
//     ['clickUpgrade', new UpgradeState(15, 1.1, 1, 1)],
//     ['autoClicker01', new UpgradeState(80, 1.15, 0, 1)],
//     ['autoClicker02', new UpgradeState(200, 1.15, 0, 3)],
//     ['autoClicker03', new UpgradeState(1100, 1.15, 0, 8)],
//     ['autoClicker04', new UpgradeState(12000, 1.15, 0, 45)],
//     ['autoClicker05', new UpgradeState(130000, 1.15, 0, 250)],
//     ['autoClicker06', new UpgradeState(1400000, 1.15, 0, 1380)],
//     ['autoClicker07', new UpgradeState(15, 1.15, 0, 7600)],
//     ['refClicker01', new UpgradeState(15, 1.15, 0, 1)],
//     ['refClicker02', new UpgradeState(35, 1.15, 0, 2)],
//   ]));

//   const upgradeEnergyMap = useRef(new Map<string, UpgradeEnergy>([
//     ['energyPool', new UpgradeEnergy(40, 1.4, 50, 0)],
//     ['energyfill', new UpgradeEnergy(70, 2, 0, 1)],
//   ]));

//   let autoIncrement: number = Math.round(
//     (upgradeMap.current.get('autoClicker01')!.increment +
//       upgradeMap.current.get('autoClicker02')!.increment +
//       upgradeMap.current.get('autoClicker03')!.increment +
//       upgradeMap.current.get('autoClicker04')!.increment +
//       upgradeMap.current.get('autoClicker05')!.increment +
//       upgradeMap.current.get('autoClicker06')!.increment +
//       upgradeMap.current.get('autoClicker07')!.increment +
//       upgradeMap.current.get('refClicker01')!.increment +
//       upgradeMap.current.get('refClicker02')!.increment) * 100) / 100;

//   useEffect(() => {
//     if (userId !== null) {
//       updateUserAutoIncrementInFirebase(userId, autoIncrement);
//     }
//   }, [autoIncrement, userId]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       balanceRef.current.value = Math.round((balanceRef.current.value + (autoIncrement / 10)) * 100) / 100;
//       forceUpdate();
//     }, 100);

//     return () => clearInterval(interval);
//   });

//   useEffect(() => {
//     const refillInterval = setInterval(() => {
//       setEnergy((prevEnergy) => {
//         const newEnergy = Math.min(prevEnergy + refillRate, maxEnergy);
//         setLastUpdated(Date.now());
//         return newEnergy;
//       });
//     }, 1000);

//     return () => clearInterval(refillInterval);
//   }, [refillRate, maxEnergy]);

//   const upgradeInvocationHandler = (
//     id: string,
//     upgradeMap: React.MutableRefObject<Map<string, UpgradeState>>,
//     upgradeEnergyMap: React.MutableRefObject<Map<string, UpgradeEnergy>>,
//     balanceRef: React.MutableRefObject<{ value: number }>,
//     setMaxEnergy: React.Dispatch<React.SetStateAction<number>>,
//     setRefillRate: React.Dispatch<React.SetStateAction<number>>,
//   ): void => {
//     if (upgradeMap.current.has(id)) {
//       const cost = upgradeMap.current.get(id)!.currentCost;
//       if (upgradeMap.current.get(id)!.upgrade(balanceRef.current.value)) {
//         console.log(`Upgraded ${id} component.`);
//         balanceRef.current.value = Math.round((balanceRef.current.value - cost) * 100) / 100;
//         forceUpdate();
//       } else {
//         console.log(`Unable to upgrade ${id} component.`);
//       }
//     } else if (upgradeEnergyMap.current.has(id)) {
//       const cost = upgradeEnergyMap.current.get(id)!.currentCost;
//       if (upgradeEnergyMap.current.get(id)!.upgrade(balanceRef.current.value)) {
//         console.log(`Upgraded ${id} energy component.`);
//         balanceRef.current.value = Math.round((balanceRef.current.value - cost) * 100) / 100;
//         if (id === 'energyPool') {
//           setMaxEnergy((prevMaxEnergy) => prevMaxEnergy + upgradeEnergyMap.current.get(id)!.maxEnergyIncrement);
//         } else if (id === 'energyfill') {
//           setRefillRate((prevRefillRate) => prevRefillRate + upgradeEnergyMap.current.get(id)!.energyRefillIncrement);
//         }
//         forceUpdate();
//       } else {
//         console.log(`Unable to upgrade ${id} energy component.`);
//       }
//     }}
//     const handleRewardClaimed = () => {
//     forceUpdate(); // Force an update to reflect the new balance
//   };return (
//         <>
//           <div className="overlay">
//             <div className="container-fluid">
//               <div className="row">
//                 {/*1r-1c first row first col */}
//                 <div className="col-md col-lg-5">
//                   <ClickHandler
//                     balanceRef={balanceRef}
//                     increment={upgradeMap.current.get('clickUpgrade')!.increment}
//                     energy={energy}
//                     maxEnergy={maxEnergy}
//                     setEnergy={setEnergy}
//                   />
//                   <DisplayStats 
//                     balanceRef={balanceRef}
//                     clickIncrement={upgradeMap.current.get('clickUpgrade')!.increment}
//                     autoIncrement={autoIncrement}
//                     refillRate={refillRate}
//                   />
//                  <SaveGame 
//       balanceRef={balanceRef}
//       upgradeMap={upgradeMap}
//       upgradeEnergyMap={upgradeEnergyMap}
//       userId={userId} 
//     />
    
//                 </div>
//                 {/* 1r first row */}
//                 <div className="col-md-12 col-lg-7">
//                   <h1>Upgrades</h1>
//                   <div className="row">
//                     <div className="center col-6 col-sm-6 col-md-6 col-lg-6">
//                       <UpgradeButton
//                         id="autoClicker01"
//                         name="Intern"                  
//                         level={upgradeMap.current.get('autoClicker01')!.level}
//                         cost={upgradeMap.current.get('autoClicker01')!.currentCost}
//                         increment={upgradeMap.current.get('autoClicker01')!.incrementAdd}
//                         balance={balanceRef.current.value}
//                         autoIncrementTotal={autoIncrement}
//                         clickHandler={(id) => { upgradeInvocationHandler(id, upgradeMap, upgradeEnergyMap, balanceRef, setMaxEnergy, setRefillRate); }}
//                       /> 
//                       <UpgradeButton
//                         id="autoClicker03"
//                         name="Senior developer"
//                         level={upgradeMap.current.get('autoClicker03')!.level}
//                         cost={upgradeMap.current.get('autoClicker03')!.currentCost}
//                         increment={upgradeMap.current.get('autoClicker03')!.incrementAdd}
//                         balance={balanceRef.current.value}
//                         autoIncrementTotal={autoIncrement}
//                         clickHandler={(id) => { upgradeInvocationHandler(id, upgradeMap, upgradeEnergyMap, balanceRef, setMaxEnergy, setRefillRate); }}
//                       /> 
//                       <UpgradeButton
//                         id="autoClicker05"
//                         name="Chief Manager"
//                         level={upgradeMap.current.get('autoClicker05')!.level}
//                         cost={upgradeMap.current.get('autoClicker05')!.currentCost}
//                         increment={upgradeMap.current.get('autoClicker05')!.incrementAdd}
                       
//                         balance={balanceRef.current.value}
//                         autoIncrementTotal={autoIncrement}
//                         clickHandler={(id) => { upgradeInvocationHandler(id, upgradeMap, upgradeEnergyMap, balanceRef, setMaxEnergy, setRefillRate); }}
//                       />
//                       <UpgradeButton
//                         id="autoClicker07"
//                         name="C.E.O"
//                         level={upgradeMap.current.get('autoClicker07')!.level}
//                         cost={upgradeMap.current.get('autoClicker07')!.currentCost}
//                         increment={upgradeMap.current.get('autoClicker07')!.incrementAdd}
//                         balance={balanceRef.current.value}
//                         autoIncrementTotal={autoIncrement}
//                         clickHandler={(id) => { upgradeInvocationHandler(id, upgradeMap, upgradeEnergyMap, balanceRef, setMaxEnergy, setRefillRate); }}
//                       />
//                     </div>
//                     <div className="center col-6 col-sm-6 col-md-6 col-lg-6">
//                       <UpgradeButton 
//                         id="autoClicker02"
//                         name="Junior developer"
//                         level={upgradeMap.current.get('autoClicker02')!.level}
//                         cost={upgradeMap.current.get('autoClicker02')!.currentCost}
//                         increment={upgradeMap.current.get('autoClicker02')!.incrementAdd}
//                         balance={balanceRef.current.value}
//                         autoIncrementTotal={autoIncrement}
//                         clickHandler={(id) => { upgradeInvocationHandler(id, upgradeMap, upgradeEnergyMap, balanceRef, setMaxEnergy, setRefillRate); }}
//                       /> 
//                       <UpgradeButton
//                         id="autoClicker04"
//                         name="Manager"
//                         level={upgradeMap.current.get('autoClicker04')!.level}
//                         cost={upgradeMap.current.get('autoClicker04')!.currentCost}
//                         increment={upgradeMap.current.get('autoClicker04')!.incrementAdd}
//                         balance={balanceRef.current.value}
//                         autoIncrementTotal={autoIncrement}
//                         clickHandler={(id) => { upgradeInvocationHandler(id, upgradeMap, upgradeEnergyMap, balanceRef, setMaxEnergy, setRefillRate); }}
//                       />
//                       <UpgradeButton
//                         id="autoClicker06"
//                         name="Director"
//                         level={upgradeMap.current.get('autoClicker06')!.level}
//                         cost={upgradeMap.current.get('autoClicker06')!.currentCost}
//                         increment={upgradeMap.current.get('autoClicker06')!.incrementAdd}
//                         balance={balanceRef.current.value}
//                         autoIncrementTotal={autoIncrement}
//                         clickHandler={(id) => { upgradeInvocationHandler(id, upgradeMap, upgradeEnergyMap, balanceRef, setMaxEnergy, setRefillRate); }}
//                       />
//                       <RefUpgradeButton
//                         id="refClicker01"
//                         name="REfer01"
//                         refshow={1}
//                         level={upgradeMap.current.get('refClicker01')!.level}
//                         cost={upgradeMap.current.get('refClicker01')!.currentCost}
//                         increment={upgradeMap.current.get('refClicker01')!.incrementAdd}
//                         balance={balanceRef.current.value}
//                         autoIncrementTotal={autoIncrement}
//                         userId={userId}
//                         clickHandler={(id) => { upgradeInvocationHandler(id, upgradeMap, upgradeEnergyMap, balanceRef, setMaxEnergy, setRefillRate); }}
//                         />
//                          <RefUpgradeButton
//                         id="refClicker02"
//                         name="REfer02"
//                         refshow={2}
//                         level={upgradeMap.current.get('refClicker02')!.level}
//                         cost={upgradeMap.current.get('refClicker02')!.currentCost}
//                         increment={upgradeMap.current.get('refClicker02')!.incrementAdd}
//                         balance={balanceRef.current.value}
//                         autoIncrementTotal={autoIncrement}
//                         userId={userId}
//                         clickHandler={(id) => { upgradeInvocationHandler(id, upgradeMap, upgradeEnergyMap, balanceRef, setMaxEnergy, setRefillRate); }}
//                         />
//                     </div>         
//                   </div>
//                 </div>
//               </div>
//               {/*2r second row for Booster */}
//               <div className="booster row">
//                 <h2>Booster</h2>
//                 <div className="col-sm-6 col-md-6 col-lg-4">
//                   <UpgradeClick
//                     id="clickUpgrade"
//                     name="Tab Booster"
//                     level={upgradeMap.current.get('clickUpgrade')!.level}
//                     cost={upgradeMap.current.get('clickUpgrade')!.currentCost}
//                     increment={upgradeMap.current.get('clickUpgrade')!.incrementAdd}
//                     balance={balanceRef.current.value}
//                     autoIncrementTotal={autoIncrement}
//                     clickHandler={(id) => { upgradeInvocationHandler(id, upgradeMap, upgradeEnergyMap, balanceRef, setMaxEnergy, setRefillRate); }}
//                   /> 
//                 </div>
//                 <div className="col-sm-6 col-md-6 col-lg-4">
//                 <EnergyFill
//                     id="energyfill"
//                     name="Energy Refill"
                  
//                     level={upgradeEnergyMap.current.get('energyfill')!.level}
//                     cost={upgradeEnergyMap.current.get('energyfill')!.currentCost}
//                     increment={upgradeEnergyMap.current.get('energyfill')!.energyRefillIncrement}
//                     balance={balanceRef.current.value}
//                     autoIncrementTotal={autoIncrement}
//                     clickHandler={(id) => { upgradeInvocationHandler(id, upgradeMap, upgradeEnergyMap, balanceRef, setMaxEnergy, setRefillRate); }}
//                   /> 
//                 </div>
//                 <div className="col-sm-6 col-md-6 col-lg-4">
//                 <UpgradePool
//                   id="energyPool"
//                   name="Energy Pool"
//                   level={upgradeEnergyMap.current.get('energyPool')!.level}
//                   cost={upgradeEnergyMap.current.get('energyPool')!.currentCost}
//                   increment={upgradeEnergyMap.current.get('energyPool')!.maxEnergyIncrement}
//                   balance={balanceRef.current.value}
//                   autoIncrementTotal={autoIncrement}
//                   clickHandler={(id) => { upgradeInvocationHandler(id, upgradeMap, upgradeEnergyMap, balanceRef, setMaxEnergy, setRefillRate); }}
//                 />
//                 </div>
//               </div>
//               {/* 3r third row for Task*/}
//               <div className=" Task row">
//                 <h2>Follow Our Social And Get More Coin </h2>
//                 <div className="col-sm col-md-6 col-lg-4">
//                   <Task
//                     name="Follow on Telegram"
//                     reward={500}
//                     show="500"
//                     link="https://telegram.me"
//                     balanceRef={balanceRef}
//                     onRewardClaimed={handleRewardClaimed}
//                   />
//                 </div>
//                 <div className="col-sm col-md-6 col-lg-4">
//                   <Task
//                     name="Follow on X"
//                     reward={300}
//                     show="300"
//                     link="https://telegram.me"
//                     balanceRef={balanceRef}
//                     onRewardClaimed={handleRewardClaimed}
//                   />
//                 </div>
//                 <div className="col-sm col-md-6 col-lg-4">
//                   <Task
//                     name="Follow on U-tube"
//                     reward={300}
//                     show="300"
//                     link="https://telegram.me"
//                     balanceRef={balanceRef}
//                     onRewardClaimed={handleRewardClaimed}
//                   />
//                 </div>
//               </div>
//               <div className="dailyreward">
//                   <Dailyreward
//                     balanceRef={balanceRef}
//                     onRewardClaimed={handleRewardClaimed}
//                   />
//               </div>
//               {/* 4th row for Ref */}
//               <div className="Ref_box">
//                 {userId && <Refer userId={userId} balanceRef={balanceRef} onRewardClaimed={handleRewardClaimed}/>}
//               </div>
//               {/*down are overlay and container  */}
//             </div>
//           </div>
//         </>
//       )
//     }