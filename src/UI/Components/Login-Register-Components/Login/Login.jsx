import React, { useState, useEffect } from 'react'
import './Login.css';
import { url } from '../../../../utils/api';
import Link from 'next/link';
import { useUserDashboardContext } from '../../../../context/userDashboardContext/userDashboard';
import loadingIcon from "../../../../Assets/Loader-animations/loader-check-two.gif";
import { useCart } from '../../../../context/cartContext/cartContext';
import { useRouter } from 'next/navigation';
import SnakBar from '@/Global-Components/SnakeBar/SnakBar';
import { useGlobalContext } from '@/context/GlobalContext/globalContext';
import InputText from '@/Global-Components/InputText/InputText';

const Login = ({ signupclicked, setSignupclicked }) => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);

  // const navigate = useNavigate()
  const router = useRouter()

  const { setToken } = useUserDashboardContext();
  const { setCartUid } = useCart();
  // const id = localStorage.getItem('uuid');

  const [loginRegisterMessage, setLoginRegisterMessage] = useState('')
  const [openSnakeBar, setOpenSnakeBar] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation for the form
    if (password !== confirmPassword) {
      setOpenSnakeBar(true)
      setLoginRegisterMessage("Passwords do not match!");
      return;
    }
    setError('');
    setLoading(true);

    // Prepare FormData
    const formData = new FormData();
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('email', email);
    formData.append('password', password);

    try {
      // Send POST request with FormData to the API
      const response = await fetch(`${url}/api/v1/web-users/add`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        // Handle success (e.g., show success message, reset form, etc.)
        alert('Sign up successful!');
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setLoading(false);
      } else {
        // Handle error
        setOpenSnakeBar(true)
        setLoginRegisterMessage(result.message || 'Something went wrong');
        setLoading(false);
      }
    } catch (error) {
      setOpenSnakeBar(true)
      setLoginRegisterMessage('Network error, please try again later.');
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const convertCartAbd = () => {
    return async () => {
      const response = await fetch(`${url}/api/v1/customer/unused-cart/convert`, {
        method: 'POST',
        body: JSON.stringify({
          _id: localStorage.getItem('cartUid'),
          userId: localStorage.getItem('uuid')
        }),
        headers: {
          authorization: `${localStorage.getItem('userToken')}`,
          "Content-Type": "application/json"
        }
      });

      const data = await response.json(); // Parse JSON response
      return data;
    };
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    // Simple validation for the form

    setError('');
    setLoading(true);

    // Prepare FormData
    const formData = new FormData();
    formData.append('email', loginEmail);
    formData.append('password', loginPassword);

    try {
      // Send POST request with FormData to the API
      const response = await fetch(`${url}/api/v1/web-users/login`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setToken(result.token, result?.data?._id)
        setLoginEmail('');
        setLoginPassword('');
        const isCartConversionNeeded = localStorage.getItem('cartUid') && localStorage.getItem('cartUid') !== "null" && localStorage.getItem('cartUid') !== "undefined";
        if (isCartConversionNeeded) {
          const convertCart = convertCartAbd();
          convertCart().then(response => {
            if (response?.status === 200) {
              setCartUid(response?.existingCartId)
            } else if (response?.status === 201) {
              setCartUid(response?.newCartId)
            }
          }).catch(error => {
            console.error("Error converting cart:", error);
          });
        }
        setLoading(false);
        router.push(`/user-dashboard/${result?.data?._id}`)
      } else if (response.status === 400) {
        setOpenSnakeBar(true)
        setLoginRegisterMessage("Invalid Email");
      } else if (response.status === 401) {
        setOpenSnakeBar(true)
        setLoginRegisterMessage("Invalid Password");
      } else {
        // Handle error
        setOpenSnakeBar(true)
        setLoginRegisterMessage(result.message || 'Something went wrong');
        setLoading(false);
      }
    } catch (error) {
      // Handle network error
      setOpenSnakeBar(true)
      setLoginRegisterMessage('Network error, please try again later.');
      setLoading(false);
    } finally {
      setLoading(false);
      setLoading(false);
    }
  };

  const handleCloseSnakeBar = () => {
    setOpenSnakeBar(false)
  }

  const { isDeliveryAllowed } = useGlobalContext();

  return (
    <>
      <div className={`login-main-section ${signupclicked ? 'slide-log-in-into-left' : ''}`}>
        <div className={`signup-containt-container ${signupclicked ? 'hide-signup-content' : ''}`}>
          <h3 className='signup-sec-main-register-heading'>Register</h3>
          <div className="signup-sec-content">
            <form className="signup-form" onSubmit={handleSubmit}>
              <div className="form-row">

                <InputText
                  label={"First Name *"}
                  payload={firstName}
                  isAllowed={isDeliveryAllowed}
                  input_name={"firstName"}
                  value={firstName}
                  require={true}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                

                <InputText
                  label={"Last Name *"}
                  payload={lastName}
                  isAllowed={isDeliveryAllowed}
                  input_name={"lastName"}
                  value={lastName}
                  require={true}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <InputText
                  label={"Email *"}
                  payload={email}
                  isAllowed={isDeliveryAllowed}
                  input_name={"email"}
                  value={email}
                  require={true}
                  onChange={(e) => setEmail(e.target.value)}
                />

              <div className="form-row">
                <InputText
                  label={"Password *"}
                  payload={password}
                  isAllowed={isDeliveryAllowed}
                  input_name={"password"}
                  value={password}
                  require={true}
                  onChange={(e) => setPassword(e.target.value)}
                />
               

                <InputText
                  label={"Confirm Password *"}
                  payload={confirmPassword}
                  isAllowed={isDeliveryAllowed}
                  input_name={"confirmPassword"}
                  value={confirmPassword}
                  require={true}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />


              </div>


              <label className="signup-sec-label checkbox">
                <input
                  type="checkbox"
                  className='term-and-condition'
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  required
                />
                <span className='terms-conditions-agre-container'>I agree to the <Link href={'/privacy-policy'}>Privacy Policy</Link></span>
              </label>
              <label className="signup-sec-label checkbox">
                <input
                  type="checkbox"
                  className='term-and-condition'
                  checked={acceptPrivacy}
                  onChange={(e) => setAcceptPrivacy(e.target.checked)}
                  required
                />
                <span className='terms-conditions-agre-container'>I agree to the <Link href={'/terms-and-conditions'}>Terms & Conditions</Link></span>
              </label>

              {/* Submit Button */}
              <button className="signup-button signup-sec-register-btn" type="submit">Register</button>
            </form>

          </div>

          {loading && <div className="loading_reg">
            <img src={loadingIcon} alt="" />
            <p>Creating Your Account...</p>
          </div>}

        </div>
        <div className={`login-main-container ${signupclicked ? 'show-login-main-section' : ''}`}>
          <h3 className='login-sec-main-heading'>Login</h3>
          <div className='login-sec-id-pass-content'>
            <form className="login-form" onSubmit={handleSubmitLogin}>
              <InputText
                  label={"Email *"}
                  payload={loginEmail}
                  isAllowed={isDeliveryAllowed}
                  input_name={"loginEmail"}
                  value={loginEmail}
                  require={true}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              

              <InputText
                  label={"Password *"}
                  payload={loginPassword}
                  isAllowed={isDeliveryAllowed}
                  input_name={"loginPassword"}
                  value={loginPassword}
                  require={true}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              
              <div className='login-sec-forgot-pass'>
                <Link href={'/'}>Forgot Password</Link>
              </div>
              <button className="login-sec-login-btn" type="submit">Login</button>
            </form>


          </div>
          {loading && <div className="loading_reg">
            <img src={loadingIcon} alt="" />
            <p>Please Wait...</p>
          </div>}
        </div>
      </div>

      <SnakBar
        message={loginRegisterMessage}
        openSnakeBarProp={openSnakeBar}
        setOpenSnakeBar={setOpenSnakeBar}
        onClick={handleCloseSnakeBar}
      />
    </>
  )
}

export default Login