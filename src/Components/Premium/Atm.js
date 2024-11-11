import { ArrowDownCircle, ArrowUpCircle, Wallet, Crown } from 'lucide-react'
import React, { useState } from 'react'
import Confirm from '../View/Confirm'
import './Atm.css'

function Atm({user, setUser}) {
    const [isWithdraw, setIsWithdraw] = useState(false)
    const [isDeposite, setIsDeposite] = useState(false)
   
    const handleWithdraw = () => {
        setIsWithdraw(true)
        setIsDeposite(false)
    }
    
    const handleDesposite = () => {
        setIsDeposite(true)
        setIsWithdraw(false) 
    }
 
    return (
        <div className="atm-container">
            <div className="premium-badge">
                <Crown />
                <span>Premium Member</span>
            </div>
      
            <div className="balance-card">
                <div className="balance-info">
                    <Wallet className="h-6 w-6" />
                    <h2 className="balance-amount">${user.amount?.toLocaleString()}</h2>
                    <p className="balance-label">Current Balance</p>
                </div>
            </div>

            <div className="atm-actions">
                {isWithdraw || isDeposite ? (
                    <Confirm
                        user={user}
                        setUser={setUser}
                        isWithdraw={isWithdraw}
                        isDeposite={isDeposite}
                        setIsWithdraw={setIsWithdraw}
                        setIsDeposite={setIsDeposite}
                    />
                ) : (
                    <>
                        <button 
                            className="withdraw-btn"
                            onClick={handleWithdraw}
                        >
                            <ArrowDownCircle className="h-5 w-5" />
                            Withdraw
                        </button>
                        
                        <button 
                            className="deposit-btn"
                            onClick={handleDesposite}
                        >
                            <ArrowUpCircle className="h-5 w-5" />
                            Deposit
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}

export default Atm