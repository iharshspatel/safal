import React,{useState,useEffect} from 'react'
import ArchitectCreateForm from '../../Forms/ArchitectCreateForm'
import Modal from '../../Layout/Modal/Modal'
import Navigation from '../../Layout/Navigation'
import StatBox from '../../Layout/StatBox'
import ArchitecTable from '../../Tables/Architect/ArchitectTable'
import Styles from './Architect.module.css'
import {AnimatePresence, motion} from 'framer-motion'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify'
const Architect = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  let navigate= useNavigate();
  const handleCallbackCreate = (childData) => {
    // console.log("Parent Invoked!!")
    toast.success("Architect is Created");
  }
  useEffect(()=>{
    if(!isAuthenticated){
      navigate('/signin')
    }
  },[isAuthenticated,navigate]);
  const modalHandler = () =>{
    setIsOpen(!isOpen);
  }

  return (
    <>
    <div className={Styles.container}>
    {/* <Navigation/> */}
    <ToastContainer
          position="top-right"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
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
            <ArchitectCreateForm modalHandler={modalHandler} setIsOpen={setIsOpen} parentCallback={handleCallbackCreate} />
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