import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../Url/Url'

function Login({ setUser }) {
    const [formData, setFormData] = useState({
        Mobile: '',
        Password: ''
    })
    const [info, setInfo] = useState('')
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData.Mobile);

        console.log(formData.Password);
        axios.post(`${BASE_URL}/login`, formData, { withCredentials: true }).then((response) => {
            console.log(response);
            if (response.data.status) {
                setUser(response.data.user)
                navigate('/')
                
            } else {
                setInfo(response.data.message)
            }


        })
    }
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }
    return (
        <div>
            <div className="container">
                <h3 className="primary">Login</h3>
                <form onSubmit={handleSubmit}>
                    <div className="container">
                        <input type="number" className='form col-md-8' name='Mobile' placeholder='Mobile' value={formData.Mobile} onChange={handleChange} />
                        <br />
                        <br></br>
                        <input type="password" className='input-filed col-md-8' name='Password' placeholder='Passowrd' value={formData.Password} onChange={handleChange} />
                    </div>
                    <div className="container">
                        <h6 style={{color:'red'}}>{info}</h6>
                        <button className='btn btn-primary mt-3' type='submit'>Login</button>
                    </div>
                </form>
                <Link to={'/signup'}   >
                    <h6 className='mt-3'>I dont have an account?</h6>
                </Link>
            </div>
        </div>
    )
}

export default Login
