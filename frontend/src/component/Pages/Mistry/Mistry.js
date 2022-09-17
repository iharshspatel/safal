import React,{useState,useEffect} from 'react'
import MistryCreateForm from '../../Forms/MistryCreateForm'
import Modal from '../../Layout/Modal/Modal'
import Navigation from '../../Layout/Navigation'
import StatBox from '../../Layout/StatBox'
import MistryTable from '../../Tables/Mistry/MistryTable'
import Styles from './Mistry.module.css'
import {AnimatePresence, motion} from 'framer-motion'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
const Mistry = () => {
  const [isOpen, setIsOpen] = useState(false);

  const modalHandler = () => {
    setIsOpen(!isOpen);
  }
  const { user, isAuthenticated } = useSelector((state) => state.user);
  let navigate= useNavigate();
  useEffect(()=>{
    if(!isAuthenticated){
      navigate('/signin')
    }
  },[isAuthenticated,navigate]);
  return (
    <>
    <div className={Styles.container}>
    <Navigation/>
    <div className={Styles.rightcontainer}>
    <StatBox name="Mistry"/>
    <MistryTable modalHandler={modalHandler}/>
    {
      isOpen ? <Modal setIsOpen={setIsOpen}>
        <AnimatePresence>
          <motion.div
          initial={{ opacity: 0, scale:0 }}
          animate={{ opacity: 1, scale:1 }}
          exit={{ scale:0 }}>
            <MistryCreateForm modalHandler={modalHandler}/>
          </motion.div>
        </AnimatePresence>
      </Modal>: null
    }
    </div>
    </div>
    </>
  )
}

export default Mistry