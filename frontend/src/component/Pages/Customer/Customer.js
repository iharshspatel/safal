import React, { useState, useEffect } from 'react'
import CustomerCreateForm from '../../Forms/CustomerCreateForm'
import Modal from '../../Layout/Modal/Modal'
import Navigation from '../../Layout/Navigation'
import StatBox from '../../Layout/StatBox'
import CustomerTable from '../../Tables/Customer/CustomerTable'
import Styles from './Customer.module.css'
import { AnimatePresence, motion } from 'framer-motion'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify'
const Customer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  let navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin')
    }
 
  }, [isAuthenticated, navigate]);

  const modalHandler = () => {
    setIsOpen(!isOpen);
  }
  const handleCallback = (childData) => {
    // console.log("Parent Invoked!!")
    toast.success("customer is Created");
  }
  return (
    <>
      <div className={Styles.container}>
        <Navigation />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {/* Same as */}
        <ToastContainer />
        <div className={Styles.rightcontainer}>
          <StatBox name="Customer" />
          <CustomerTable modalHandler={modalHandler} />
          {
            isOpen ? <Modal setIsOpen={setIsOpen}>
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ scale: 0 }}>
                  <CustomerCreateForm modalHandler={modalHandler} setIsOpen={setIsOpen} parentCallback={handleCallback} />
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