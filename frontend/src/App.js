import React,{useEffect} from 'react';
import {Routes, Route} from 'react-router-dom'
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import {useDispatch, useSelector} from "react-redux"
import { loaduser } from './actions/userAction';
import Customer from './component/Pages/Customer/Customer';
import Architect from './component/Pages/Architect/Architect';
import Dealer from './component/Pages/Dealer/Dealer';
import Mistry from './component/Pages/Mistry/Mistry';
import PMC from './component/Pages/PMC/PMC';
function App() {
   const dispatch = useDispatch();

   const {loading, isAuthenticated, user } = useSelector(state => state.user)


  useEffect(() => {
    dispatch(loaduser())
  },[])

  return (
    <>
    <Routes>
      <Route exact path='/' element={<Customer/>}/>
      <Route exact path='/architect' element={<Architect/>}/>
      <Route exact path='/dealer' element={<Dealer/>}/>
      <Route exact path='/mistry' element={<Mistry/>}/>
      <Route exact path='/pmc' element={<PMC/>}/>
    </Routes>
    </>
  );
}

export default App;
