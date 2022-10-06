import React, { useState, useEffect } from 'react'
import Styles from './ArchitectCreateForm.module.css'
import { AiFillCloseCircle } from 'react-icons/ai'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify'
import Option from '../DropDown/Options'
import Select from 'react-select'
import { default as ReactSelect } from "react-select";

const ArchitectEditForm = ({ modalHandler, data, setIsOpen, parentCallback }) => {
    const [Branches, setBranches] = useState([]);
    const [selectedBranch, setselectedBranch] = useState(data.branches);
    const [Salesmen, setSalesmen] = useState([]);
    const [selectedSalesman, setselectedSalesman] = useState(data.salesmen);
    const arr2 = selectedSalesman.map(object => {
        // console.log(object);
        return { ...object, value: object.name, label: object.name };
    })
    const getAllsalesmen = async () => {
        const { data } = await axios.get("/api/v1/salesman/getall");
        const salesmen = data.salesmans.map((branch) => (
            {
                name: branch.name,
                value: branch.name,
                label: branch.name
            }
        ))
        setSalesmen(salesmen);
    }
    const Salesmenchangehandler = (selected) => {

        setselectedSalesman(selected);
        console.log(selected);
        setFormData({ ...formData, selectedSalesman })
    };
    const arr = selectedBranch.map(object => {
        return { ...object, value: object.branchname, label: object.branchname };
    })
    const getAllbranches = async () => {
        const { data } = await axios.get("/api/v1/branch/getall");
        const branches = data.branches.map((branch) => (
            {
                branchname: branch.branchname,
                value: branch.branchname,
                label: branch.branchname
            }
        ))
        setBranches(branches);
    }
    let initialState = {
        name: data.name,
        email: data.email,
        mobileno: data.mobileno,
        address: data.address,
        companyName: data.companyName,
        birthdate: data.birthdate ? data.birthdate.substr(0, 10) : null,
        marriagedate: data.marriagedate ? data.marriagedate.substr(0, 10) : null,
        remarks: data.remarks,
        bankname: data.bankname,
        branchname: data.branchname,
        IFSCcode: data.IFSCcode,
        adharcard: data.adharcard,
        pancard: data.pancard,
        date: data.date ? data.date.substr(0, 10) : null,
        branches: data.branches,
        salesmen:data.salesmen
    }
    let id = data._id;
    const [formData, setFormData] = useState(initialState)
    const [isDisabled, setIsDisabled] = useState(false);

    const formHandler = (e) => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    useEffect(() => {
        getAllbranches();
        getAllsalesmen();
    }, []);
    const submitHandler = async (e) => {
        e.preventDefault();
        setIsDisabled(true);
        let data = {
            name: formData.name,
            email: formData.email,
            mobileno: formData.mobileno,
            address: formData.address,
            companyName: formData.companyName,
            birthdate: formData.birthdate,
            marriagedate: formData.marriagedate,
            remarks: formData.remarks,
            bankname: formData.bankname,
            branchname: formData.branchname,
            adharcard: formData.adharcard,
            pancard: formData.pancard,
            date: formData.date,
            IFSCcode: formData.IFSCcode,
            branches: selectedBranch,
            salesmen:selectedSalesman
        }
        console.log(data)
        try {
            const response = await axios.put(`/api/v1/architect/update/${id}`, data, { headers: { "Content-Type": "application/json" } });
            console.log(response);
            // toast.success("Architech is Edited ");
            parentCallback();
            setIsOpen(false);

        }
        catch (e) {
            toast.error(e.response.data.message);
            console.log(e.response.data.message)
            setIsDisabled(false);
        }

    }
    const Branchchangehandler = (selected) => {

        setselectedBranch(selected);
        console.log(selected);
        setFormData({ ...formData, selectedBranch })
    };
    
    return (
        <div className={Styles.container}>
            {/* <ToastContainer
position="top-right"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/> */}
            {/* Same as */}
            {/* <ToastContainer /> */}
            <div className={Styles.closebutton} onClick={modalHandler}>
                <AiFillCloseCircle />
            </div>
            <h1 className={Styles.heading}>Architect Details</h1>
            <div className={Styles.personalDetails}>

                <div className={Styles.personalDetails1}>

                    <label htmlFor='name'>Name</label>
                    <input className={Styles.inputTag} onChange={(e) => { formHandler(e) }} defaultValue={formData.name} value={formData.name} name="name" placeholder='Architect Name' />

                    <label htmlFor='mobileno'>Mobile Number</label>
                    <input className={Styles.inputTag} onChange={(e) => { formHandler(e) }} defaultValue={formData.mobileno} value={formData.mobileno} name="mobileno" placeholder='Mobile Number' />

                    <label htmlFor='email'>Email</label>
                    <input className={Styles.inputTag} onChange={(e) => { formHandler(e) }} defaultValue={formData.email} value={FormData.email} name="email" placeholder='email' />

                    <label htmlFor='AddressLine1'>Address</label>
                    <input className={Styles.inputTag} onChange={(e) => { formHandler(e) }} defaultValue={formData.address} value={formData.address} name="address" placeholder='address Line 1' />

                    <label htmlFor='AddressLine1'>Remarks</label>
                    <input className={Styles.inputTag} onChange={(e) => { formHandler(e) }} defaultValue={formData.remarks} value={formData.remarks} name="remarks" placeholder='Remarks' />
                </div>

                <div className={Styles.personalDetails2}>

                    <label htmlFor='date'>Date</label>
                    <input className={Styles.inputTag} onChange={(e) => { formHandler(e) }} defaultValue={formData.date} type="date" value={formData.date} name="date" placeholder='Created At' />

                    <label htmlFor='birthdate'>Birth Date</label>
                    <input className={Styles.inputTag} onChange={(e) => { formHandler(e) }} defaultValue={formData.birthdate} value={formData.birthdate} name="birthdate" type="date" placeholder='Birthdate' />

                    <label htmlFor='marrieagedate'>Marriage Date</label>
                    <input className={Styles.inputTag} onChange={(e) => { formHandler(e) }} defaultValue={formData.marriagedate} value={formData.marrieagedate} name="marriagedate" type="date" placeholder='Annivarsary' />

                    <label htmlFor='companyName'>Company Name</label>
                    <input className={Styles.inputTag} onChange={(e) => { formHandler(e) }} defaultValue={formData.companyName} name="companyName" placeholder='Company Name' />

                    {/* <label htmlFor='salesMan'>Sales Man </label>
                    <input className={Styles.inputTag} onChange={(e) => { formHandler(e) }} defaultValue={formData.companyName} value={formData.companyName} name="salesMan" placeholder='Company Name' /> */}
                    <label>Branches</label>
                    <ReactSelect lassName={Styles.inputTag}
                        options={Branches}
                        isMulti
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        components={{
                            Option
                        }}
                        onChange={Branchchangehandler}
                        allowSelectAll={true}
                        value={arr}
                    />
                    <label>Salesmen</label>
                    <ReactSelect lassName={Styles.inputTag}
                        options={Salesmen}
                        isMulti
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        components={{
                            Option
                        }}
                        onChange={Salesmenchangehandler}
                        allowSelectAll={true}
                        value={arr2}
                    />
                </div>
            </div>

            <h1 className={Styles.heading}>Bank Details</h1>
            <div className={Styles.bankDetails}>

                <div className={Styles.bankDetails1}>
                    <label htmlFor='bankname'>Bank Name</label>
                    <input className={Styles.inputTag} onChange={(e) => { formHandler(e) }} defaultValue={formData.bankname} value={formData.bankname} name="bankname" placeholder='Bank Name' />

                    <label htmlFor='branchname'>Branch Name</label>
                    <input className={Styles.inputTag} onChange={(e) => { formHandler(e) }} defaultValue={formData.branchname} value={formData.branchname} name="branchname" placeholder='Branch Name' />

                    <label htmlFor='IFSCCode'>IFSC Code</label>
                    <input className={Styles.inputTag} onChange={(e) => { formHandler(e) }} defaultValue={formData.IFSCcode} value={formData.IFSCcode} name="IFSCcode" placeholder='IFSC Code' />
                </div>

                <div className={Styles.bankDetails2}>
                    <label htmlFor='adharcard'>Adhar Card</label>
                    <input className={Styles.inputTag} onChange={(e) => { formHandler(e) }} defaultValue={formData.adharcard} value={formData.adharcard} name="adharcard" placeholder='Adhar Card' />

                    <label htmlFor='pancard'>Pan Card</label>
                    <input className={Styles.inputTag} onChange={(e) => { formHandler(e) }} defaultValue={formData.pancard} value={formData.pancard} name="pancard" placeholder='Pan Card' />
                </div>
            </div>

            <button disabled={isDisabled} className={isDisabled ? Styles.disable : Styles.submitButton} onClick={submitHandler} type="Submit">Submit</button>
        </div>
    )
}

export default ArchitectEditForm