import React, { useState, useEffect } from 'react'
import Styles from './BranchCreateForm.module.css'
import { AiFillCloseCircle } from 'react-icons/ai'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify'
import Select from 'react-select'
import { default as ReactSelect } from "react-select";
import Option from '../DropDown/Options'

const BranchCreateForm = ({ modalHandler, setIsOpen, parentCallback }) => {
    let initialState = {
        branchname: "",


    }
    const [formData, setFormData] = useState(initialState);
    const [isDisabled, setIsDisabled] = useState(false);
// 

    const formHandler = (e) => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    // useEffect(() => {

    // }, []);
    const submitHandler = async (e) => {
        e.preventDefault();
        setIsDisabled(true);
        let data = {
            branchname: formData.branchname,
        }
        console.log(data)
        try {
            const response = await axios.post("/api/v1/branch/create", data, { headers: { "Content-Type": "application/json" } });
            console.log(response);

            parentCallback(true);
            setIsOpen(false);

        }
        catch (e) {
            toast.error(e.response.data.message);
            console.log(e.response.data.message)
            setIsDisabled(false);
        }

    }






    return (
        <div className={Styles.container}>
            <div className={Styles.closebutton} onClick={modalHandler}>
                <AiFillCloseCircle />
            </div>
            <h1 className={Styles.heading}>branch Details</h1>
            <div className={Styles.personalDetails}>

                <div className={Styles.personalDetails1}>

                    <label htmlFor='name'>Name</label>
                    <input className={Styles.inputTag} onChange={(e) => { formHandler(e) }} value={formData.name} name="branchname" placeholder='branch Name' />
                </div>


            </div>

           
            <button disabled={isDisabled} className={isDisabled ? Styles.disable : Styles.submitButton} onClick={submitHandler} type="Submit">Submit</button>
        </div>
    )
}

export default BranchCreateForm