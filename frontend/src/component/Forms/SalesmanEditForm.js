import React, { useState, useEffect } from 'react'
import Styles from './DealerCreateForm.module.css'
import { AiFillCloseCircle } from 'react-icons/ai'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify'
import Option from '../DropDown/Options'
import Select from 'react-select'
import { default as ReactSelect } from "react-select";

const SalesmanEditForm = ({ modalHandler, data, setIsOpen, parentCallback }) => {
    const [Branches, setBranches] = useState([]);
    console.log(data);
    const [selectedBranch, setselectedBranch] = useState(data.branches);
    const [Salesmen, setSalesmen] = useState([]);
    const [selectedSalesman, setselectedSalesman] = useState(data.salesmen);
    // const arr2 = selected.salesman.map(object => {
    //     console.log(object);
    //     return { ...object, value: object.name, label: object.name };
    // })
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
        birthdate: data.birthdate,
        marriagedate: data.marriagedate,
        date: data.date ? data.date.substr(0, 10) : null,
        branches: data.branches,

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
            date: formData.date,
            // // followupdate: formData.fdate,
            // architectTag: formData.architectTag,
            // architectNumber: formData.architectNumber,
            // architectName: formData.architectName,
            // pmcTag: formData.pmcTag,
            // pmcName: formData.pmcName,
            // pmcNumber: formData.pmcNumber,
            // requirement: formData.requirement,
            // stage: formData.stage,
            branches: selectedBranch,
            // salesmen: selectedSalesmen

        }
        console.log(data)
        try {
            const response = await axios.put(`/api/v1/salesman/update/${id}`, data, { headers: { "Content-Type": "application/json" } });
            console.log(response);

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
    const ArchitectFormHandler = (e) => {
        setFormData({ ...formData, architectTag: e.value, architectName: e.label.split('-')[0], architectNumber: e.label.split('-')[1] })
    }
    const Requirehandler = (e) => {
        setFormData({ ...formData, requirement: e.value })
    }
    const Stagehandler = (e) => {
        setFormData({ ...formData, stage: e.value })
    }

    const MistryFormHandler = (e) => {
        console.log(e.value);
        setFormData({ ...formData, mistryTag: e.value, mistryName: e.label.split('-')[0], mistryNumber: e.label.split('-')[1] })
    }

    const DealerFormHandler = (e) => {
        console.log(e.value);
        setFormData({ ...formData, dealerTag: e.value, dealerName: e.label.split('-')[0], dealerNumber: e.label.split('-')[1] })
    }

    const PMCFormHandler = (e) => {
        console.log(e.value);
        setFormData({ ...formData, pmcTag: e.value, pmcName: e.label.split('-')[0], pmcNumber: e.label.split('-')[1] })
    }



















    const [architects, setArchitects] = useState([]);
    const [Mistries, setMistries] = useState([]);
    const [Dealers, setDealers] = useState([]);
    const [PMCs, setPMCs] = useState([]);
    const [selectedSalesmen, setselectedSalesmen] = useState([]);
    const getAllArchitects = async () => {

        const { data } = await axios.get("/api/v1/architect/getall");

        const architects = data.architects.map((arch) => ({ value: arch._id, label: `${arch.name}-${arch.mobileno}` }))

        setArchitects(architects);

    }

    const getAllMistry = async () => {

        const { data } = await axios.get("/api/v1/mistry/getall");
        const mistries = data.mistries.map((mistry) => ({ value: mistry._id, label: `${mistry.name}-${mistry.mobileno}` }))
        setMistries(mistries);
    }

    const getAllDealer = async () => {
        const { data } = await axios.get("/api/v1/dealer/getall");

        const dealers = data.dealers.map((dealer) => ({ value: dealer._id, label: `${dealer.name}-${dealer.mobileno}` }))
        setDealers(dealers);
    }

    const getAllPMC = async () => {

        const { data } = await axios.get("/api/v1/pmc/getall");

        const pmcs = data.pmcs.map((pmc) => ({ value: pmc._id, label: `${pmc.name}-${pmc.mobileno}` }))
        setPMCs(pmcs);


    }

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
                    <input className={Styles.inputTag} onChange={(e) => { formHandler(e) }} value={formData.name} name="name" placeholder='Dealer Name' />

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
                    <input className={Styles.inputTag} onChange={(e) => { formHandler(e) }} value={formData.marrieagedate} name="marriagedate" type="date" placeholder='Annivarsary' />

                    <label htmlFor='companyName'>Company Name</label>
                    <input className={Styles.inputTag} onChange={(e) => { formHandler(e) }} value={formData.companyName} name="companyName" placeholder='Company Name' />
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
                    {/* <label htmlFor='salesMan'>Sales Man </label> */}
                    {/* <input className={Styles.inputTag} onChange={(e) => { formHandler(e) }} value={formData.salesMan} name="salesMan" placeholder='Company Name' /> */}
                </div>
            </div>

            <h1 className={Styles.heading}>Bank Details</h1>
            <div className={Styles.bankDetails}>

                <div className={Styles.bankDetails1}>
                    <label htmlFor='bankname'>Bank Name</label>
                    <input className={Styles.inputTag} onChange={(e) => { formHandler(e) }} value={formData.bankname} name="bankname" placeholder='Bank Name' />

                    <label htmlFor='branchname'>Branch Name</label>
                    <input className={Styles.inputTag} onChange={(e) => { formHandler(e) }} value={formData.branchname} name="branchname" placeholder='Branch Name' />

                    <label htmlFor='IFSCCode'>IFSC Code</label>
                    <input className={Styles.inputTag} onChange={(e) => { formHandler(e) }} value={formData.IFSCcode} name="IFSCcode" placeholder='IFSC Code' />

                    {/* <label>Salesmen</label>
                <ReactSelect className={Styles.inputTag}
                    options={Salesmen}
                    isMulti
                    closeMenuOnSelect={false}
                    hideSelectedOptions={false}
                    components={{
                        Option
                    }}
                    onChange={Salesmenchangehandler}
                    allowSelectAll={true}
                    value={selectedSalesmen}
                /> */}
                </div>

                <div className={Styles.bankDetails2}>
                    <label htmlFor='adharcard'>Adhar Card</label>
                    <input className={Styles.inputTag} onChange={(e) => { formHandler(e) }} value={formData.adharcard} name="adharcard" placeholder='Adhar Card' />

                    <label htmlFor='pancard'>Pan Card</label>
                    <input className={Styles.inputTag} onChange={(e) => { formHandler(e) }} value={formData.pancard} name="pancard" placeholder='Pan Card' />

                </div>
            </div>

            <button disabled={isDisabled} className={isDisabled ? Styles.disable : Styles.submitButton} onClick={submitHandler} type="Submit">Submit</button>
        </div>

    )
}

export default SalesmanEditForm