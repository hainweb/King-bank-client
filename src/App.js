import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header/Header';
import View from './Components/View/View';
import Signup from './Components/Auth/Signup';
import Login from './Components/Auth/Login';
import Send from './Components/Send/Send';
import Transation from './Components/View/Transation';
import Settings from './Components/Settings/Settings';
import Atm from './Components/Premium/Atm';
import Mobile from './Components/Send/Mobile';
import Goals from './Components/Goals/Goals';
import LoginForm from './Components/Auth/NewLogin';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from './Url/Url';
 


function App() {
  const [user, setUser] = useState('')

  useEffect(() => {
    axios.get(`${BASE_URL}/check`, { withCredentials: true })
      .then((response) => {
        console.log('check res', response);
        if (response.data.user) {
          setUser(response.data.user);
        }
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);


  return (
    <div className="App">
      <Router>
        <Header user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={user ? <View user={user} setUser={setUser} /> : <Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup setUser={setUser} />} />
          <Route path="/login" element={<LoginForm setUser={setUser} />} />
          <Route path='/send' element={<Send user={user} setUser={setUser} />} />
          <Route path='/mobile' element={<Mobile user={user} setUser={setUser} />} />
          <Route path='/transation' element={<Transation />} />
          <Route path='/atm' element={<Atm user={user} setUser={setUser} />} />
          <Route path='/settings' element={user ? <Settings user={user} setUser={setUser} /> : <Login />} />
          <Route path='/goals' element={<Goals user={user}/>} />
        </Routes>
      </Router>
    </div>
  );
}


export default App;
