import React, { useState } from 'react';
import axios from 'axios';
const Signup = () => {
    const [data, setData] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        confirmpwd: ''
    });

    const { firstname, lastname, username, email, password, confirmpwd } = data;

    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5004/register", data)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>First Name:
                    <input type='text' name='firstname' value={firstname} placeholder='Enter First Name' onChange={changeHandler} />
                </label><br />

                <label>Last Name:
                    <input type='text' name='lastname' value={lastname} placeholder='Enter Last Name' onChange={changeHandler} />
                </label><br />

                <label>Username:
                    <input type='text' name='username' value={username} placeholder='Enter Username' onChange={changeHandler} />
                </label><br />

                <label>Email:
                    <input type='email' name='email' value={email} placeholder='Enter Email' onChange={changeHandler} />
                </label><br />

                <label>Password:
                    <input type='password' name='password' value={password} placeholder='Enter Password' onChange={changeHandler} />
                </label><br />

                <label>Confirm Password:
                    <input type='password' name='confirmpwd' value={confirmpwd} placeholder='Confirm Password' onChange={changeHandler} />
                </label><br />

                <input type="submit" value="Submit" />
               
            </div>
        </form>
    );
};

export default Signup;