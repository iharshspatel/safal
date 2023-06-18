import React, { useState, useEffect } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
import { toast, ToastContainer } from 'react-toastify'
import Styles from './TaskCreateForm.module.css'
import axios from 'axios'
import Select from 'react-select'
import { default as ReactSelect } from "react-select";
import Option from '../DropDown/Options'
const TaskCreateForm = ({ modalHandler, setIsOpen, parentCallback }) => {
    const [architects, setArchitects] = useState([]);
    const [Mistries, setMistries] = useState([]);
    // const [Dealers, setDealers] = useState([]);
    // const [PMCs, setPMCs] = useState([]);
    const [Salesmen, setSalesmen] = useState([]);
    const [salesmanId, setSalesmanId] = useState("")

    let initialState = {
        remarks: "",
        date: "",
        salesmanId,
        mistryTag: null,
        architectTag: null,
        // dealerTag: null,
        // pmcTag: null,
    }
    const [formData, setFormData] = useState(initialState)

    const getAllsalesmen = async () => {
        const { data } = await axios.get("/api/v1/salesman/getall");
        const salesmen = data.salesmans.map((salesman) => ({ value: salesman._id, label: `${salesman.name}-${salesman.mobileno}` }))
        setSalesmen(salesmen);
    }
    const Salesmenchangehandler = (selected) => {
        console.log(selected);
        setSalesmanId(selected);
        setFormData({ ...formData, salesmanId })
    };

    const [isDisabled, setIsDisabled] = useState(false);
    useEffect(() => {
        getAllsalesmen();
    }, []);
    const formHandler = (e) => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setIsDisabled(true);
        let data1 = {
            remarks: formData.remarks,
            date: formData.date,
            salesmanId: salesmanId.value,
            mistryTag: formData.mistryTag,
            architectTag: formData.architectTag,
            // dealerTag: formData.dealerTag,
            // pmcTag: formData.pmcTag,
        }

        try {
            const response = await axios.post(`/api/v1/task/create`, data1, { headers: { "Content-Type": "application/json" } });
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

    // const getAllDealer = async () => {
    //     const { data } = await axios.get("/api/v1/dealer/getall");

    //     const dealers = data.dealers.map((dealer) => ({ value: dealer._id, label: `${dealer.name}-${dealer.mobileno}` }))
    //     setDealers(dealers);
    // }

    // const getAllPMC = async () => {
    //     const { data } = await axios.get("/api/v1/pmc/getall");

    //     const pmcs = data.pmcs.map((pmc) => ({ value: pmc._id, label: `${pmc.name}-${pmc.mobileno}` }))
    //     setPMCs(pmcs);
    // }

    const ArchitectFormHandler = (e) => {
        setFormData({ ...formData, architectTag: e.value, architectName: e.label.split('-')[0], architectNumber: e.label.split('-')[1] })
    }

    const MistryFormHandler = (e) => {
        setFormData({ ...formData, mistryTag: e.value, mistryName: e.label.split('-')[0], mistryNumber: e.label.split('-')[1] })
    }

    // const DealerFormHandler = (e) => {
    //     setFormData({ ...formData, dealerTag: e.value, dealerName: e.label.split('-')[0], dealerNumber: e.label.split('-')[1] })
    // }

    // const PMCFormHandler = (e) => {
    //     setFormData({ ...formData, pmcTag: e.value, pmcName: e.label.split('-')[0], pmcNumber: e.label.split('-')[1] })
    // }

    useEffect(() => {
        getAllsalesmen()

        getAllArchitects();
        // getAllDealer();
        getAllMistry();
        // getAllPMC();
    }, []);

    return (
        <div className={Styles.container}>

            <div className={Styles.closebutton} onClick={modalHandler}>
                <AiFillCloseCircle />
            </div>

            <h1 className={Styles.heading}>Personal Details</h1>
            <div className={Styles.personalDetails}>
                <div className={Styles.personalDetails1}>
                    <label htmlFor='name'>Remarks</label>
                    <input className={Styles.inputTag} name="remarks" value={formData.remarks} onChange={(e) => formHandler(e)} placeholder='Remarks' />
                </div>

                <div className={Styles.personalDetails2}>

                    <label htmlFor='name'>Created At</label>
                    <input className={Styles.inputTag} required type="date" name="date" value={formData.date} onChange={(e) => formHandler(e)} placeholder='Created At' />

                    <label>Salesmen</label>
                    <ReactSelect className={Styles.inputTag}
                        options={Salesmen}
                        onChange={Salesmenchangehandler}
                        value={salesmanId}
                    />
                </div>
            </div>
            <div className={Styles.bankDetails}>
                <div className={Styles.bankDetails1}>

                    <label htmlFor='name'>Mistry Tag</label>
                    <Select selectedValue={formData.mistryTag} onChange={(e) => MistryFormHandler(e)} options={Mistries} />

                    <label htmlFor='name'>Architect Tag</label>
                    <Select selectedValue={formData.architectTag} onChange={(e) => ArchitectFormHandler(e)} options={architects} />
                </div>

                {/* <div className={Styles.bankDetails2}>

                    <label htmlFor='name'>Dealer Tag</label>
                    <Select selectedValue={formData.dealerTag} onChange={(e) => DealerFormHandler(e)} options={Dealers} />

                    <label htmlFor='name'>PMC Tag</label>
                    <Select selectedValue={formData.pmcTag} onChange={(e) => PMCFormHandler(e)} options={PMCs} />
                </div> */}
            </div>
            <button disabled={isDisabled} className={isDisabled ? Styles.disable : Styles.submitButton} onClick={(e) => submitHandler(e)} type="Submit">Submit</button>
        </div>
    )
}

export default TaskCreateForm
