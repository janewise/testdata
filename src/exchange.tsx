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
// import React, { useState } from 'react';
// import { sendExchangeAmountToFirebase } from './firebaseFunctions'; // Import your Firebase function

// interface ExchangeProps {
//   autoIncrement: number;
//   userId: string | null; // Add userId prop to identify the user in Firebase
// }

// const Exchange: React.FC<ExchangeProps> = ({ autoIncrement, userId }) => {
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
//       // Send the exchange amount to Firebase
//       if (userId) {
//         sendExchangeAmountToFirebase(userId, value);
//       } else {
//         alert('User ID is not available.');
//       }
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
//         step="0.1"
//         max={autoIncrement}
//       />
//       <button
//         onClick={handleExchange}
//         disabled={!inputValue || parseFloat(inputValue.toString()) > autoIncrement}
//       >
//         Exchange
//       </button>
//     </div>
//   );
// };

// export default Exchange;
// import React, { useState } from 'react';
// import { sendExchangeAmountToFirebase } from './firebaseFunctions'; // Import your Firebase function

// interface ExchangeProps {
//   autoIncrement: number;
//   userId: string | null; // Add userId prop to identify the user in Firebase
// }

// const Exchange: React.FC<ExchangeProps> = ({ autoIncrement, userId }) => {
//   const [inputValue, setInputValue] = useState<number | string>('');
//   const [error, setError] = useState<string | null>(null); // State for error message
//   const [success, setSuccess] = useState<boolean>(false); // State for success feedback

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = parseFloat(e.target.value);
//     if (!isNaN(value) && value >= 0) {
//       setInputValue(value);
//       setError(null); // Clear error if input is valid
//     } else {
//       setError('Invalid input. Please enter a positive number.');
//     }
//   };

//   const handleExchange = () => {
//     const value = parseFloat(inputValue.toString());
//     if (value > autoIncrement) {
//       setError('Input value exceeds the current autoIncrement');
//       return;
//     }

//     if (userId) {
//       sendExchangeAmountToFirebase(userId, value);
//       setInputValue(''); // Reset the input after a successful exchange
//       setSuccess(true); // Set success feedback
//     } else {
//       setError('User ID is not available.');
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
//         step="0.1"
//         max={autoIncrement}
//       />
//       <button
//         onClick={handleExchange}
//         disabled={!inputValue || parseFloat(inputValue.toString()) > autoIncrement}
//       >
//         Exchange
//       </button>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {success && !error && <p style={{ color: 'green' }}>Exchange successful!</p>}
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
  const [inputValue, setInputValue] = useState<number>(0); // Start with 0
  const [error, setError] = useState<string | null>(null); // State for error message
  const [success, setSuccess] = useState<boolean>(false); // State for success feedback

  const handlePlus = () => {
    setInputValue(prevValue => Math.min(prevValue + 0.1, Math.floor(autoIncrement)));
  };

  const handleMinus = () => {
    setInputValue(prevValue => Math.max(prevValue - 0.1, 0));
  };

  const handleMax = () => {
    setInputValue(Math.floor(autoIncrement));
  };

  const handleCancel = () => {
    setInputValue(0); // Reset input value to 0
  };

  const handleExchange = () => {
    if (inputValue > autoIncrement) {
      setError('Input value exceeds the current autoIncrement');
      return;
    }

    if (userId) {
      sendExchangeAmountToFirebase(userId, inputValue);
      setInputValue(0); // Reset the input after a successful exchange
      setSuccess(true); // Set success feedback
      setError(null); // Clear any previous error
    } else {
      setError('User ID is not available.');
    }
  };

  return (
    <div>
      <h3>Exchange AutoIncrement</h3>
      <div>
        <input
          type="text"
          value={inputValue.toFixed(1)} // Display value to 1 decimal place
          readOnly
        />
        <button onClick={handleMinus} disabled={inputValue <= 0}>
          -
        </button>
        <button onClick={handlePlus} disabled={inputValue >= autoIncrement}>
          +
        </button>
        <button onClick={handleMax}>Max</button>
        <button onClick={handleCancel}>Cancel</button>
        <button onClick={handleExchange} disabled={inputValue <= 0}>
          Exchange
        </button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && !error && <p style={{ color: 'green' }}>Exchange successful!</p>}
    </div>
  );
};

export default Exchange;
