import React, { useState, useEffect } from 'react'
import Styles from './ArchitectCreateForm.module.css'
import axios from "axios"
import { AiFillCloseCircle } from 'react-icons/ai'
import { toast, ToastContainer } from 'react-toastify'
import Select from 'react-select'
import { default as ReactSelect } from "react-select";
import Option from '../DropDown/Options'

const SalesmanCreateForm = ({ modalHandler, setIsOpen, parentCallback }) => {
    let initialState = {
        name: "",
        email: "",
        mobileno: "",
        address: "",
        companyName: "",
        birthdate: "",
        marriagedate: "",
        remarks: "",
        bankname: "",
        branchname: "",
        IFSCcode: "",
        adharcard: "",
        pancard: "",
        date: "",
        // salesMan: "",
        branches: [],
        // salesmen:[]
    }
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

    useEffect(() => {
        getAllbranches();
        getAllsalesmen()
    }, []);
    const [formData, setFormData] = useState(initialState)
    const [isDisabled, setIsDisabled] = useState(false);
    const [Branches, setBranches] = useState([]);
    const [selectedBranch, setselectedBranch] = useState([]);
    const [Salesmen, setSalesmen] = useState([]);
    const [selectedSalesmen, setselectedSalesmen] = useState([]);
    const getAllsalesmen = async () => {
        const { data } = await axios.get("/api/v1/salesman/getall");
        console.log(data.salesmans);
        const salesmen = data.salesmans.map((salesman) => (
            {
                name: salesman.name,
                value: salesman.name,
                label: salesman.name
            }
        ))
        setSalesmen(salesmen);
    }
    const formHandler = (e) => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

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
            // salesMan: formData.salesMan,
            branches: selectedBranch,
            // salesmen:selectedSalesmen

        }
        try {
            const response = await axios.post("/api/v1/salesman/create", data, { headers: { "Content-Type": "application/json" } });

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
    const Branchchangehandler = (selected) => {

        setselectedBranch(selected);
        console.log(selected);
        setFormData({ ...formData, selectedBranch })
    };
    // const Salesmenchangehandler = (selecteds) => {

    //     setselectedSalesmen(selecteds);
    //     console.log(selecteds);
    //     setFormData({ ...formData, selectedSalesmen })
    // };
    return (
        <div className={Styles.container}>
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

            <div className={Styles.closebutton} onClick={modalHandler}>
                <AiFillCloseCircle />
            </div>
            <h1 className={Styles.heading}>SalesMan Details</h1>
            <div className={Styles.personalDetails}>

                <div className={Styles.personalDetails1}>

                    <label htmlFor='name'>Name</label>
                    <input className={Styles.inputTag} onChange={(e) => { formHandler(e) }} value={formData.name} name="name" placeholder='Salesman Name' />

                    <label htmlFor='mobileno'>Mobile Number</label>
                    <input className={Styles.inputTag} onChange={(e) => { formHandler(e) }} value={formData.mobileno} name="mobileno" placeholder='Mobile Number' />

                    <label htmlFor='email'>Email</label>
                    <input className={Styles.inputTag} onChange={(e) => { formHandler(e) }} value={FormData.email} name="email" placeholder='email' />

                    <label htmlFor='AddressLine1'>Address</label>
                    <input className={Styles.inputTag} onChange={(e) => { formHandler(e) }} value={formData.address} name="address" placeholder='address' />

                    <label htmlFor='AddressLine1'>Remarks</label>
                    <input className={Styles.inputTag} onChange={(e) => { formHandler(e) }} value={formData.remarks} name="remarks" placeholder='Remarks' />
                </div>

                <div className={Styles.personalDetails2}>

                    <label htmlFor='date'>Date</label>
                    <input className={Styles.inputTag} onChange={(e) => { formHandler(e) }} value={formData.date} name="date" type="date" placeholder='Created At' />

                    <label htmlFor='birthdate'>Birth Date</label>
                    <input className={Styles.inputTag} onChange={(e) => { formHandler(e) }} value={formData.birthdate} name="birthdate" type="date" placeholder='Birthdate' />

                    <label htmlFor='marrieagedate'>Marriage Date</label>
                    <input className={Styles.inputTag} onChange={(e) => { formHandler(e) }} value={formData.marriagedate} name="marriagedate" type="date" placeholder='Annivarsary' />

                    {/* <label htmlFor='companyName'>Company Name</label>
                    <input className={Styles.inputTag} onChange={(e) => { formHandler(e) }} value={formData.companyName} name="companyName" placeholder='Company Name' />
                    */}
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
                        value={selectedBranch}
                    />
                    {/* <label htmlFor='salesMan'>Sales Man </label> */}
                    {/* <input className={Styles.inputTag} onChange={(e) => { formHandler(e) }} value={formData.salesMan} name="salesMan" placeholder='Company Name' /> */}
                </div>
            </div>

            
            <button disabled={isDisabled} className={isDisabled ? Styles.disable : Styles.submitButton} onClick={submitHandler} type="Submit">Submit</button>
        </div>
    )
}

export default SalesmanCreateForm