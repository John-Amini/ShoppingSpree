import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import SignupFormPage from './components/SignupFormPage';
// import LoginFormPage from "./components/LoginFormPage";
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import { Modal } from './context/Modal';
import Grid from './components/Grid';
import SelectType from './components/SelectType';
import { loadLayouts } from './store/layout';
import LoginFormPage from './components/LoginFormPage';
function App() {

  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user)
  const [isLoaded, setIsLoaded] = useState(false);
  // const [showModal, setShowModal] = useState(false);s
  const [currPointer,setCurrPointer] = useState(null)
  useEffect(async () => {
    if(sessionUser)
      await dispatch(loadLayouts())
    await dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));

  }, [dispatch]);
  useEffect(async () => {
    await dispatch(loadLayouts())

  },[])

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path='/signup'>
            <SignupFormPage />
          </Route>
        </Switch>
      )}
    {sessionUser && <> <SelectType setCurrPointer={setCurrPointer} currPointer={currPointer}></SelectType>
      <Grid currPointer={currPointer}></Grid> </> }

    </>
  );
}

export default App;
