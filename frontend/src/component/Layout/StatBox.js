import React from 'react'
import Styles from './StatBox.module.css'
import ArchitectStat from '../../Assets/Stats/ArchitectStat.svg'
import MistryStat from '../../Assets/Stats/MistryStats.svg'
import CustomerStat from '../../Assets/Stats/CustomerStats1.svg'
import HealthStat from '../../Assets/Stats/HealthStats.svg'

const StatBox = ({name}) => {
  return (
    <div className={Styles.container}>
      <h1 className={Styles.header}>{name}</h1>

      <div className={Styles.BoxContainers}>
        <div className={Styles.Box}>
          <div className={Styles.subBox}>
            <p>Total Architect</p>
            <h1>678</h1>
          </div>

          <div className={Styles.imgContainer}>
            <img src={ArchitectStat} alt="Architect"/>
          </div>
        </div>

        <div className={Styles.Box}>
        <div className={Styles.subBox}>
            <p>Total Mistry</p>
            <h1 className={Styles.numbers}>678</h1>
          </div>

          <div className={Styles.imgContainer}>
            <img src={MistryStat} alt="Architect"/>
          </div>
          </div>

          <div className={Styles.Box}>
          <div className={Styles.subBox}>
            <p>Total Customers</p>
            <h1>678</h1>
          </div>

          <div className={Styles.imgContainer}>
            <img src={CustomerStat} alt="Architect"/>
          </div>
          
          </div>

          <div className={Styles.Box}>
          <div className={Styles.subBox}>
            <p>Total Health</p>
            <h1>678</h1>
          </div>

          <div className={Styles.imgContainer}>
            <img src={HealthStat} alt="Architect"/>
          </div>
          </div>
      </div>
    </div>
  )
}

export default StatBox