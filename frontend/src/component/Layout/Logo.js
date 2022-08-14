import React from 'react'
import Styles from './Logo.module.css'
import logo from '../../Assets/Menu/safal logo.png'
const Logo = () => {
  return (
    <div className={Styles.container}>
        <img src={logo} />
    </div>
  )
}

export default Logo