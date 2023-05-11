import React, { useState, useEffect } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
import Styles from './TaskCreateForm.module.css'
import axios from 'axios'
import { default as ReactSelect } from "react-select";
import Select from 'react-select'
const TaskEditForm = ({ modalHandler, data, setIsOpen, parentCallback }) => {
    const [Salesmen, setSalesmen] = useState([]);
    let initialState = {
        remarks: data.remarks,
        date: data.date ? data.date.substr(0, 10) : null,
        salesmen: data.salesmen,
        mistryTag: data.mistryTag,
        architectTag: data.architectTag,
        dealerTag: data.dealerTag,
        pmcTag: data.pmcTag,
    }
    const [formData, setFormData] = useState(initialState)
    const [architects, setArchitects] = useState([]);
    const [defalutArchitect, setDefaultArchitect] = useState(() => data.architectTag ? { value: data.architectTag, label: `${data.architectTag.name}-${data.architectTag.mobileno}` } : "");
    const [defaultMistry, setDefaultMistry] = useState(() => data.mistryTag ? { value: data.mistryTag, label: `${data.mistryTag.name}-${data.mistryTag.mobileno}` } : "");
    const [defaultDealer, setDefaultDealer] = useState(() => data.dealerTag ? { value: data.dealerTag, label: `${data.dealerTag.name}-${data.dealerTag.mobileno}` } : "");
    const [deafultPMC, setDefaultPMC] = useState(() => data.pmcTag ? { value: data.pmcTag, label: `${data.pmcTag.name}-${data.pmcTag.mobileno}` } : "");
    const [Mistries, setMistries] = useState([]);
    const [Dealers, setDealers] = useState([]);
    const [PMCs, setPMCs] = useState([]);
    const [defaultSalesman, setDefaultSalesman] = useState(() => data.salesmanId ? { value: data.salesmanId._id, label: `${data.salesmanId.name}` } : "");

    const getAllsalesmen = async () => {
        const { data } = await axios.get("/api/v1/salesman/getall");
        const salesmen = data.salesmans.map((salesman) => ({ value: salesman._id, label: `${salesman.name}-${salesman.mobileno}` }))
        setSalesmen(salesmen);
    }
    const Salesmenchangehandler = (selected) => {
        console.log(selected);
        setDefaultSalesman(selected);
        setFormData({ ...formData, defaultSalesman })
    };

    const [isDisabled, setIsDisabled] = useState(false);
    let id = data._id
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
            salesmanId: defaultSalesman.value,
            mistryTag: formData.mistryTag,
            architectTag: formData.architectTag,
            dealerTag: formData.dealerTag,
            pmcTag: formData.pmcTag,
        }

        try {
            const response = await axios.put(`/api/v1/task/update/${id}`, data1, { headers: { "Content-Type": "application/json" } });
            parentCallback();
            setIsOpen(false);
        }
        catch (e) {
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

    useEffect(() => {
        getAllArchitects();
        getAllDealer();
        getAllMistry();
        getAllPMC();
    }, []);

    const ArchitectFormHandler = (e) => {
        setFormData({ ...formData, architectTag: e.value, architectName: e.label.split('-')[0], architectNumber: e.label.split('-')[1] })
    }

    const MistryFormHandler = (e) => {
        setFormData({ ...formData, mistryTag: e.value, mistryName: e.label.split('-')[0], mistryNumber: e.label.split('-')[1] })
    }

    const DealerFormHandler = (e) => {
        setFormData({ ...formData, dealerTag: e.value, dealerName: e.label.split('-')[0], dealerNumber: e.label.split('-')[1] })
    }

    const PMCFormHandler = (e) => {
        setFormData({ ...formData, pmcTag: e.value, pmcName: e.label.split('-')[0], pmcNumber: e.label.split('-')[1] })
    }

    useEffect(() => {
        getAllsalesmen()
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
                    <input className={Styles.inputTag} type="date" name="date" value={formData.date} onChange={(e) => formHandler(e)} placeholder='Created At' />

                    <label>Salesman</label>
                    {/* <ReactSelect lassName={Styles.inputTag}
                        options={Salesmen}
                        onChange={Salesmenchangehandler}
                        value={defaultSalesman}
                    /> */}
                    <Select defaultValue={defaultSalesman} onChange={Salesmenchangehandler} options={Salesmen} />
                </div>
            </div>


            <div className={Styles.bankDetails}>
                <div className={Styles.bankDetails1}>

                    <label htmlFor='name'>Mistry Tag</label>
                    <Select defaultValue={defaultMistry} onChange={(e) => MistryFormHandler(e)} options={Mistries} />

                    <label htmlFor='name'>Architect Tag</label>
                    <Select defaultValue={defalutArchitect} onChange={(e) => ArchitectFormHandler(e)} options={architects} />
                </div>

                <div className={Styles.bankDetails2}>

                    <label htmlFor='name'>Dealer Tag</label>
                    <Select defaultValue={defaultDealer} onChange={(e) => DealerFormHandler(e)} options={Dealers} />

                    <label htmlFor='name'>PMC Tag</label>
                    <Select defaultValue={deafultPMC} onChange={(e) => PMCFormHandler(e)} options={PMCs} />
                </div>
            </div>
            <button disabled={isDisabled} className={isDisabled ? Styles.disable : Styles.submitButton} onClick={(e) => submitHandler(e)} type="Submit">Submit</button>
        </div>
    )
}

export default TaskEditForm