import React, { useEffect, useState } from 'react';
import { Wallet, ArrowUpCircle, ArrowDownCircle, Loader2, XCircle } from 'lucide-react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import { BASE_URL } from '../../Url/Url';


// Animations
const slideUp = keyframes`
  from { 
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to { 
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;
const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  color: #333;

  &:hover {
    color: #f44336; // Example: Change color on hover
  }
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 12px;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 120px;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${props => props.$secondary ? `
    background: white;
    border: 2px solid #E5E7EB;
    color: #374151;

    &:hover:not(:disabled) {
      border-color: #D1D5DB;
      background: #F9FAFB;
    }
  ` : `
    background: ${props.$isWithdraw ? '#EF4444' : '#22C55E'};
    border: none;
    color: white;

    &:hover:not(:disabled) {
      background: ${props.$isWithdraw ? '#DC2626' : '#16A34A'};
      transform: scale(1.02);
    }

    &:active:not(:disabled) {
      transform: scale(0.98);
    }
  `}
`;


const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  opacity: ${props => (props.$isVisible ? 1 : 0)};
  transition: opacity 0.3s ease;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  width: 100%;
  max-width: 480px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  animation: ${slideUp} 0.3s ease;
`;

const Header = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #f0f0f0;
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const IconWrapper = styled.div`
  padding: 0.5rem;
  border-radius: 50%;
  background: ${props => (props.$isWithdraw ? '#FEE2E2' : '#DCFCE7')};
  svg {
    width: 24px;
    height: 24px;
    color: ${props => (props.$isWithdraw ? '#EF4444' : '#22C55E')};
  }
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
`;

const Content = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const BalanceCard = styled.div`
  background: linear-gradient(135deg, #eff6ff 0%, #ffffff 100%);
  border: 1px solid #bfdbfe;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const BalanceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const UserInfo = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 1rem;

  span {
    display: block;
  }
`;

const WalletIcon = styled.div`
  background: #3b82f6;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 20px;
    height: 20px;
    color: white;
  }
`;

const BalanceAmount = styled.span`
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
`;

const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
`;

const InputWrapper = styled.div`
  position: relative;
  
  &::before {
    content: '$';
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #9ca3af;
    font-size: 1.125rem;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 2rem;
  border: 2px solid ${props => (props.$error ? '#fca5a5' : '#e5e7eb')};
  border-radius: 12px;
  font-size: 1.125rem;
  font-weight: 500;
  background: ${props => (props.$error ? '#fef2f2' : 'white')};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${props => (props.$error ? '#f87171' : '#d1d5db')};
  }

  &:focus {
    outline: none;
    border-color: ${props => (props.$error ? '#ef4444' : '#3b82f6')};
    box-shadow: 0 0 0 3px ${props => (props.$error ? 'rgba(239, 68, 68, 0.2)' : 'rgba(59, 130, 246, 0.2)')};
  }
`;

const Confirm = ({
  user,
  setUser,
  isWithdraw,
  setIsWithdraw,
  isDeposite,
  setIsDeposite
}) => {
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isValidAmount, setIsValidAmount] = useState(true);

  useEffect(() => {
    if (!amount) {
      setIsValidAmount(true);
      return;
    }

    const numAmount = Number(amount);
    if (isWithdraw) {
      setIsValidAmount(user.amount - numAmount >= 0);
    } else {
      setIsValidAmount(numAmount > 0);
    }
  }, [amount, user.amount, isWithdraw]);

  const handleTransaction = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const endpoint = isWithdraw ? '/withdraw' : '/deposit';

    try {
      const response = await axios.post(
        `${BASE_URL}${endpoint}`,
        { amount: Number(amount) },
        { withCredentials: true }
      );
      
      setUser(response.data);
      handleCancel();
    } catch (error) {
      setError(error.response?.data?.message || 'Transaction failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsWithdraw(false);
    setIsDeposite(false);
    setAmount('');
    setError('');
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  return (
    <Overlay $isVisible={isWithdraw || isDeposite}>
      <ModalContainer>
        <Header>
          <IconWrapper $isWithdraw={isWithdraw}>
            {isWithdraw ? <ArrowUpCircle /> : <ArrowDownCircle />}
          </IconWrapper>
          <Title>{isWithdraw ? 'Withdraw Funds' : 'Deposit Funds'}</Title>
          <CloseButton onClick={handleCancel}>
            <XCircle />
          </CloseButton>
        </Header>

        <Content>
          <BalanceCard>
            <BalanceHeader>
              <WalletIcon>
                <Wallet />
              </WalletIcon>
              <BalanceAmount>${user.amount.toFixed(2)}</BalanceAmount>
            </BalanceHeader>
            <UserInfo>
              <span>UID: {user.Uid}</span>
              <span>Mobile: {user.Mobile}</span>
            </UserInfo>
          </BalanceCard>

          <InputSection>
            <Label>Enter {isWithdraw ? 'withdrawal' : 'deposit'} amount</Label>
            <InputWrapper>
              <Input
                type="text"
                value={amount}
                onChange={handleAmountChange}
                $error={!isValidAmount}
                placeholder="0.00"
              />
            </InputWrapper>
            {!isValidAmount && (
              <p style={{ color: '#EF4444' }}>
                {isWithdraw ? 'Insufficient funds' : 'Please enter a valid amount'}
              </p>
            )}
          </InputSection>

          {error && (
            <div style={{ backgroundColor: '#FEE2E2', color: '#EF4444', padding: '10px', borderRadius: '5px' }}>
              {error}
            </div>
          )}
        </Content>

        <div style={{ padding: '1rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
         
          <Button $secondary onClick={handleCancel} disabled={isLoading}>
            Cancel
          </Button>
          <Button 
            onClick={handleTransaction}
            disabled={!amount || !isValidAmount || isLoading}
            $isWithdraw={isWithdraw}
          >
            {isLoading ? (
              <>
                <Loader2 size={16} />
                Processing
              </>
            ) : (
              'Confirm'
            )}
          </Button>
       
        </div>
      </ModalContainer> 
    </Overlay>
  );
};

export default Confirm;
