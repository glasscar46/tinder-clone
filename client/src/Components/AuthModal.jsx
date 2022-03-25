import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import  { useCookies } from 'react-cookie'

const AuthModal = ({ setShowModal, isSignUp }) => {
  const handleClick = () => {
    setShowModal(false);
  };
  const [email, setEmail] = useState(null);
  const [error, setError] = useState(null);
  const [password, setPassword] = useState(null);
  const navigate = useNavigate()
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies('user')


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        if(isSignUp && ( password !== confirmPassword)){
            setError("Passwords  need to match")
            return
        }
        const response = await axios.post(`http://localhost:5000/${isSignUp? 'signup': 'login'}`,{email, password})
        setCookie("token", response.data.token)
        setCookie("user_id",response.data.user_id)
        const success = response.status === 201
        if(success && isSignUp){
          navigate('/onboarding')
        }
        if(success && !isSignUp) navigate('/dashboard')
        window.location.reload()
    } catch (error) {
        console.error(error)
    }
  };
  return (
    <div className="auth-modal">
      <div className="close-icon" onClick={handleClick}>
        Close
      </div>
      <h2>{isSignUp ? "CREATE ACCOUNT" : "LOG IN"}</h2>
      <p>
        By clicking on Log In, you agree to our terms. Learn how we process your
        data in our privacy Policy and Cookie Policy
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="email"
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        { isSignUp && <input
          type="password"
          name="checkpassword"
          id="checkpassword"
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />}
        <input type="submit"  className="secondary-button" />
        <p>{error}</p>
      </form>
      <hr />
      <h2>GET THE APP</h2>
    </div>
  );
};

export default AuthModal;
