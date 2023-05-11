import React, { useState, useEffect } from 'react'
import Modal from '../../Layout/Modal/Modal'
import StatBox from '../../Layout/StatBox'
import TaskTable from '../../Tables/Task/TaskTable'
import Styles from './Task.module.css'
import { AnimatePresence, motion } from 'framer-motion'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify'
import TaskCreateForm from '../../Forms/TaskCreateForm'
const Task = () => {
    const [isOpen, setIsOpen] = useState(false);
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
    const [refresh, doRefresh] = useState(true);

    const handleCallbackCreate = (childData) => {
        toast.success("Task Created");
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
                    <StatBox name="Task" username={user.name} refresh={refresh} />
                    <TaskTable modalHandler={modalHandler} refresh={refresh} isOpen={isOpen} doRefresh={doRefresh} />
                    {
                        isOpen ? <Modal setIsOpen={setIsOpen}>
                            <AnimatePresence>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ scale: 0 }}>
                                    <TaskCreateForm modalHandler={modalHandler} setIsOpen={setIsOpen} parentCallback={handleCallbackCreate} />
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

export default Task