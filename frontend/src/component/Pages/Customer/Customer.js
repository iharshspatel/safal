import React,{useState} from 'react'
import CustomerCreateForm from '../../Forms/CustomerCreateForm'
import Modal from '../../Layout/Modal/Modal'
import Navigation from '../../Layout/Navigation'
import StatBox from '../../Layout/StatBox'
import CustomerTable from '../../Tables/Customer/CustomerTable'
import Styles from './Customer.module.css'
import { AnimatePresence,motion } from 'framer-motion'

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
      isOpen ? <Modal setIsOpen={setIsOpen}>
        <AnimatePresence>
          <motion.div
          initial={{ opacity: 0, scale:0 }}
          animate={{ opacity: 1, scale:1 }}
          exit={{ scale:0 }}>
        <CustomerCreateForm modalHandler={modalHandler}/>
        </motion.div>
        </AnimatePresence>
        </Modal>
        : null
    }
    </div>
    </div>
    </>
  )
}

export default Customer