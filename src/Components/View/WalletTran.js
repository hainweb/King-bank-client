import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../Url/Url';
import axios from 'axios';
import { ArrowDownRight, ArrowUpRight, Loader2 } from 'lucide-react';
import './Credit.css';

const WalletTran = () => {
    const [walletTran, setWalletTran] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${BASE_URL}/getWallet-transation`, { withCredentials: true })
            .then((response) => {
                console.log('wallet tran', response.data);
                setWalletTran(response.data);
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
                    {walletTran.length > 0 ? (
                        <div className="transaction-list">
                            {walletTran.map((details, index) => (
                                <div key={index} className="transaction-card">
                                    <div className="transaction-card-content">
                                        <div className="transaction-info">
                                            <div className="user-info">
                                                <div className="icon-circle">
                                                    {details.withdraw ?
                                                        <ArrowDownRight className="transaction-icon" />
                                                        :
                                                        <ArrowUpRight className='transaction-icon' />
                                                    }
                                                </div>
                                                <div className="user-details">
                                                    {details.withdraw ?
                                                        <h3 className="user-name">Withdraw</h3>
                                                        :
                                                        <h3 className="user-name">Deposit</h3>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="transaction-amount">
                                            {details.withdraw ? (
                                                <div>
                                                    <div className="amount">₹{details.withdraw.toLocaleString()}</div>
                                                    <span className="status-badge-debit">Withdrawed</span>
                                                    <p className="user-id">{details.date}</p>
                                                </div>
                                            ) : (
                                                <div>
                                                    <div className="amount">₹{details.deposite.toLocaleString()}</div>
                                                    <span className="status-badge">Deposited</span>
                                                    <p className="user-id">{details.date}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="empty-state">
                            <div className="empty-icon-container">
                                <ArrowDownRight className="empty-icon" />
                            </div>
                            <h3 className="empty-title">No Transactions</h3>
                            <p className="empty-description">No credit transactions found in your history.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WalletTran;
