import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import logo from "../../images/favicon.jpg"
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        {/* <LoginFormModal /> */}
        <NavLink to="/login"> Login</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <div className='headercontainer'>
       {!sessionUser && <NavLink exact to="/">Home</NavLink>}
        {isLoaded && sessionLinks}
        </div>
  );
}

export default Navigation;
