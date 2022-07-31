import React,{useState} from 'react'
import CustomerCreateForm from '../../Forms/CustomerCreateForm'
import Modal from '../../Layout/Modal/Modal'
import Navigation from '../../Layout/Navigation'
import StatBox from '../../Layout/StatBox'
import CustomerTable from '../../Tables/Customer/CustomerTable'
import Styles from './Customer.module.css'

const Customer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const modalHandler = () => {
    setIsOpen(!isOpen);
  }

  return (
    <>
    <div className={Styles.container}>
    <Navigation/>
    <div className={Styles.rightcontainer}>
    <StatBox name="Customer"/>
    <CustomerTable modalHandler={modalHandler}/>
    {
      isOpen ? <Modal><CustomerCreateForm modalHandler={modalHandler}/></Modal>: null
    }
    </div>
    </div>
    </>
  )
}

export default Customer