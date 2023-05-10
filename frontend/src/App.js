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
import SignIn from './component/Auth/Signin/signin';
import Branch from './component/Pages/Branch/Branch'
import ForgotPassword from './component/Auth/Forgot Password/ForgotPassword';
import ResetPassword from './component/Auth/Forgot Password/ResetPassword';
import Inquiry from './component/Pages/Inquiry/inquiry';
import Salesman from './component/Pages/SalesMan/salesman';
import InquiryFilter from './component/Filter/inquiryFilter';
import Task from './component/Pages/Task/Task';

// import SignUp from './component/Auth/Signup/signup'
function App() {
  const dispatch = useDispatch();

  const { loading, isAuthenticated, user } = useSelector(state => state.user)

  useEffect(() => {
    store.dispatch(loaduser());
  }, [])

  return (
    <>
      <Routes>
        <Route exact path='/' element={(!loading && isAuthenticated) ? <Customer /> : <SignIn />} />
        <Route exact path='/customer' element={(loading == false && isAuthenticated) ? <Customer /> : <SignIn />} />
        <Route exact path='/architect' element={(loading === false && isAuthenticated === true) ? <Architect /> : <SignIn />} />
        <Route exact path='/dealer' element={(loading === false && isAuthenticated === true) ? <Dealer /> : <SignIn />} />
        <Route exact path='/mistry' element={(loading === false && isAuthenticated === true) ? <Mistry /> : <SignIn />} />
        <Route exact path='/pmc' element={(loading === false && isAuthenticated === true) ? <PMC /> : <SignIn />} />
        <Route exact path='/inquiry' element={(loading === false && isAuthenticated === true) ? <Inquiry /> : <SignIn />} />
        <Route exact path='/inquiry/:salesman/:branch/:startdate/:enddate' element={(loading === false && isAuthenticated === true) ? <InquiryFilter /> : <SignIn />} />
        <Route exact path='/salesman' element={(loading === false && isAuthenticated === true) ? <Salesman /> : <SignIn />} />
        <Route exact path='/branch' element={(loading === false && isAuthenticated === true) ? <Branch /> : <SignIn />} />
        <Route exact path='/task' element={(loading === false && isAuthenticated) ? <Task /> : <SignIn />} />
        <Route exact path='/signin' element={<SignIn />} />
        <Route exact path="/password/forgot" element=<ForgotPassword /> />
        <Route exact path="/password/reset/:token" element=<ResetPassword /> />
        {/* <Route exact path='/signup' element={<SignUp />} /> */}
      </Routes>
    </>
  );
}

export default App;
