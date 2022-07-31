import React from 'react';
import { Link } from 'react-router-dom';
import Styles from './CustomerTable.module.css'
import Add  from '../../../Assets/Add.svg'

const CustomerTable = ({modalHandler}) => {
  return (
    <div className={Styles.container}>
    <div className={Styles.table}>
    <div className={Styles.header}>
    <h3>All Customers</h3>

    <div className={Styles.buttonContainer}>
     <img className={Styles.addImg} src={Add} alt="add" />
        <p className={Styles.buttonText} onClick={modalHandler}> 
        Add Customer
     </p>
     </div>
    </div>
    </div>

    <div className={Styles.filter}>

    </div>
    </div>
  )
}

export default CustomerTable