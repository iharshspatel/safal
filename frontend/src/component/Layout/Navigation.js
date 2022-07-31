import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'
import Styles from './Navigation.module.css'
import customer from '../../Assets/Menu/Customers-menu.svg'
import architect from '../../Assets/Menu/VectorArchitectMenu.svg'
import pmc from '../../Assets/Menu/PMCmenu.svg'
import dealer from '../../Assets/Menu/VectorDealerMenu.svg'

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