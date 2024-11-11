import React, { useState } from 'react';
import { ToggleRight, ToggleLeft } from 'lucide-react';
import Credit from './Credit';
import Debit from './Debit';
import WalletTran from './WalletTran';
import './Transation.css';

export default function TransactionDashboard() {
  const [activeTab, setActiveTab] = useState('credit');

  const getTabContent = () => {
    switch (activeTab) {
      case 'credit':
        return <Credit />;
      case 'debit':
        return <Debit />;
      case 'wallet':
        return <WalletTran />;
      default:
        return null;
    }
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case 'credit':
        return 'Credit Transactions';
      case 'debit':
        return 'Debit Transactions';
      case 'wallet':
        return 'Wallet Transactions';
      default:
        return '';
    }
  };

  return (
    <div className="transaction-dashboard">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">{getTabTitle()}</h1>
          
          <div className="toggle-container">
            <button
              type="button"
              className={`toggle-button ${activeTab === 'credit' ? 'active' : ''}`}
              onClick={() => setActiveTab('credit')}
            >
              <ToggleRight className="toggle-icon" />
              <span>Credit</span>
            </button>
            
            <button
              type="button"
              className={`toggle-button ${activeTab === 'debit' ? 'active' : ''}`}
              onClick={() => setActiveTab('debit')}
            >
              <ToggleLeft className="toggle-icon" />
              <span>Debit</span>
            </button>
            
            <button
              type="button"
              className={`toggle-button ${activeTab === 'wallet' ? 'active' : ''}`}
              onClick={() => setActiveTab('wallet')}
            >
              <ToggleRight className="toggle-icon" />
              <span>Wallet</span>
            </button>
          </div>
        </div>

        <div className="dashboard-content">
          {getTabContent()}
        </div>
      </div>
    </div>
  );
}
