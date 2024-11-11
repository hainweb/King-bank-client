import React, { useState } from 'react'
import { BASE_URL } from '../../Url/Url'
import axios from 'axios'
import './Settings.css'
import WelcomeSreen from '../Welcome/PremiumWelcome'
import { CircleSlash, Phone, UserRound } from 'lucide-react'

function Settings({ user, setUser }) {
  const [isPremium, setIsPremium] = useState(false)
  const [premiumWelcome, setPremiumWelcome] = useState(false)
  const [pin, setPin] = useState('')
  const [isPin, setIspin] = useState(false)

  const [message, setMessage] = useState('')

  const handleNormal = () => {
    axios.post(`${BASE_URL}/change-premium`, { Premium: true }, { withCredentials: true }).then((response) => {
      if (response.data.status) {
        setIsPremium(false)
        setUser({ ...user, Premium: false })
      }
    })
  }

  const handlePin = () => {
    setIspin(true)
  }

  const validatePin = () => {
    axios.post(`${BASE_URL}/check-premium-pin`, { pin }, { withCredentials: true }).then((response) => {
      if (response.data.status) {
        setIspin(false)
        setMessage('')
        setPin('')
        axios.post(`${BASE_URL}/change-premium`, { Premium: true }, { withCredentials: true }).then((response) => {
          if (response.data.status) {
            setIsPremium(true)
            setPremiumWelcome(true)
            setUser({ ...user, Premium: true })
          }
        })
      } else {
        setMessage(response.data.message)
      }
    })
  }

  const handleCancel = () => {
    setIspin(false)
    setMessage('')
    setPin('')
  }

  return (
    <div className="settings-container">
      {premiumWelcome ? (
        <WelcomeSreen />
      ) : (
        <div className="settings-content">
          {!isPin ? (
            <>
              <h3 className="settings-title">Account Settings</h3>

              <div className="profile-box">
                <h4 className="profile-header">Profile</h4>
                <p><UserRound /> {user.Name}</p>
                <p><Phone /> {user.Mobile} </p>
                <p><CircleSlash />{user.Uid} </p>
                <div className="profile-status">
                  {isPremium || user.Premium ? (
                    <span className="premium-status">Premium</span>
                  ) : (
                    <span className="normal-status">Normal</span>
                  )}
                </div>
              </div>

              <div className="action-box">
                {isPremium || user.Premium ? (
                  <button className="btn btn-normal" onClick={handleNormal}>Switch to Normal</button>
                ) : (
                  <button className="btn btn-premium" onClick={handlePin}>Switch to Premium</button>
                )}
              </div>
            </>
          ) : (
            <div className="pin-entry-box">
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter your PIN"
                className="pin-input"
              />
              {message && <p className="error-message">{message}</p>}
              <div className="action-buttons">
                <button className="btn btn-cancel" onClick={handleCancel}>Cancel</button>
                <button className="btn btn-confirm" onClick={validatePin}>Confirm</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Settings
