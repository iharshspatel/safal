import { AnimatePresence,motion } from 'framer-motion'
import React,{useState,useEffect} from 'react'
import BranchCreateForm from '../../Forms/BranchCreateForm'
import Modal from '../../Layout/Modal/Modal'
import Navigation from '../../Layout/Navigation'
import StatBox from '../../Layout/StatBox'
import BranchTable from '../../Tables/Branch/branchTable'
import Styles from './Branch.module.css'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify'
const Branch = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [refresh, doRefresh] = useState(true);

  const modalHandler = () => {
    setIsOpen(!isOpen);
  }
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  let navigate= useNavigate();
  useEffect(()=>{
    if(!isAuthenticated){
      navigate('/signin')
    }
  },[isAuthenticated,navigate]);
  const handleCallbackCreate = (childData) => {
    
    toast.success("Branch is Created");
    doRefresh(!refresh);
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
    <StatBox name="Branch" username={user.name}/>
    <BranchTable modalHandler={modalHandler} refresh={refresh} isOpen={isOpen}/>
    {
      isOpen ? <Modal setIsOpen={setIsOpen}>
        <AnimatePresence>
          <motion.div
          initial={{ opacity: 0, scale:0 }}
          animate={{ opacity: 1, scale:1 }}
          exit={{ scale:0 }}>
            <BranchCreateForm modalHandler={modalHandler} setIsOpen={setIsOpen} parentCallback={handleCallbackCreate}/>
          </motion.div>
        </AnimatePresence>
      </Modal>: null
    }
    </div>
    </div>
    </>
  )
}

export default Branch