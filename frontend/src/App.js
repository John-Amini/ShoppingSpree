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
import { BrowserRouter } from 'react-router-dom';
import Splash from './components/Splash';
import { Redirect } from 'react-router-dom';
function App() {

  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user)
  const [isLoaded, setIsLoaded] = useState(false);
  // const [showModal, setShowModal] = useState(false);s
  const [currPointer,setCurrPointer] = useState(null)
  useEffect(async () => {

    await dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    // if(sessionUser)
    //   await dispatch(loadLayouts())
  }, [dispatch]);
  // useEffect(async () => {
  //   await dispatch(loadLayouts())

  // },[])

  return (
    <>

      {isLoaded && (
        <BrowserRouter>
      <Navigation isLoaded={isLoaded} />

        <Switch>
        <Route exact path='/splash'>
            <Splash user={sessionUser} />
          </Route>
          <Route exact path="/login" >
            <LoginFormPage />
          </Route>
          <Route path='/signup'>
            <SignupFormPage />
          </Route>
          <Route exact path = '/'>
        {sessionUser ? <>
    <SelectType setCurrPointer={setCurrPointer} currPointer={currPointer}></SelectType>
      <Grid currPointer={currPointer}></Grid> </> : <Redirect to={'/splash'}></Redirect>}
          </Route>
          <Route>
                <h1>404 Not Found</h1>
              </Route>
        </Switch>
        </BrowserRouter>
      )}
    {/* {sessionUser && <>
    <SelectType setCurrPointer={setCurrPointer} currPointer={currPointer}></SelectType>
      <Grid currPointer={currPointer}></Grid> </> } */}


    </>
  );
}

export default App;
