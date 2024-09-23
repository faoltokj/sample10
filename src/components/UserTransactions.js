import React, { useEffect, useState, useContext } from 'react';
import axios from '../api/axios';
import AuthContext from '../context/AuthContext';

const TRANSACTIONS_URL = '/transactions';

const UserTransactions = () => {
  const { auth } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(TRANSACTIONS_URL, {
          headers: { Authorization: `Bearer ${auth?.accessToken}` },
        });
        setTransactions(response.data.transactions);
      } catch (err) {
        setErrorMsg('Failed to load transactions');
      }
    };

    fetchTransactions();
  }, [auth]);

  return (
    <div>
      <h2>Your Transactions</h2>
      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
      {transactions.length > 0 ? (
        <ul>
          {transactions.map((transaction, index) => (
            <li key={index}>
              {transaction.createdAt}: {transaction.amount} to {transaction.recipientEmail}
            </li>
          ))}
        </ul>
      ) : (
        <p>No transactions found</p>
      )}
    </div>
  );
};

export default UserTransactions;
