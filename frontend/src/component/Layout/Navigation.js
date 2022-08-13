import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'
import Styles from './Navigation.module.css'
import customer from '../../Assets/Menu/Customers-menu.svg'
import customerSelected from '../../Assets/Menu/Customers-menu-selected.svg'
import architect from '../../Assets/Menu/VectorArchitectMenu.svg'
import architectSelected from '../../Assets/Menu/VectorArchitectMenu-selected.svg'
import pmc from '../../Assets/Menu/PMCmenu.svg'
import pmcSelected from '../../Assets/Menu/PMCmenu-selected.svg'
import dealer from '../../Assets/Menu/VectorDealerMenu.svg'
import dealerSelected from '../../Assets/Menu/VectorDealerMenu-selected.svg'
const Navigation = () => {
  return (
    <div className={Styles.container}>
        <Logo/>

        <ul className={Styles.itemContainer}>
            <Link to="/" className={Styles.item}>
                <img src={customer} alt="customer"/>
                <p>Customer</p>
                
            </Link>

            <Link to="/architect" className={Styles.item}>
                <img src={architect} alt="customer"/>
               <p>Architect</p> 
            </Link>

            <Link to="/mistry" className={Styles.item}>
                <img src={pmc} alt="customer"/>
               <p>Mistry</p> 
            </Link>

            <Link to="/pmc" className={Styles.item}>
                <img src={pmc} alt="customer"/>
               <p>PMC</p>  
            </Link>

            <Link to="/dealer" className={Styles.item}>
                <img src={dealer} alt="customer"/>
               <p>Dealer</p> 
            </Link>


        </ul>

    </div>
  )
}

export default Navigation