import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Styles from './Home.module.css'
const Home = () => {

  const navigate = useNavigate()
  const {user} = useSelector(state=> state.user)


  return (
    <div className={Styles.box}>
      <h4 className={Styles.header}>Hello</h4>
    </div>
  )
}

export default Home