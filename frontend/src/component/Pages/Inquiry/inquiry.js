import React, { useState, useEffect } from 'react'
import CustomerCreateForm from '../../Forms/CustomerCreateForm'
import Modal from '../../Layout/Modal/Modal'
import Navigation from '../../Layout/Navigation'
import StatBox from '../../Layout/StatBox'
import InquiryTable from '../../Tables/Inquiry/inquiryTable'
import Styles from '../Customer/Customer.module.css'
import { AnimatePresence, motion } from 'framer-motion'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify'
import InquiryCreateForm from '../../Forms/inquiryCreateform'
import InquiryFilterForm from '../../Filter/inquiryfilterform'
const Inquiry= () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin')
    }
 
  }, [isAuthenticated]);

  const modalHandler = () => {
    setIsOpen(!isOpen);
    
  }
  const modalHandler2 = () => {
    setIsOpen2(!isOpen2);
    
  }
  const [refresh, doRefresh] = useState(true);

  const handleCallbackCreate = (childData) => {
    // console.log("Parent Invoked!!")
    toast.success("inquiry is Created");
    doRefresh(!refresh);

  }
  return (
    <>
      <div className={Styles.container}>
        {/* <Navigation /> */}
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
          <StatBox name="Inquiry" username={user.name}/>
          <InquiryTable modalHandler={modalHandler} modalHandler2={modalHandler2} isOpen={isOpen} refresh={refresh}/>
          {
            isOpen ? <Modal setIsOpen={setIsOpen}>
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ scale: 0 }}>
                  {/* <CustomerCreateForm modalHandler={modalHandler} setIsOpen={setIsOpen} parentCallback={handleCallbackCreate} /> */}
                  <InquiryCreateForm modalHandler={modalHandler} setIsOpen={setIsOpen} parentCallback={handleCallbackCreate} />
                </motion.div>
              </AnimatePresence>
            </Modal>
              : null
          }
          {
            isOpen2 ? <Modal setIsOpen={setIsOpen2}>
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ scale: 0 }}>
                  {/* <CustomerCreateForm modalHandler={modalHandler} setIsOpen={setIsOpen} parentCallback={handleCallbackCreate} /> */}
                  <InquiryFilterForm modalHandler2={modalHandler2} setIsOpen2={setIsOpen2}  />
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

export default Inquiry