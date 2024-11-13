import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../Url/Url';
import './AddCheck.css';

const PremiumDesignForm = () => {
  const [formData, setFormData] = useState({
    Code: '',
    Rs: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showReceipt, setShowReceipt] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const [timestamp, setTimestamp] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setShowReceipt(false);
  };

  const generateCode = () => {
    const randomCode = Math.floor(100000 + Math.random() * 900000);
    setFormData(prev => ({
      ...prev,
      Code: randomCode.toString()
    }));
    setShowReceipt(false);
  };

  const generateQRCode = async (code) => {
    try {
      const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${code}`;
      setQrCode(qrImageUrl);
      setTimestamp(new Date().toLocaleString());
      setShowReceipt(true);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  const handleSubmit = async () => {
    if (!formData.Code || !formData.Rs) {
      setError('Both fields are required');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/add-check`, formData, { 
        withCredentials: true 
      });
      
      if (response.data.status) {
        setError('');
        await generateQRCode(formData.Code);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('An error occurred while submitting the form');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="premium-form-container">
      <div className="premium-form-card">
        <div className="premium-form-header">
          <h4 className="premium-form-title">Reward</h4>
          <p className="premium-form-subtitle">Generate and confirm your reward code</p>
        </div>
        
        {error && (
          <div className="premium-form-error">
            {error}
          </div>
        )}

        <div className="code-input-group">
          <input
            type="number"
            name="Code"
            placeholder="Code"
            value={formData.Code}
            onChange={handleChange}
            className="form-input"
          />
          <button 
            onClick={generateCode}
            className="generate-button"
            type="button"
          >
            Generate
          </button>
        </div>

        <div className="input-group">
          <input
            type="number"
            name="Rs"
            placeholder="Rs"
            value={formData.Rs}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="form-button"
        >
          {loading ? (
            <>
              <span className="spinner"></span>
              Submitting...
            </>
          ) : (
            'Confirm'
          )}
        </button>

        {/* Premium Receipt Card */}
        <div className={`receipt-card ${showReceipt ? 'active' : ''}`}>
          <div className="receipt-header">
            <h3 className="receipt-title">Premium Reward Receipt</h3>
            <p className="receipt-subtitle">Transaction Confirmed</p>
          </div>
          
          <div className="receipt-content">
            <div className="receipt-info">
              <span className="receipt-label">Reward Code</span>
              <span className="receipt-value">{formData.Code}</span>
            </div>
            
            <div className="receipt-info">
              <span className="receipt-label">Amount</span>
              <span className="receipt-value receipt-amount">₹{formData.Rs}</span>
            </div>
            
            <div className="receipt-divider" />
            
            <div className="qr-section">
              <img 
                src={qrCode} 
                alt="QR Code" 
                className="qr-code-image"
              />
              <p className="qr-code-text">
                Scan QR code to verify
              </p>
            </div>
            
            <div className="receipt-divider" />
            
            <p className="timestamp">
              Generated on: {timestamp}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumDesignForm;
