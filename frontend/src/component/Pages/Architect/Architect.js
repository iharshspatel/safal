import React,{useState} from 'react'
import ArchitectCreateForm from '../../Forms/ArchitectCreateForm'
import Modal from '../../Layout/Modal/Modal'
import Navigation from '../../Layout/Navigation'
import StatBox from '../../Layout/StatBox'
import ArchitecTable from '../../Tables/Architect/ArchitectTable'
import Styles from './Architect.module.css'
import {AnimatePresence, motion} from 'framer-motion'

const Architect = () => {
  const [isOpen, setIsOpen] = useState(false);

  const modalHandler = () =>{
    setIsOpen(!isOpen);
  }

  return (
    <>
    <div className={Styles.container}>
    <Navigation/>
    <div className={Styles.rightcontainer}>
    <StatBox name="Architect"/>
    <ArchitecTable modalHandler={modalHandler} />
    {
      isOpen ? <Modal setIsOpen={setIsOpen}>
        <AnimatePresence>
          <motion.div
          initial={{ opacity: 0, scale:0 }}
          animate={{ opacity: 1, scale:1 }}
          exit={{ scale:0 }}>
            <ArchitectCreateForm modalHandler={modalHandler}/>
          </motion.div>
        </AnimatePresence>
        </Modal>: null
    }
    </div>
    </div>
    </>
  )
}

export default Architect