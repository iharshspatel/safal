import { AnimatePresence,motion } from 'framer-motion'
import React,{useState} from 'react'
import PMCCreateForm from '../../Forms/PMCCreateForm'
import Modal from '../../Layout/Modal/Modal'
import Navigation from '../../Layout/Navigation'
import StatBox from '../../Layout/StatBox'
import PMCTable from '../../Tables/PMC/PMCTable'
import Styles from './PMC.module.css'

const PMC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const modalHandler = () => {
    setIsOpen(!isOpen);
  }

  return (
    <>
    <div className={Styles.container}>
    <Navigation/>
    <div className={Styles.rightcontainer}>
    <StatBox name="PMC"/>
    <PMCTable modalHandler={modalHandler}/>
    {
      isOpen ? <Modal>
        <AnimatePresence>
          <motion.div
          initial={{ opacity: 0, scale:0 }}
          animate={{ opacity: 1, scale:1 }}
          exit={{ scale:0 }}>
            <PMCCreateForm modalHandler={modalHandler}/>
          </motion.div>
        </AnimatePresence>
        </Modal>: null
    }
    </div>
    </div>
    </>
  )
}

export default PMC