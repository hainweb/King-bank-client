import React from 'react'
import { Link } from 'react-router-dom';
import {Clapperboard, Gamepad2, Smartphone, Tv } from 'lucide-react';


function Recharge() {
  return (
    <div>
          <div className="dashboard-grid">
        <div className="main-balance-card">
          

          <div className="quick-actions-bar">
            <Link to="/mobile-recharge" className="action-button ripple">
              <Smartphone size={20} />
              <span>Mobile Recharge</span>
            </Link>
            <Link to="/game-recharge" className="action-button ripple">
              <Gamepad2 size={20} />
              <span>Game Recharge</span>
            </Link>
           
            <Link to='/channel-recharge' className="action-button ripple">
              <Tv size={20} />
              <span>Channel Recharge</span>
            </Link>

            <Link to='/movie-recharge' className="action-button ripple">
              <Clapperboard size={20} />
              <span>Movie Recharge</span>
            </Link>
          
          </div>
        </div>
      
      </div>
      
    </div>
  )
}

export default Recharge
