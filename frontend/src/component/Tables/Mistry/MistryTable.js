import React from 'react';
import { Link } from 'react-router-dom';
import Styles from './MistryTable.module.css'
import Add  from '../../../Assets/Add.svg'

const MistryTable = ({modalHandler}) => {
  return (
    <div className={Styles.container}>
    <div className={Styles.table}>
    <div className={Styles.header}>
    <h3>All Mistry</h3>

    <div className={Styles.buttonContainer}>
     <img className={Styles.addImg} src={Add} alt="add" />
        <p className={Styles.buttonText} onClick={modalHandler}> 
        Add Mistry
     </p>
     </div>
    </div>
    </div>

    <div className={Styles.filter}>

    </div>
    </div>
  )
}

export default MistryTable