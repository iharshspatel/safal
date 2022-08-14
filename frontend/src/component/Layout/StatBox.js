import React, {useEffect, useState} from 'react'
import Styles from './StatBox.module.css'
import ArchitectStat from '../../Assets/Stats/ArchitectStat.svg'
import MistryStat from '../../Assets/Stats/MistryStats.svg'
import CustomerStat from '../../Assets/Stats/CustomerStats1.svg'
import HealthStat from '../../Assets/Stats/HealthStats.svg'
import axios from 'axios'

const StatBox = ({name}) => {
  const [totalarchitect, setTotalArchitect] = useState(0);
  const [totalmistry, setTotalMistry] = useState(0);
  const [totaldealer, setTotalDealer] = useState(0);
  const [totalcustomers, setTotalCustomer] = useState(0);
  const [totalPMC, setTotalPMC] = useState(0);
 const [totalHealth, setTotalHealth] = useState(0);
  const getStats = async() => {
    {
   let {data} = await axios.get("/api/v1/architect/totalarchitects");
   let {archlength} = data
   setTotalArchitect(archlength);
    }

    {
   let {data} = await axios.get("/api/v1/customer/totalCustomers");
   let {custlength} = data
   setTotalCustomer(custlength);
    }

    {
   let {data} = await axios.get("/api/v1/dealer/totalDealer");
   let {dealerlength} = data
   setTotalDealer(dealerlength);
    }

    {
   let {data} = await axios.get("/api/v1/mistry/totalMistry");
   let {mistrylength} = data
   setTotalMistry(mistrylength);
    }

    {
   let {data} = await axios.get("/api/v1/pmc/totalPMC");
   let {pmclength} = data
   setTotalPMC(pmclength);
    }

    let {data} = await axios.get("/api/v1/customer/totalOrder");
    let {orderValue} = data
    setTotalHealth(orderValue);
   
   
  
  
  

  }
  useEffect(() => {
    getStats();
  }, []);
  return (
    <div className={Styles.container}>
      <h1 className={Styles.header}>{name}</h1>

      <div className={Styles.BoxContainers}>
        <div className={Styles.Box}>
          <div className={Styles.subBox}>
            <p>Total Architect</p>
            <h1>{totalarchitect}</h1>
          </div>

          <div className={Styles.imgContainer}>
            <img src={ArchitectStat} alt="Architect"/>
          </div>
        </div>

        <div className={Styles.Box}>
        <div className={Styles.subBox}>
            <p>Total Mistry</p>
            <h1 className={Styles.numbers}>{totalmistry}</h1>
          </div>

          <div className={Styles.imgContainer}>
            <img src={MistryStat} alt="Architect"/>
          </div>
          </div>

          <div className={Styles.Box}>
          <div className={Styles.subBox}>
            <p>Total Customers</p>
            <h1>{totalcustomers}</h1>
          </div>

          <div className={Styles.imgContainer}>
            <img src={CustomerStat} alt="Architect"/>
          </div>
          
          </div>

          <div className={Styles.Box}>
          <div className={Styles.subBox}>
            <p>Total Health</p>
            <h1>{totalHealth}</h1>
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