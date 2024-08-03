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
import React, { useState } from 'react';
import { sendExchangeAmountToFirebase } from './firebaseFunctions'; // Import your Firebase function

interface ExchangeProps {
  autoIncrement: number;
  userId: string | null; // Add userId prop to identify the user in Firebase
}

const Exchange: React.FC<ExchangeProps> = ({ autoIncrement, userId }) => {
  const [inputValue, setInputValue] = useState<number | string>('');
  const [error, setError] = useState<string | null>(null); // State for error message
  const [success, setSuccess] = useState<boolean>(false); // State for success feedback

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setInputValue(value%3600);
      setError(null); // Clear error if input is valid
    } 
    else {
      setError('Invalid input. Please enter a positive number.');
    }
  };

  const handleExchange = () => {
    const value = parseFloat(inputValue.toString());
    if (value > autoIncrement*3600) {
      setError('Input value exceeds the current autoIncrement');
      return;
    }

    if (userId) {
      sendExchangeAmountToFirebase(userId, value);
      setInputValue(''); // Reset the input after a successful exchange
      setSuccess(true); // Set success feedback
    } else {
      setError('User ID is not available.');
    }
  };

  return (
    <div>
      <h3>Exchange AutoIncrement</h3>
      <input
        type="string"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter amount to exchange"
        min="360"
        step="360"
        max={autoIncrement*3600}
      />
      <button
        onClick={handleExchange}
        disabled={!inputValue || parseFloat(inputValue.toString()) > autoIncrement*3600}
      >
        Exchange
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && !error && <p style={{ color: 'green' }}>Exchange successful!</p>}
    </div>
  );
};

export default Exchange;
