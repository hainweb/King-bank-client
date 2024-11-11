import { Gift,Headphones,ShieldAlert } from 'lucide-react';
import React from 'react';
import './Goal.css';

function Goals({user}) {
  const goalsList = [
    { id: 1, name: 'Girl Birthday', target: 1000, current: user.amount, icon: <Gift /> },
    { id: 2, name: 'New HeadPhone', target: 2000, current: user.amount, icon: <Headphones /> }, // Make sure to import any other icons like `Car` if needed
    { id: 3, name: 'Emergency Fund', target: 10000, current: user.amount, icon: <ShieldAlert /> }, // Similarly for `Shield`
  ];

  return (
    <div>     
      <div className="financial-goals-card">
        <h3> Goals</h3>
        <div className="goals-grid">
          {goalsList.map((goal) => (
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
    </div>
  );
}

export default Goals;
