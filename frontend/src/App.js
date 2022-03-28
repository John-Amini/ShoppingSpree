import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import SignupFormPage from './components/SignupFormPage';
// import LoginFormPage from "./components/LoginFormPage";
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import Grid from './components/Grid';
import LoginFormPage from './components/LoginFormPage';
import { BrowserRouter } from 'react-router-dom';
import Splash from './components/Splash';
import { Redirect} from 'react-router-dom';
import Footer from './components/footer';
function App() {

  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user)
  const [isLoaded, setIsLoaded] = useState(false);
  // const [showModal, setShowModal] = useState(false);
  const [currPointer,setCurrPointer] = useState("none")
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true))
    // .then(()=> dispatch(loadLayouts()));
    // if(sessionUser)
    //   await dispatch(loadLayouts())
  }, [dispatch]);
  // useEffect(async () => {
  //   await dispatch(loadLayouts())

  // },[])

  return (
    <>
    {sessionUser && <Navigation isLoaded={isLoaded} />}

      {isLoaded && (
        <BrowserRouter>
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
        {sessionUser ? <div className='mainWrapper'>
    {/* <SelectType setCurrPointer={setCurrPointer} currPointer={currPointer}></SelectType> */}
      <Grid currPointer={currPointer} setCurrPointer={setCurrPointer}></Grid> </div> : <Redirect to={'/splash'}></Redirect>}
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

      <Footer></Footer>
    </>
  );
}

export default App;
