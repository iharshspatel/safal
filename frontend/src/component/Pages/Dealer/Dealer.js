import { AnimatePresence,motion } from 'framer-motion'
import React,{useState} from 'react'
import DealerCreateForm from '../../Forms/DealerCreateForm'
import Modal from '../../Layout/Modal/Modal'
import Navigation from '../../Layout/Navigation'
import StatBox from '../../Layout/StatBox'
import DealerTable from '../../Tables/Dealer/DealerTable'
import Styles from './Dealer.module.css'

const Dealer = () => {

  const [isOpen, setIsOpen] = useState(false);

  const modalHandler = () => {
    setIsOpen(!isOpen);
  }

  return (
    <>
    <div className={Styles.container}>
    <Navigation/>
    <div className={Styles.rightcontainer}>
    <StatBox name="Dealer"/>
    <DealerTable modalHandler={modalHandler}/>
    {
      isOpen ? <Modal setIsOpen={setIsOpen}>
        <AnimatePresence>
          <motion.div
          initial={{ opacity: 0, scale:0 }}
          animate={{ opacity: 1, scale:1 }}
          exit={{ scale:0 }}>
            <DealerCreateForm modalHandler={modalHandler}/>
          </motion.div>
        </AnimatePresence>
      </Modal>: null
    }
    </div>
    </div>
    </>
  )
}

export default Dealer