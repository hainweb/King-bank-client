import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../Url/Url';
import { CheckCircle, XCircle } from 'lucide-react';
import './Reward.css'

const AlertDialog = ({ open, onClose, variant, title, description }) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ${
        open ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-white shadow-2xl rounded-lg p-8 max-w-md w-full animate-scale-in">
        <div
          className={`mb-6 flex items-center ${
            variant === 'success'
              ? 'text-green-500'
              : variant === 'error'
              ? 'text-red-500'
              : ''
          }`}
        >
          {variant === 'success' ? (
            <CheckCircle className="w-8 h-8 mr-3" />
          ) : (
            <XCircle className="w-8 h-8 mr-3" />
          )}
          <h4 className="text-lg font-bold">{title}</h4>
        </div>
        <p className="text-gray-700 mb-6 animate-fade-in-delay-100">{description}</p>
        <div className="flex justify-end animate-fade-in-delay-200">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-md transition-colors duration-300"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
      <div
        className="fixed inset-0 bg-gray-800 opacity-50 animate-fade-in"
        onClick={onClose}
      ></div>
    </div>
  );
};

const Reward = ({ user, setUser }) => {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [giftAmount, setGiftAmount] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = () => {
    axios
      .post(`${BASE_URL}/get-check`, { code: Number(code) }, { withCredentials: true })
      .then((response) => {
        console.log('gift res', response);

        if (response.data && response.data.response && response.data.response.status) {
          setUser(response.data.userLast);
          setSuccess(true);
          setGiftAmount(response.data.Amount);
          setShowAlert(true);
        } else {
          setMessage(response.data?.message || 'An unexpected error occurred');
          setShowAlert(true);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setMessage('An error occurred while processing your request.');
        setShowAlert(true);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 to-indigo-500">
      {showAlert && (
        <AlertDialog
          open={showAlert}
          onClose={() => setShowAlert(false)}
          variant={success ? 'success' : 'error'}
          title={success ? 'Gift Claimed' : 'Error'}
          description={
            success
              ? `You have received Rs. ${giftAmount} as a gift.`
              : message
          }
        />
      )}

      <div className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-md animate-scale-in">
        <h3 className="text-2xl font-bold mb-6 animate-fade-in">Redeem Your Gift</h3>
        <div className="mb-6 animate-fade-in-delay-100">
          <label htmlFor="code" className="block text-gray-700 font-medium mb-2">
            Enter Code
          </label>
          <input
            type="number"
            id="code"
            placeholder="Enter code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="border border-gray-300 rounded-md py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-md transition-colors duration-300 animate-fade-in-delay-200"
          onClick={handleSubmit}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Reward;