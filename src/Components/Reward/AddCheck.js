import axios from 'axios';
import React, { useState } from 'react';
import { BASE_URL } from '../../Url/Url';
import './AddCheck.css';

const PremiumDesignForm = () => {
  const [formData, setFormData] = useState({
    Code: '',
    Rs: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!formData.Code || !formData.Rs) {
      setError('Both fields are required');
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${BASE_URL}/add-check`, formData, { withCredentials: true }).then((response) => {
        if (response.data.status) {
          setError('');
          setFormData({ Code: '', Rs: '' }); // Reset form fields to empty
        } else {
          setError(response.data.message);
        }
      });
    } catch (err) {
      setError('An error occurred while submitting the form');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="premium-design-form-container">
      <div className="premium-design-form-card">
        <div className="premium-design-form-header">
          <h4 className="premium-design-form-title">Reward</h4>
        </div>
        {error && (
          <div className="premium-design-form-alert">
            {error}
          </div>
        )}
        <div>
          <input
            type="number"
            name="Code"
            placeholder="Code"
            value={formData.Code}
            onChange={handleChange}
            className="premium-design-form-input"
          />
          <input
            type="number"
            name="Rs"
            placeholder="Rs"
            value={formData.Rs}
            onChange={handleChange}
            className="premium-design-form-input"
          />
        </div>
        <div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="premium-design-form-button"
          >
            {loading ? 'Submitting...' : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PremiumDesignForm;