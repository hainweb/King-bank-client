import React, { useState, useRef } from 'react';
import { ArrowUpRight, Wallet } from 'lucide-react';
import axios from 'axios';
import './Confirm.css';
import Checkmark from '../Checkmark/Checkmark'; // Assuming this component is correctly implemented
import { BASE_URL } from '../../Url/Url';

const PinInput = ({ onComplete, onCancel, error }) => {
  const [pin, setPin] = useState(['', '', '', '']);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    
    if (value && index < 3) {
      inputRefs[index + 1].current.focus();
    }
    
    if (index === 3 && value) {
      const completePin = newPin.join('');
      onComplete(completePin);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs[index - 1].current.focus();
    }
    if (e.key === 'ArrowRight' && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 4);
    if (!/^\d+$/.test(pastedData)) return;
    
    const newPin = [...pin];
    pastedData.split('').forEach((digit, index) => {
      if (index < 4) newPin[index] = digit;
    });
    setPin(newPin);
    
    if (pastedData.length === 4) {
      onComplete(pastedData);
    } else {
      const lastIndex = Math.min(pastedData.length - 1, 3);
      inputRefs[lastIndex].current.focus();
    }
  };

  return (
    <div className="pin-section">
      <h2 className="pin-title">Enter PIN</h2>
      <div className="pin-grid">
        {pin.map((digit, index) => (
          <input
            key={index}
            ref={inputRefs[index]}
            type="password"
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            maxLength={1}
            className="pin-input"
            autoFocus={index === 0}
          />
        ))}
      </div>
      {error && <div className="error-message">{error}</div>}
      <button onClick={onCancel} className="button button-secondary">
        Cancel
      </button>
    </div>
  );
};

function Confirm({ selectedUser, user, setUser }) {
  const [validateAmount, setValidateAmount] = useState(true);
  const [isPin, setIsPin] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    Amount: '',
    To: selectedUser._id
  });
  const [showCheckmark, setShowCheckmark] = useState(false); // State to control showing checkmark
  const [loading, setLoading] = useState(false); // State to control loading animation

  const validatePin = async (pin) => {
    setLoading(true); // Start loading animation
    try {
      const response = await axios.post(`${BASE_URL}/check-pin`, { pin }, { withCredentials: true });
      if (response.data.status) {
        setLoading(true)

        handleSubmit(); // Proceed to submit payment
      } else {
        setLoading(false)
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage('Failed to validate PIN. Please try again.');
    } finally {
     
    }
  };
  

  const handleSubmit = async () => {
    setLoading(true); // Start loading animation
    try {
      const sendAmountResult = await axios.post(`${BASE_URL}/sendAmount`, formData, { withCredentials: true });
      setUser(sendAmountResult.data);
      await axios.post(`${BASE_URL}/add-transation`, formData, { withCredentials: true });
      setMessage('');
      setShowCheckmark(true); // Show the checkmark page after successful payment
    } catch (error) {
      setMessage('Payment failed. Please try again.');
    } finally {
      
      
    }
  };

  const handleCancel = () => {
    setIsPin(false);
    setMessage('');
  };

  const handleAmountChange = (e) => {
    const newAmount = e.target.value;
    setFormData({
      ...formData,
      Amount: newAmount
    });
    setValidateAmount(user.amount - newAmount >= 0);
  };

  if (showCheckmark) {
    return <Checkmark message="Payment Successful!" />;
  }

  return (
    <div className="payment-container">
      <div className="payment-card">
        {loading ? (
          <div className="loading-animation">
            <div className="loading-dot"></div>
            <div className="loading-dot"></div>
            <div className="loading-dot"></div>
          </div>
        ) : isPin ? (
          <PinInput 
            onComplete={validatePin}
            onCancel={handleCancel}
            error={message}
          />
        ) : (
          <>
            <div className="balance-display">
              <Wallet size={24} />
              ${user.amount}
            </div>
            <div className="recipient-info">
              <div className="recipient-name">
                Pay to <ArrowUpRight size={20} /> {selectedUser.Name}
              </div>
              <div className="recipient-uid">
                <strong>Uid:</strong> {selectedUser.Uid}
              </div>
            </div>
            <input
              type="number"
              name="Amount"
              className="amount-input"
              placeholder="Enter Amount"
              value={formData.Amount}
              onChange={handleAmountChange}
            />
            {!validateAmount && (
              <div className="error-message">Insufficient balance</div>
            )}
            <button
              disabled={!formData.Amount || formData.Amount.length < 1 || !validateAmount}
              onClick={() => setIsPin(true)}
              className="button button-primary"
            >
              Pay
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Confirm;
