import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { loadLayouts } from "../../store/layout";
import * as sessionActions from "../../store/session";
import './SignupForm.css';
import image from'../../images/signup.jpg'
import logo  from '../../images/favicon.jpg'
function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  if (sessionUser) return <Redirect to='/' />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      try {
        let result = await dispatch(sessionActions.signup({ email, username, password }))
        await dispatch(loadLayouts())
        return result
      } catch (error) {
        let data = await error.json();
        if(data && data.errors)setErrors(data.errors)
        setPassword("")
        setConfirmPassword("")
        return
      }
        // let result = await dispatch(sessionActions.signup({ email, username, password }))
        // .catch(async (res) => {
        //   const data = await res.json();
        //   if (data && data.errors) setErrors(data.errors);
        // });

        // return result
    }
    setPassword("")
    setConfirmPassword("")
    return setErrors(['Passwords do not match!']);
  };

  // return (
  //   <>
  //         <h1><Link to={'/splash'}>
  //     <img src={logo} alt="traveling-shopper-logo" className='logo'></img>
  //     </Link></h1>
  //     <form onSubmit={handleSubmit}>
  //       <ul>
  //         {errors.map((error, idx) => <li key={idx}>{error}</li>)}
  //       </ul>
  //       <label>
  //         Email
  //         <input
  //           type="text"
  //           value={email}
  //           onChange={(e) => setEmail(e.target.value)}
  //           required
  //         />
  //       </label>
        // <label>
        //   Username
        //   <input
        //     type="text"
        //     value={username}
        //     onChange={(e) => setUsername(e.target.value)}
        //     required
        //   />
        // </label>
  //       <label>
  //         Password
  //         <input
  //           type="password"
  //           value={password}
  //           onChange={(e) => setPassword(e.target.value)}
  //           required
  //         />
  //       </label>
  //       <label>
  //         Confirm Password
  //         <input
  //           type="password"
  //           value={confirmPassword}
  //           onChange={(e) => setConfirmPassword(e.target.value)}
  //           required
  //         />
  //       </label>
  //       <button type="submit">Sign Up</button>
  //     </form>
  //   </>
  // );

  return (<div>
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
    <div className='signup-page-container'>

      <div id='signup-img-wrapper'>
      <img id='signup-form-img' src={image} />
      </div>
      <div className='signup-form-container'>
        <form className='sign-up-form' onSubmit={handleSubmit}>
          <div className="errorContainer">
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
          <div>
            <label>Email</label>
            <input type='text' name='email' onChange={(e) => setEmail(e.target.value)} value={email}></input>
          </div>
          <div>
            <label>Password</label>
            <input type='password' name='password' onChange={(e)=>setPassword(e.target.value)} value={password}></input>
          </div>
          <div>
            <label>Confirm Password</label>
            <input
              type='password'
              name='repeat_password'
              onChange={(e)=>setConfirmPassword(e.target.value)}
              value={confirmPassword}
              required={true}
            ></input>
          </div>
          <button className='sign-up-button' type='submit'>Sign Up</button>
          <div>
            <span>Already a user? </span>
            <Link className='page-link' to='/login'>Log in here</Link>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}

export default SignupFormPage;
