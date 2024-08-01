// import React, { useState } from 'react';

// interface ExchangeProps {
//   autoIncrement: number;
// }

// const Exchange: React.FC<ExchangeProps> = ({ autoIncrement }) => {
//   const [inputValue, setInputValue] = useState<number | string>('');

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = parseFloat(e.target.value);
//     if (!isNaN(value) && value >= 0) {
//       setInputValue(value);
//     } else {
//       setInputValue('');
//     }
//   };

//   const handleExchange = () => {
//     const value = parseFloat(inputValue.toString());
//     if (value <= autoIncrement) {
//       const newAutoIncrement = autoIncrement - value;
//       onExchange(newAutoIncrement);
//       setInputValue(''); // Reset the input after a successful exchange
//     } else {
//       alert('Input value exceeds the current autoIncrement');
//     }
//   };

//   return (
//     <div>
//       <h3>Exchange AutoIncrement</h3>
//       <input
//         type="number"
//         value={inputValue}
//         onChange={handleInputChange}
//         placeholder="Enter amount to exchange"
//         min="0"
//         max={autoIncrement}
//       />
//       <button onClick={handleExchange} disabled={!inputValue || parseFloat(inputValue.toString()) > autoIncrement}>
//         Exchange
//       </button>
//     </div>
//   );
// };

// export default Exchange;
import React, { useState } from 'react';
import { sendExchangeAmountToFirebase } from './firebaseFunctions'; // Import your Firebase function

interface ExchangeProps {
  autoIncrement: number;
  userId: string | null; // Add userId prop to identify the user in Firebase
}

const Exchange: React.FC<ExchangeProps> = ({ autoIncrement, userId }) => {
  const [inputValue, setInputValue] = useState<number | string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setInputValue(value);
    } else {
      setInputValue('');
    }
  };

  const handleExchange = () => {
    const value = parseFloat(inputValue.toString());
    if (value <= autoIncrement) {
      // Send the exchange amount to Firebase
      if (userId) {
        sendExchangeAmountToFirebase(userId, value);
      } else {
        alert('User ID is not available.');
      }
      setInputValue(''); // Reset the input after a successful exchange
    } else {
      alert('Input value exceeds the current autoIncrement');
    }
  };

  return (
    <div>
      <h3>Exchange AutoIncrement</h3>
      <input
        type="number"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter amount to exchange"
        min="0"
        max={autoIncrement}
      />
      <button
        onClick={handleExchange}
        disabled={!inputValue || parseFloat(inputValue.toString()) > autoIncrement}
      >
        Exchange
      </button>
    </div>
  );
};

export default Exchange;
