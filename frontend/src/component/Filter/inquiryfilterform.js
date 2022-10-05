import React, { useState, useEffect } from 'react'
import { AiFillCloseCircle, AiFillCustomerService } from 'react-icons/ai'
import { toast, ToastContainer } from 'react-toastify'
import Styles from '../Forms/CustomerCreateForm.module.css'
import axios from 'axios'
import Select from 'react-select'
import { default as ReactSelect } from "react-select";
import Option from '../DropDown/Options'
import { Navigate, useNavigate } from 'react-router-dom'
const InquiryFilterForm = ({ modalHandler2, setIsOpen2, parentCallback }) => {
    
    
    
    
    const navigate=useNavigate();
    const [Branches, setBranches] = useState([]);
    const [selectedBranch, setselectedBranch] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);
    const [Salesmen, setSalesmen] = useState([]);
    const [selectedSalesmen, setselectedSalesmen] = useState([]);
    let initialState = {
        startdate: null,
        enddate: null,
        branches: [],
        salesmen: []
    }
    const [formData, setFormData] = useState(initialState)

    const formHandler = (e) => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value })
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
    useEffect(() => {
        getAllbranches();
        getAllsalesmen();
    }, []);
    
    const submitHandler = async (e) => {
        e.preventDefault();
        setIsDisabled(true);
        let data = {
            startdate: formData.startdate,
            enddate: formData.enddate,
            
            
            branches: selectedBranch,
            salesmen: selectedSalesmen
        }
        let s=new Date(data.startdate);
        let w=new Date(data.enddate);
        
        try {
            
            
            console.log(data);
            
            setIsOpen2(false);
            navigate('/inquiry/'+data.salesmen.name+'/'+data.branches.branchname+'/'+s.toISOString()+'/'+w.toISOString())
            
        }
        catch (e) {
            
            console.log("eeee")
            setIsDisabled(false);
        }

    }




    const Branchchangehandler = (selected) => {

        setselectedBranch(selected);
        
        setFormData({ ...formData, selectedBranch })
    };

    const Salesmenchangehandler = (selecteds) => {

        setselectedSalesmen(selecteds);
        
        setFormData({ ...formData, selectedSalesmen })
    };

    return (
        <div className={Styles.container}>

            <div className={Styles.closebutton} onClick={modalHandler2}>
                <AiFillCloseCircle />
            </div>

            <h1 className={Styles.heading}>Filter Details</h1>

            <div className={Styles.personalDetails}>


                <div className={Styles.personalDetails2}>

                    <label htmlFor='name'>Start Date</label>
                    <input className={Styles.inputTag} type="date" name="startdate" value={formData.startdate} onChange={(e) => formHandler(e)} placeholder='Start Date' />

                    <label htmlFor='name'>End Date</label>
                    <input className={Styles.inputTag} type="date" name="enddate" value={formData.enddate} onChange={(e) => formHandler(e)} placeholder='End Date' />

                    
                    <label>Branches</label>
                   
                    <Select className={Styles.inputTag} options={Branches} value={selectedBranch} onChange={Branchchangehandler}/>
                    <label>Salesmen</label>
                    <Select className={Styles.inputTag} options={Salesmen} onChange={Salesmenchangehandler} value={selectedSalesmen}/>
                   
                </div> 
            </div>

            <button disabled={isDisabled} className={isDisabled ? Styles.disable : Styles.submitButton} onClick={(e) => submitHandler(e)} type="Submit">Find</button>
        </div>
    )
}

export default InquiryFilterForm