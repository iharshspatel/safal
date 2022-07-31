import React from 'react';
import Styles from './Modal.module.css'

const Modal = ({children}) => {
  return (
    <div className={Styles.container}>
        {children}
    </div>
  )
}

export default Modal