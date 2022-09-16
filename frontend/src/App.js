import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux"
import { loaduser } from './actions/userAction';
import Loading from './component/Layout/Loading';
import Customer from './component/Pages/Customer/Customer';
import Architect from './component/Pages/Architect/Architect';
import Dealer from './component/Pages/Dealer/Dealer';
import Mistry from './component/Pages/Mistry/Mistry';
import PMC from './component/Pages/PMC/PMC';
import store from './store';
import SignIn from './component/Auth/Login/signin';
import SignUp from './component/Auth/Signup/signup'
function App() {
  const dispatch = useDispatch();

  const { loading, isAuthenticated, user } = useSelector(state => state.user)

  useEffect(() => {
    store.dispatch(loaduser());
  }, [])

  return (
    (isAuthenticated && !loading) ? <Customer/>:(
    <>
    <Routes>
      <Route exact path='/' element={ <Customer /> } />
      <Route exact path='/architect' element={(loading === false && isAuthenticated === true) ? <Architect />:<SignIn/>} />
      <Route exact path='/dealer' element={(loading === false && isAuthenticated === true) ? <Dealer />:<SignIn/>} />
      <Route exact path='/mistry' element={(loading === false && isAuthenticated === true) ? <Mistry />:<SignIn/>} />
      <Route exact path='/pmc' element={(loading === false && isAuthenticated === true) ? <PMC />:<SignIn/>} />
      <Route exact path='/signin' element={<SignIn />} />
      <Route exact path='/signup' element={<SignUp />} />
    </Routes>
    </>)
  );
}

export default App;
