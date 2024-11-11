// BankingView.js
import React, { useState, useEffect } from 'react';
import {
  Wallet, UserRound, ArrowLeftRight, CreditCard,
  Send, Target, Bell, TrendingUp, Heart,
  Gift, Shield, Coffee, ShoppingBag, Car, Check, AlertTriangle, Info,
  CircleUserRound,
  Headphones,
  ShieldAlert,
  HandHeart
} from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../Url/Url';
import './BankingView.css';

function View({ user, setUser }) {
  const [pin, setPin] = useState('');
  const [isPin, setIsPin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [showNotifications, setShowNotifications] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Sample data
  const notificationsList = [
    { id: 1, type: 'success', message: 'Payment received from John Doe', time: '2 mins ago' },
    { id: 2, type: 'warning', message: 'Upcoming bill payment reminder', time: '1 hour ago' },
    { id: 3, type: 'info', message: 'New feature available: Budget Planner', time: '2 hours ago' },
  ];

  const goalsList = [
    { id: 1, name: 'Girl Birthday', target: 1000, current: user.amount, icon: <Gift /> },
    { id: 2, name: 'New HeadPhone', target: 2000, current: user.amount, icon: <Headphones /> }, // Make sure to import any other icons like `Car` if needed
    { id: 3, name: 'Emergency Fund', target: 10000, current: user.amount, icon: <ShieldAlert /> }, // Similarly for `Shield`
  ];


  const monthlyExpenses = [
    { category: 'Shopping', amount: 110, icon: <ShoppingBag />, color: '#3b82f6' },
    { category: 'Food', amount: 100, icon: <Coffee />, color: '#10b981' },
    { category: 'Transport', amount: 50, icon: <Car />, color: '#f59e0b' },
    { category: 'Girl', amount: 100, icon: <HandHeart />, color: '#6366f1' },
  ];





  const handleAccountCreate = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/createAccount`,
        { pin },
        { withCredentials: true }
      );
      setUser(response.data);
      setIsPin(false);
    } catch (error) {
      console.error("Error creating account:", error);
    }
    setIsLoading(false);
  };

  // Render welcome screen for new users
  if (!user.amount) {
    return (
      <div className="welcome-container">
        <div className="welcome-card">
          <div className="animated-background"></div>
          {isPin ? (
            <div className="pin-creation">
              <div className="pin-icon-animate">
                <Shield size={48} />
              </div>
              <h4>Create Your PIN</h4>
              <p>Choose a secure 4-digit PIN for your account</p>
              <div className="input-group">
                <div className="pin-boxes">
                  {[...Array(4)].map((_, i) => (
                    <input
                      key={i}
                      type="password"
                      maxLength="1"
                      value={pin[i] || ''}
                      onChange={(e) => {
                        const newPin = pin.split('');
                        newPin[i] = e.target.value;
                        setPin(newPin.join(''));
                        if (e.target.value && e.target.nextSibling) {
                          e.target.nextSibling.focus();
                        }
                      }}
                    />
                  ))}
                </div>
                <button
                  className="btn btn-primary"
                  onClick={handleAccountCreate}
                  disabled={pin.length !== 4 || isLoading}
                >
                  {isLoading ? (
                    <div className="loader">Creating Account...</div>
                  ) : (
                    'Create Account'
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="welcome-content">
              <div className="floating-icons">
                <div className="float-icon"><Send size={24} /></div>
                <div className="float-icon"><CreditCard size={24} /></div>
                <div className="float-icon"><Shield size={24} /></div>
                <div className="float-icon"><Target size={24} /></div>
              </div>
              <div className="welcome-icon-container pulse">
                <Wallet className="welcome-icon" size={48} />
              </div>
              <h2>Welcome to Digital Banking</h2>
              <p>Experience the future of banking with us</p>
              <button className="btn btn-primary animate-pulse" onClick={() => setIsPin(true)}>
                Get Started
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="banking-container">
      <nav className="top-nav">
        <div className="nav-brand">
          <div className="logo-container">
            <Wallet className="logo-icon" />
            <span>MyBank</span>
          </div>
        </div>
        <div className="nav-actions">
          <div className="time-display">
            {currentTime.toLocaleTimeString()}
          </div>
          <div className="notifications-dropdown">
            <button
              className="notification-btn"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell size={20} />
              <span className="notification-badge">3</span>
            </button>
            {showNotifications && (
              <div className="notifications-menu">
                {notificationsList.map(notification => (
                  <div key={notification.id} className={`notification-item ${notification.type}`}>
                    <div className="notification-icon">
                      {notification.type === 'success' && <Check />}
                      {notification.type === 'warning' && <AlertTriangle />}
                      {notification.type === 'info' && <Info />}
                    </div>
                    <div className="notification-content">
                      <p>{notification.message}</p>
                      <span>{notification.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="user-profile">
            <div className="user-avatar">
              <UserRound size={20} />
            </div>
            <span>{user.name || 'User'}</span>
          </div>
        </div>
      </nav>

      <div className="dashboard-grid">
        <div className="main-balance-card">
          <div className="balance-header">
            <h2>Available Balance</h2>
            <div className="card-chip">
              <div className="chip-line"></div>
              <div className="chip-line"></div>
              <div className="chip-line"></div>
            </div>
          </div>
          <div className="balance-amount animate-value">
            ${user.amount?.toLocaleString()}
          </div>
          <div className="account-details">
            <div className="account-number">
              **** **** **** {user.accountNumber?.slice(-4)}
            </div>
            
            <div className="card-badges">
            {user.Premium ?
                <span className="badge">Premium</span>
                : ''
              }
              <span className="badge">Protected</span>
            </div>
          </div>

          {user.Premium ?
          <Link to="/atm" className="ripple-premium">
            <div className="quick-actions-bar-premium">
              <div className="ripple-premium-container">
                
                  <Wallet size={20} />
                  <span className="fade-slide-animation">Premium Wallet</span>
                
              </div>
              {/* Stars for glowing animation */}
              <div className="star"></div>
              <div className="star"></div>
              <div className="star"></div>
              <div className="star"></div>
              <div className="star"></div>
            </div>
            </Link>
            : ''
          }

          <div className="quick-actions-bar">
            <Link to="/send" className="action-button ripple">
              <Send size={20} />
              <span>Transfer</span>
            </Link>
            <Link to="/mobile" className="action-button ripple">
              <CircleUserRound size={20} />
              <span>Mobile</span>
            </Link>
            {user.Premium ?
              <Link to="/goals" className="action-button ripple">
                <Target size={20} />
                <span>Goals</span>
              </Link>
              :
              ''
            }

            <Link to='/transation' className="action-button ripple">
              <ArrowLeftRight size={20} />
              <span>Transations</span>
            </Link>
          </div>
        </div>
        {user.Premium ?
          <div className="financial-goals-card">
            <h3>Financial Goals</h3>
            <div className="goals-grid">
              {goalsList.map(goal => (
                <div key={goal.id} className="goal-item">
                  <div className="goal-icon">{goal.icon}</div>
                  <div className="goal-details">
                    <h4>{goal.name}</h4>
                    <div className="goal-progress">
                      <div
                        className="progress-bar"
                        style={{ width: `${(goal.current / goal.target) * 100}%` }}
                      ></div>
                    </div>
                    <div className="goal-stats">
                      <span>${goal.current.toLocaleString()}</span>
                      <span>of ${goal.target.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          :
          ''
        }

        <div className="spending-insights-card">
          <h3>Monthly Expenses</h3>
          <div className="expenses-chart">
            {monthlyExpenses.map((expense, index) => (
              <div key={expense.category} className="expense-item">
                <div className="expense-icon" style={{ color: expense.color }}>
                  {expense.icon}
                </div>
                <div className="expense-details">
                  <div className="expense-header">
                    <span>{expense.category}</span>
                    <span>${expense.amount}</span>
                  </div>
                  <div className="expense-bar-container">
                    <div
                      className="expense-bar"
                      style={{
                        width: `${(expense.amount / Math.max(...monthlyExpenses.map(e => e.amount))) * 100}%`,
                        backgroundColor: expense.color
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>



        <div className="quick-stats-grid">
          <div className="stat-card pulse">
            <div className="stat-icon">
              <TrendingUp size={24} />
            </div>
            <div className="stat-content">
              <h4>Monthly Growth</h4>
              <span className="stat-value">+12.5%</span>
            </div>
          </div>
          <div className="stat-card pulse">
            <div className="stat-icon">
              <Heart size={24} />
            </div>
            <div className="stat-content">
              <h4>Savings Goal</h4>
              <span className="stat-value">45%</span>
            </div>
          </div>
          <div className="stat-card pulse">
            <div className="stat-icon">
              <Gift size={24} />
            </div>
            <div className="stat-content">
              <h4>Rewards</h4>
              <span className="stat-value">20 pts</span>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default View;