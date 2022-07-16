import React,{useEffect} from 'react';
import {Routes, Route} from 'react-router-dom'
import './App.css';
import {useDispatch, useSelector} from "react-redux"
import Home from './component/Home';
import { loaduser } from './actions/userAction';
function App() {
   const dispatch = useDispatch();

   const {loading, isAuthenticated, user } = useSelector(state => state.user)


  useEffect(() => {
    dispatch(loaduser())
  },[])

  return (
    <>
    <Routes>
      <Route exact path='/' element={<Home/>}/>
    </Routes>
    </>
  );
}

export default App;
