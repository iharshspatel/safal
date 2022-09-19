import React, {useEffect, useState} from 'react'
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
import OpenIcon from "@mui/icons-material";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FolderIcon from "@mui/icons-material/Folder";
import ImageIcon from "@mui/icons-material/Image";
import DescriptionIcon from "@mui/icons-material/Description";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button"; 
const StatBox = ({name}) => {
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
     <Drawer
              //from which side the drawer slides in
              anchor="left"
              //if open is true --> drawer is shown
              open={open}
              //function that is called when the drawer should close
              onClose={toggleDrawer(false)}
              //function that is called when the drawer should open
              onOpen={toggleDrawer(true)}
            >
            {/* <Navigation/> */}
            {/* The inside of the drawer */}
            <Box sx={{
                  p: 2,
                  height: 1,
                  marginTop:0,
                  backgroundColor: "#DBC8FF",
                  // backgroundColor: "#F0F0F0B7",

                }}>
                  <IconButton sx={{mb: 2}}>
                    <CloseIcon onClick={toggleDrawer(false)} />
                  </IconButton>
                  <Navigation/>
                  </Box>
            </Drawer>
    
      <h1 className={Styles.header}>
      <IconButton >
          <MenuIcon className={Styles.toggle} fontSize='large' onClick={toggleDrawer(true)} />
        </IconButton>
      {name}</h1>

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
          <Logo/>
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