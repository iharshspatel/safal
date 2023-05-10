import React, { useEffect, useState } from 'react'
import Styles from './StatBox.module.css'
import ArchitectStat from '../../Assets/Stats/ArchitectStat.svg'
import MistryStat from '../../Assets/Stats/MistryStats.svg'
import CustomerStat from '../../Assets/Stats/CustomerStats1.svg'
import HealthStat from '../../Assets/Stats/HealthStats.svg'
import axios from 'axios'
import Navigation from './Navigation'
import Logo from './Logo'
import { IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import Box from "@mui/material/Box";
// import IconButton from "@mui/material/IconButton"
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const StatBox = ({ name, username, refresh }) => {
  //drawer
  const [open, setState] = useState(false);
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    //changes the function state according to the value of open
    setState(open);
    console.log(open);
  };
  const [totalarchitect, setTotalArchitect] = useState(0);
  const [totalmistry, setTotalMistry] = useState(0);
  const [totaldealer, setTotalDealer] = useState(0);
  const [totalbranches, setTotalBranches] = useState(0);
  const [totalcustomers, setTotalCustomer] = useState(0);
  const [totalPMC, setTotalPMC] = useState(0);
  const [totalHealth, setTotalHealth] = useState(0);
  const [totaltasks, setTotalTask] = useState(0);

  const getStats = async () => {
    {
      let { data } = await axios.get("/api/v1/architect/totalarchitects");
      let { archlength } = data
      setTotalArchitect(archlength);
    }
    {
      let { data } = await axios.get("/api/v1/branch/totalbranchess");
      let { branchsize } = data
      console.log(data);
      setTotalBranches(branchsize);
    }

    {
      let { data } = await axios.get("/api/v1/customer/totalCustomers");
      let { custlength } = data
      setTotalCustomer(custlength);
    }

    {
      let { data } = await axios.get("/api/v1/dealer/totalDealer");
      let { dealerlength } = data
      setTotalDealer(dealerlength);
    }

    {
      let { data } = await axios.get("/api/v1/mistry/totalMistry");
      let { mistrylength } = data
      setTotalMistry(mistrylength);
    }

    {
      let { data } = await axios.get("/api/v1/pmc/totalPMC");
      let { pmclength } = data
      setTotalPMC(pmclength);
    }

    {
      let { data } = await axios.get("/api/v1/task/totaltasks");
      let { taskslength } = data
      setTotalTask(taskslength);
    }

    let { data } = await axios.get("/api/v1/customer/totalOrder");
    let { orderValue } = data
    setTotalHealth(orderValue);
  }
  useEffect(() => {
    getStats();
  }, [refresh]);
  return (
    <>
      <nav className={Styles.nav}>
        <IconButton className={Styles.IconButton} >
          <MenuIcon className={Styles.toggle} style={{ color: "whitesmoke" }} fontSize='large' onClick={toggleDrawer(true)} />
        </IconButton>
        {/* {name}</h1> */}
        <h4 className={Styles.LogoText}>Safal Marketing</h4>
        <div className={Styles.user}>
          <AccountCircleIcon fontSize='large' />
          {name === "Architect" && <p>Total Architect : {totalarchitect}</p>}
          {name === "Mistry" && <p>Total Mistry : {totalmistry}</p>}
          {name === "PMC" && <p>Total PMC : {totalPMC}</p>}
          {name === "Customer" && <p>Total Customer : {totalcustomers}</p>}
          {name === "Dealer" && <p>Total Customer : {totalcustomers}</p>}
          {name === "Branch" && <p>Total Branches : {totalbranches}</p>}
          {name === "Task" && <p>Total Tasks : {totaltasks}</p>}
          {/* {username} */}
        </div>
      </nav>
      <div className={Styles.container}>
        <Drawer
          anchor="left"
          open={open}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          <Box sx={{
            p: 2,
            height: 1,
            backgroundColor: "#F0F0F0B7",

          }}>
            <IconButton sx={{ mb: 2 }}>
              <CloseIcon onClick={toggleDrawer(false)} />
            </IconButton>
            <Logo />
            <Navigation />
          </Box>
        </Drawer>

        <div className={Styles.BoxContainers}>
          <div className={Styles.heading} >
            <h1>{name}</h1>
          </div>
          {name == "Architect" && <div className={Styles.Box}>
            <div className={Styles.subBox}>
              <p>Total Architect</p>
              <h1>{totalarchitect}</h1>
            </div>

            <div className={Styles.imgContainer}>
              <img src={ArchitectStat} alt="Architect" />
            </div>
          </div>}


          {name == "Mistry" && <div className={Styles.Box}>
            <div className={Styles.subBox}>
              <p>Total Mistry</p>
              <h1 className={Styles.numbers}>{totalmistry}</h1>
            </div>

            <div className={Styles.imgContainer}>
              <img src={MistryStat} alt="Architect" />
            </div>
          </div>}


          {name == "Customer" && <div className={Styles.Box}>
            <div className={Styles.subBox}>
              <p>Total Customers</p>
              <h1>{totalcustomers}</h1>
            </div>

            <div className={Styles.imgContainer}>
              <img src={CustomerStat} alt="Architect" />
            </div>
          </div>}

          {name === "Task" && <div className={Styles.Box}>
            <div className={Styles.subBox}>
              <p>Total Tasks</p>
              <h1>{totaltasks}</h1>
            </div>

            <div className={Styles.imgContainer}>
              <img src={CustomerStat} alt="Architect" />
            </div>
          </div>}

        </div>
      </div></>
  )
}

export default StatBox