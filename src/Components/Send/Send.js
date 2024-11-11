import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Confirm from './Confirm';
import { Search, User, Phone, ChevronRight, X, AlertCircle } from 'lucide-react';
import { BASE_URL } from '../../Url/Url';

const Send = ({ user, setUser }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isConfirm, setIsConfirm] = useState(false);
  const [validateSelectedAccount, setValidateSelectedAccount] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${BASE_URL}/send`, { withCredentials: true });
        console.log('all users', response.data);
        setAllUsers(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to load users. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = searchTerm.length >= 1
    ? allUsers.filter(user =>
      user.Uid && user.Uid.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : [];

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setValidateSelectedAccount('');
  };

  const handleConfirm = () => {
    console.log('selected user:', selectedUser);

    if (isNaN(selectedUser.amount) || !selectedUser.amount) {
      setValidateSelectedAccount('This User has No account');
      setIsConfirm(false);
    } else {
      setIsConfirm(true);
    }
  };

  const handleCancel = () => {
    setSelectedUser(null);
    setValidateSelectedAccount('');
    setIsConfirm(false);
  };

  return (
    <div className="container py-5">
      <div className="row mb-4 align-items-center">
        <div className="col">
          <h1 className="display-6 d-flex justify-content-center fw-bold mb-0">Transfer Funds</h1>
        </div>
        
        {isConfirm ? (
          <Confirm selectedUser={selectedUser} user={user} setUser={setUser} />  
        ) : (
          <>
            {selectedUser ? (
              <div className="d-flex justify-content-center w-100">
                <div className="col-md-6">
                  <div className="card border-0 shadow-sm sticky-top" style={{ top: '1rem' }}>
                    <div className="card-body p-4">
                      <h5 className="card-title mb-4 text-center">Selected User</h5>
                      <div className="list-group list-group-flush mb-4">
                        <div className="list-group-item bg-light rounded mb-2 border-0">
                          <div className="d-flex align-items-center">
                            <User className="text-muted me-3" size={20} />
                            <div>
                              <small className="text-muted d-block">Name</small>
                              <strong>{selectedUser?.Name}</strong>
                            </div>
                          </div>
                        </div>
                        <div className="list-group-item bg-light rounded mb-2 border-0">
                          <div className="d-flex align-items-center">
                            <AlertCircle className="text-muted me-3" size={20} />
                            <div>
                              <small className="text-muted d-block">UID</small>
                              <strong>{selectedUser?.Uid}</strong>
                            </div>
                          </div>
                        </div>
                        <div className="list-group-item bg-light rounded mb-2 border-0">
                          <div className="d-flex align-items-center">
                            <Phone className="text-muted me-3" size={20} />
                            <div>
                              <small className="text-muted d-block">Mobile</small>
                              <strong>{selectedUser?.Mobile}</strong>
                            </div>
                          </div>
                        </div>
                      </div>

                      {validateSelectedAccount && (
                        <div className="alert alert-danger d-flex align-items-center mb-4" role="alert">
                          <AlertCircle size={20} className="me-2" />
                          <div>{validateSelectedAccount}</div>
                        </div>
                      )}

                      <div className="d-grid gap-2">
                        <button onClick={handleCancel} className="btn btn-lg btn-outline-secondary">
                          Cancel
                        </button>
                        <button onClick={handleConfirm} className="btn btn-lg btn-primary">
                          Confirm
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="col-auto">
                <button onClick={handleCancel} className="btn btn-light d-flex align-items-center gap-2">
                  <X size={20} />
                  <span>Clear Selection</span>
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {!selectedUser && (
        <div className="card mb-4 border-0 shadow-sm">
          <div className="card-body p-4">
            <div className="position-relative">
              <Search
                className="position-absolute"
                style={{ left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#6c757d' }}
                size={20}
              />
              <input
                type="text"
                placeholder="Search user by Uid... (minimum 1 character)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control form-control-lg ps-5"
                style={{ borderRadius: '10px', padding: '0.8rem 1rem' }}
              />
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="alert alert-danger d-flex align-items-center mb-4" role="alert">
          <AlertCircle size={20} className="me-2" />
          <div>{error}</div>
        </div>
      )}

      <div className="row g-4">
        {!selectedUser && (
          <div className="col-md-8">
            {isLoading ? (
              <div className="card border-0 shadow-sm">
                <div className="card-body text-center p-5">
                  <div className="spinner-border text-primary mb-3" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="text-muted mb-0">Loading users...</p>
                </div>
              </div>
            ) : searchTerm.length < 1 ? (
              <div className="card border-0 shadow-sm">
                <div className="card-body text-center p-5">
                  <Search className="mb-3 text-muted" size={32} />
                  <p className="text-muted mb-0">Enter at least 1 character to search</p>
                </div>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="card border-0 shadow-sm">
                <div className="card-body text-center p-5">
                  <AlertCircle className="mb-3 text-muted" size={32} />
                  <p className="text-muted mb-0">No users found matching "{searchTerm}"</p>
                </div>
              </div>
            ) : (
              <div className="row g-4">
                {filteredUsers.map((user, index) => (
                  <div className="col-sm-6" key={index}>
                    <div
                      onClick={() => handleUserClick(user)}
                      className="card border-0 shadow-sm h-100 cursor-pointer transition"
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="card-body p-4">
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <h5 className="card-title mb-1">{user.Name}</h5>
                            <p className="text-muted mb-0">{user.Uid}</p>
                          </div>
                          <ChevronRight className="text-muted" size={20} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Send;
