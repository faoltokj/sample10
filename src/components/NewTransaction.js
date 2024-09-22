import React, { useState, useContext } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const NEW_TRANSACTION_URL = '/transactions/new';

const NewTransaction = () => {
  const { auth } = useContext(AuthContext);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(NEW_TRANSACTION_URL,
        JSON.stringify({ recipientEmail, amount }),
        { headers: { Authorization: `Bearer ${auth?.accessToken}`, 'Content-Type': 'application/json' } }
      );
      navigate('/user/transactions');  // Navigate to transactions page after successful creation
    } catch (err) {
      if (err.response) {
        setErrorMsg(err.response.data.message || 'Failed to create transaction');
      } else {
        setErrorMsg('Failed to create transaction');
      }
    }
  };

  return (
    <div>
      <h2>New Transaction</h2>
      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="recipientEmail">Recipient Email:</label>
          <input
            type="email"
            id="recipientEmail"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewTransaction;
