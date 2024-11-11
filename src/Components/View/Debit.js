import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../Url/Url';
import axios from 'axios';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import './Credit.css';

const Credit = () => {
  const [debitTran, setDebitTran] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${BASE_URL}/getDebited-transation`, { withCredentials: true })
      .then((response) => {
        console.log('Debited tran', response.data);
        setDebitTran(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching transactions:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <Loader2 className="loader-icon" />
      </div>
    );
  }

  return (
    <div className="transaction-page">
      <div className="transaction-container">
        <div className="transaction-header">
          <h2 className="transaction-title">Transaction History</h2>
        </div>

        <div className="transaction-content">
          {debitTran.length > 0 ? (
            <div className="transaction-list">
              {debitTran.map((details, index) => (
                <div key={index} className="transaction-card">
                  <div className="transaction-card-content">
                    <div className="transaction-info">
                      <div className="user-info">
                        <div className="icon-circle">
                          <ArrowUpRight className="transaction-icon" />
                        </div>
                        <div className="user-details">
                          <h3 className="user-name">{details.toUserDetails.Name}</h3>
                          {details.toUserDetails.Uid ?
                            <p className="user-id">UID: {details.toUserDetails.Uid}</p>
                            :
                            <p className="user-id">Withdraw from wallet</p>
                          }
                          {details.toUserDetails.Mobile ?

                            <p className="user-mobile">Mobile: {details.toUserDetails.Mobile}</p>
                            :
                            ''
                          }
                        </div>
                      </div>
                    </div>
                    <div className="transaction-amount">
                      {details.amount ?
                        <>
                          <div className="amount">₹{details.amount.toLocaleString()}</div>
                          <span className="status-badge-debit">Debited</span>
                          <p className="user-id">{details.date}</p>
                          
                        </>
                        :
                        ('')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon-container">
                <ArrowUpRight className="empty-icon" />
              </div>
              <h3 className="empty-title">No Transactions</h3>
              <p className="empty-description">No Debited transactions found in your history.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Credit;