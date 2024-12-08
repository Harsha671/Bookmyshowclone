import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ForgotPassword.css";
import Cookies from "js-cookie";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError(""); // Clear error when typing
    setSuccess(""); // Clear success message when typing
    e.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your Email address");
      return;
    }

    // Make the API request using `then` and `catch`
    axios
      .post("http://localhost:5000/forgot-password", { email })
      .then((response) => {
        if (response.data.success) {
          setSuccess("Instructions for resetting your password have been sent to your email.");
          
          setEmail(""); // Clear the email field
          setError(""); // Clear any existing error messages
        } else {
          setError(response.data.message || "Email is not registered");
          setSuccess(""); // Clear success message
        }
      })
      .catch((err) => {
        setError("An error occurred. Please try again later.");
        setSuccess(""); // Clear success message
      });
  };
  
  const changemail=async(e)=>
    {
      e.preventDefault()
      console.log(email)
       axios.get(`http://localhost:5000/checkemail?email=${email}`)
       .then((res)=>
      {
          console.log(res)
          Cookies.set("email", email)
          alert("email sent succesfully")
          setEmail("");
      })
      .catch((err)=>
      {
          console.log(err)
          alert('mail does not exists. please signup')
          setError(" Please Enter the Email")
          setEmail("");
      })
    ;
    }
  
  

  return (
    <div style={{ marginTop: "150px" }}>
      <div className="forgot-password-container">
        <h2>Forgot Password</h2>
        <p>Please enter your email address and we'll send you instructions on how to reset your password.</p>
        <form onSubmit={changemail}>
          <input
            type="Email "
            placeholder="Enter email Id"
            value={email}
            onChange={handleChange}
            className={error ? "input-error"  : ""}
           
          />
          {error && <p className="error-text">{error}</p>}
          {success && <p className="success-text">{success}</p>}
          <button type="submit" className="submit-button" >Submit</button>
          <p>
            Back to <Link to="/login" className="submit-login">Login</Link>
          </p>
          <p><Link to ="/Newpassword" className="new">newpassword</Link></p>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
