import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'
import Styles from './Navigation.module.css'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { logout} from '../../actions/userAction'
import customer from '../../Assets/Menu/Customers-menu.svg'
import customerSelected from '../../Assets/Menu/Customers-menu-selected.svg'
import architect from '../../Assets/Menu/VectorArchitectMenu.svg'
import architectSelected from '../../Assets/Menu/VectorArchitectMenu-selected.svg'
import pmc from '../../Assets/Menu/PMCmenu.svg'
import LogoutIcon from '@mui/icons-material/Logout';
import pmcSelected from '../../Assets/Menu/PMCmenu-selected.svg'
import dealer from '../../Assets/Menu/VectorDealerMenu.svg'
import dealerSelected from '../../Assets/Menu/VectorDealerMenu-selected.svg'

import Man4Icon from '@mui/icons-material/Man4'; //customer
import ArchitectureIcon from '@mui/icons-material/Architecture'; //architect
import EngineeringIcon from '@mui/icons-material/Engineering'; //mistry
import MultipleStopIcon from '@mui/icons-material/MultipleStop'; //dealer
import ApartmentIcon from '@mui/icons-material/Apartment'; //PMC
const Navigation = () => {
    const dispatch = useDispatch();
    function handleclick(){
        dispatch(logout());
    }
    const location = useLocation();

    const [homepath, setHomepath] = useState(true);
    const [architectpath, setArchitectpath] = useState(false);
    const [mistrypath, setMistrypath] = useState(false);
    const [dealerpath, setDealerpath] = useState(false);
    const [pmcpath, setPMCpath] = useState(false);
    useEffect(() => {
        if(location.pathname==="/"){
            setHomepath(true)
        }
        else if(location.pathname==="/architect"){
            setHomepath(false);
            setArchitectpath(true);
        }
        else if(location.pathname==="/mistry"){
            setHomepath(false);
            setArchitectpath(false);
            setMistrypath(true);
        }
        else if(location.pathname==="/dealer"){
            setHomepath(false);
            setArchitectpath(false);
            setMistrypath(false);
            setDealerpath(true);
        }
        else if(location.pathname==="/pmc"){
            setHomepath(false);
            setArchitectpath(false);
            setMistrypath(false);
            setDealerpath(false);
            setPMCpath(true)
        }
        else{
            setHomepath(false);
            setArchitectpath(false);
            setMistrypath(false);
            setDealerpath(false);
            setPMCpath(false)
        }
    }, []);

  return (
    <div className={Styles.container}>
        {/* <Logo/> */}

        <ul className={Styles.itemContainer}>
            <Link to="/" className={homepath ? ` ${Styles.item} ${Styles.selected}` : ` ${Styles.item}`}>
                {/* <img src={homepath ? customerSelected : customer} alt="customer"/> */}
                <Man4Icon/>
                <p>Customer</p>
                
            </Link>

            <Link to="/architect" className={architectpath ? ` ${Styles.item} ${Styles.selected}` : ` ${Styles.item}`}>
                {/* <img src={architectpath ? architectSelected : architect} alt="customer"/> */}
                <ArchitectureIcon/>
               <p>Architect</p> 
            </Link>

            <Link to="/mistry" className={mistrypath ? ` ${Styles.item} ${Styles.selected}` : ` ${Styles.item}`}>
                {/* <img src={mistrypath ? pmcSelected : pmc} alt="customer"/> */}
                <EngineeringIcon/>
               <p>Mistry</p> 
            </Link>

            <Link to="/pmc" className={pmcpath ? ` ${Styles.item} ${Styles.selected}` : ` ${Styles.item}`}>
                {/* <img src={pmcpath ? pmcSelected : pmc} alt="customer"/> */}
                <ApartmentIcon/>
               <p>PMC</p>  
            </Link>

            <Link to="/dealer" className={dealerpath ? ` ${Styles.item} ${Styles.selected}` : ` ${Styles.item}`}>
                {/* <img src={dealerpath ? dealerSelected : dealer} alt="customer"/> */}
                <MultipleStopIcon/>
               <p>Dealer</p> 
            </Link>
            <button className={Styles.button} onClick={handleclick}  >
            <LogoutIcon/>
            <p>Logout</p>
            </button>


        </ul>

    </div>
  )
}

export default Navigation