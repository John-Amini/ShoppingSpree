import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';
import {loadLayouts} from "../../store/layout"
import { Link } from "react-router-dom";
import image from "../../images/grocery.jpg"
import logo from "../../images/favicon.jpg"
function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    try {
      let result = await dispatch(sessionActions.login({ credential, password}))
      await dispatch(loadLayouts());
    } catch (error) {
      setErrors(["Invalid Credentials"])
      setPassword("")

    }

    // return dispatch(sessionActions.login({ credential, password }))
    //   .catch(async (res) => {
    //     const data = await res.json();
    //     if (data && data.errors) setErrors(data.errors);
    //   });
  };
  const handleDemoUser = async (e) => {
    e.preventDefault();
    setErrors([])

    try {
      let result = await dispatch(sessionActions.login({ credential:"demoUser", password:"password" }))
      await dispatch(loadLayouts());
    } catch (error) {
      setErrors(["Invalid Credentials"])
      setPassword("")
    }

      // if(data && data.errors)setErrors(data.errors)
      // else return result

      // return dispatch(sessionActions.login({ credential:"demoUser", password:"password" }))
    // .catch(async (res) => {
    //   const data = await res.json();
    //   if (data && data.errors) setErrors(data.errors);
    // });
  }



  // return (
  //   <div>
  //     <h1><Link to={'/splash'}>
  //     <img src={logo} alt="traveling-shopper-logo" className='logo'></img>
  //     </Link></h1>
  //     <form onSubmit={handleSubmit}>
  //       <ul>
  //         {errors.map((error, idx) => (
  //           <li key={idx}>{error}</li>
  //         ))}
  //       </ul>
  //       <label>
  //         Username or Email
  //         <input
  //           type="text"
  //           value={credential}
  //           onChange={(e) => setCredential(e.target.value)}
  //           required
  //         />
  //       </label>
  //       <label>
  //         Password
  //         <input
  //           type="password"
  //           value={password}
  //           onChange={(e) => setPassword(e.target.value)}
  //           required
  //         />
  //       </label>
  //       <button type="submit">Log In</button>
  //     </form>
  //     <button onClick={handleDemoUser}>Demo User</button>
  //   </div>
  // );
  return (
    <div>

<nav>
        <div className='navbar'>
          <div>
          <Link className="logo" to='/'><img className='logo'
          src={logo}></img></Link>

          </div>
          <div className='auth'>
            <Link className='btn login' to='/login'>
              Log In
            </Link>
            <Link className='btn signup' to='/signup'>
              Sign Up
            </Link>
          </div>
        </div>
      </nav>
    <div className='login-page-container'>

  {/* <Link to={'/splash'}>
      <img src={logo} alt="traveling-shopper-logo" className='logo'></img>
      </Link> */}
     <img id='login-form-img' src={image} />
      <div className='login-form-container'>
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Log in to Traveling Shopper</h2>
          <div className="errorContainer">
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div>
            <label >Username or Email</label>
            <input type='text' placeholder='Credential' value={credential} onChange={(e) => setCredential(e.target.value)} />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
            />
            <div>
              <button className='login-button' type='submit'>Login</button>
              <button className='login-button' type='button' onClick={handleDemoUser}>

                Login as demo
              </button>

            </div>
            <div>
              <span>Not on Traveling Shopper? </span>
              <Link className='page-link' to='/signup'>Create an account</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}

export default LoginFormPage;
