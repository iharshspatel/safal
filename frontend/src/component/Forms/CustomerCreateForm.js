import React, { useState, useEffect } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
import { toast, ToastContainer } from 'react-toastify'
import Styles from './CustomerCreateForm.module.css'
import axios from 'axios'
import Select from 'react-select'
import { default as ReactSelect } from "react-select";
import Option from '../DropDown/Options'
import { useSelector } from 'react-redux'
const CustomerCreateForm = ({ modalHandler, setIsOpen, parentCallback }) => {
  const [architects, setArchitects] = useState([]);
  const [Mistries, setMistries] = useState([]);
  const [Dealers, setDealers] = useState([]);
  const [PMCs, setPMCs] = useState([]);
  const [Branches, setBranches] = useState([]);
  const [selectedBranch, setselectedBranch] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [Salesmen, setSalesmen] = useState([]);
  const [selectedSalesmen, setselectedSalesmen] = useState([]);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  let initialState = {
    name: "",
    email: "",
    mobileno: "",
    address: "",
    area:"",
    companyName: "",
    birthdate: "",
    marriagedate: "",
    remarks: "",
    orderValue: "",
    salesPerson: "",
    mistryTag: null,
    mistryName: "",
    mistryNumber: "",
    architectTag: null,
    architectName: "",
    architectNumber: "",
    dealerTag: null,
    dealerName: "",
    dealerNumber: "",
    pmcTag: null,
    pmcName: "",
    pmcNumber: "",
    date: "",
    branches:[],
    salesmen:[]
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
        label:branch.branchname
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
      area:formData.area,
      companyName: formData.companyName,
      birthdate: formData.birthdate,
      marriagedate: formData.marriagedate,
      remarks: formData.remarks,
      date: formData.date,
      orderValue: formData.orderValue,
      salesPerson: formData.salesPerson,
      mistryTag: formData.mistryTag,
      mistryName: formData.mistryName,
      mistryNumber: formData.mistryNumber,
      architectTag: formData.architectTag,
      architectNumber: formData.architectNumber,
      architectName: formData.architectName,
      dealerTag: formData.dealerTag,
      dealerNumber: formData.dealerNumber,
      dealerName: formData.dealerName,
      pmcTag: formData.pmcTag,
      pmcName: formData.pmcName,
      pmcNumber: formData.pmcNumber,
      branches:selectedBranch,
      salesmen:selectedSalesmen
    }
    try {
      const response = await axios.post("/api/v1/customer/create", data, { headers: { "Content-Type": "application/json" } });
      console.log(response);
      parentCallback(true);
      setIsOpen(false);
    }
    catch (e) {
      toast.error(e.response.data.message);
      setIsDisabled(false);
    }

  }
  
  
  
  
  const Branchchangehandler = (selected) => {

    setselectedBranch(selected);
    console.log(selected);
    setFormData({...formData,selectedBranch})
  };
  const ArchitectFormHandler = (e) => {
    setFormData({ ...formData, architectTag: e.value, architectName: e.label.split('-')[0], architectNumber: e.label.split('-')[1] })
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
  const Salesmenchangehandler = (selecteds) => {

    setselectedSalesmen(selecteds);
    console.log(selecteds);
    setFormData({ ...formData, selectedSalesmen })
  };

  return (
    <div className={Styles.container}>
      
      <div className={Styles.closebutton} onClick={modalHandler}>
        <AiFillCloseCircle />
      </div>

      <h1 className={Styles.heading}>Personal Details</h1>

      <div className={Styles.personalDetails}>

        <div className={Styles.personalDetails1}>

          <label htmlFor='name'>Customer Name</label>
          <input className={Styles.inputTag} name="name" value={formData.name} onChange={(e) => formHandler(e)} placeholder='Customer Name' />

          <label htmlFor='number'>Mobile Number</label>
          <input className={Styles.inputTag} name="mobileno" value={formData.mobileno} onChange={(e) => formHandler(e)} placeholder='Mobile Number' />

          <label htmlFor='number'>Email</label>
          <input className={Styles.inputTag} name="email" value={formData.email} onChange={(e) => formHandler(e)} placeholder='Email' />

          <label htmlFor='address'>Address</label>
          <input className={Styles.inputTag} name="address" value={formData.address} onChange={(e) => formHandler(e)} placeholder='Address' />

          <label htmlFor='area'>Area</label>
          <input className={Styles.inputTag} name="area" value={formData.area} onChange={(e) => formHandler(e)} placeholder='area' />

          <label htmlFor='ordervalue'>Order Value</label>
          <input className={Styles.inputTag} name="orderValue" value={formData.orderValue} onChange={(e) => formHandler(e)} placeholder='Order Value' />

          <label htmlFor='name'>Remarks</label>
          <input className={Styles.inputTag} name="remarks" value={formData.remarks} onChange={(e) => formHandler(e)} placeholder='Remarks' />
        </div>

        <div className={Styles.personalDetails2}>

          <label htmlFor='name'>Created At</label>
          <input className={Styles.inputTag} type="date" name="date" value={formData.date} onChange={(e) => formHandler(e)} placeholder='Created At' />

          <label htmlFor='name'>Birth Date</label>
          <input className={Styles.inputTag} type="date" name="birthdate" value={formData.birthdate} onChange={(e) => formHandler(e)} placeholder='Birthdate' />

          <label htmlFor='name'>Annivarsary</label>
          <input className={Styles.inputTag} type="date" name="marriagedate" value={formData.marriagedate} onChange={(e) => formHandler(e)} placeholder='Annivarsary' />

          {/* <label htmlFor='name'>Sales Person</label>
          <input className={Styles.inputTag} name="salesPerson" value={formData.salesPerson} onChange={(e) => formHandler(e)} placeholder='Sales Person' /> */}
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
          <label>Salesmen</label>
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
          />
        </div>
      </div>

      {user.role == "admin" &&   <div className={Styles.bankDetails}>
        <div className={Styles.bankDetails1}>

          <label htmlFor='name'>Mistry Tag</label>
          <Select selectedValue={formData.mistryTag} onChange={(e) => MistryFormHandler(e)} options={Mistries} />

          <label htmlFor='name'>Architect Tag</label>
          <Select selectedValue={formData.architectTag} onChange={(e) => ArchitectFormHandler(e)} options={architects} />
        </div>

        <div className={Styles.bankDetails2}>

          <label htmlFor='name'>Dealer Tag</label>
          <Select selectedValue={formData.dealerTag} onChange={(e) => DealerFormHandler(e)} options={Dealers} />

          <label htmlFor='name'>PMC Tag</label>
          <Select selectedValue={formData.pmcTag} onChange={(e) => PMCFormHandler(e)} options={PMCs} />
        </div>
      </div>}
      <button disabled={isDisabled} className={isDisabled ? Styles.disable : Styles.submitButton} onClick={(e) => submitHandler(e)} type="submit">Submit</button>
     
    </div>
  )
}

export default CustomerCreateForm