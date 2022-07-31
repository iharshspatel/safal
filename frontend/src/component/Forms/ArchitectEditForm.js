import React,{useState} from 'react'
import Styles from './ArchitectCreateForm.module.css'
import {AiFillCloseCircle} from 'react-icons/ai'
import axios from "axios"
import {ToastContainer, toast} from 'react-toastify'

const ArchitectEditForm = ({modalHandler, data}) => {
    let initialState = {
        name:data.name,
        email:data.email,
        mobileno:data.mobileno,
        AddressLine1:data.address,
        AddressLine2:data.address,
        AddressLine3:data.address,
        companyName:data.companyName,
        birthdate:data.birthdate.substr(0, 10),
        marriagedate:data.marriagedate.substr(0, 10),
        remarks:data.remarks,
        bankname:data.bankname,
        adharcard:data.adharcard,
        pancard:data.pancard,
        date:data.date.substr(0,10)
    }
    let id = data._id;
    const [formData, setFormData] = useState(initialState)

    const formHandler = (e) => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const submitHandler = async(e) => {
        e.preventDefault();
        let data={
        name:formData.name,
        email:formData.email,
        mobileno:formData.mobileno,
        address:{
            AddressLine1:formData.AddressLine1,
            AddressLine2:formData.AddressLine2,
            AddressLine3:formData.AddressLine3,
        },
        companyName:formData.companyName,
        birthdate:formData.birthdate,
        marriagedate:formData.marriagedate,
        remarks:formData.remarks,
        bankname:formData.bankname,
        adharcard:formData.adharcard,
        pancard:formData.pancard,
        date:formData.date,
        IFSCcode:formData.IFSCcode
        }
        console.log(data)
        try{
        const response = await axios.put(`/api/v1/architect/update/${id}`, data, {headers:{"Content-Type" : "application/json"}});
        console.log(response);
        toast.success("Architech is Edited ");
        
        }
        catch(e){
         toast.error(e.response.data.message);
         console.log(e.response.data.message)
        }
        
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
{/* Same as */}
<ToastContainer />
        <div className={Styles.closebutton} onClick={modalHandler}>
            <AiFillCloseCircle/>
        </div>
        <h1 className={Styles.heading}>Architect Details</h1>
        <div className={Styles.personalDetails}>
        
        <div className={Styles.personalDetails1}>

        <label htmlFor='name'>Name</label>
        <input className={Styles.inputTag} onChange={(e)=>{formHandler(e)}} defaultValue={formData.name} value={formData.name} name="name" placeholder='Architect Name'/>
        
        <label htmlFor='mobileno'>Mobile Number</label>
        <input className={Styles.inputTag} onChange={(e)=>{formHandler(e)}} defaultValue={formData.mobileno} value={formData.mobileno} name="mobileno" placeholder='Mobile Number'/>
        
        <label htmlFor='email'>Email</label>
        <input className={Styles.inputTag} onChange={(e)=>{formHandler(e)}} defaultValue={formData.email} value={FormData.email} name="email" placeholder='email'/>

        <label htmlFor='AddressLine1'>Address</label>
        <input className={Styles.inputTag} onChange={(e)=>{formHandler(e)}} defaultValue={formData.AddressLine1}  value={formData.AddressLine1} name="AddressLine1" placeholder='address Line 1'/>
        <input className={Styles.inputTag} onChange={(e)=>{formHandler(e)}} defaultValue={formData.AddressLine2} value={formData.AddressLine2} name="AddressLine2" placeholder='address Line 2'/>
        <input className={Styles.inputTag} onChange={(e)=>{formHandler(e)}} defaultValue={formData.AddressLine3} value={formData.AddressLine3} name="AddressLine3" placeholder='address Line 3'/>

        <label htmlFor='AddressLine1'>Remarks</label>
        <input className={Styles.inputTag} onChange={(e)=>{formHandler(e)}} defaultValue={formData.remarks} value={formData.remarks} name="remarks" placeholder='Remarks'/>
        </div>

        <div className={Styles.personalDetails2}>

        <label htmlFor='date'>Date</label>
        <input className={Styles.inputTag} onChange={(e)=>{formHandler(e)}} defaultValue={formData.date} type="date" value={formData.date} name="date" type="date" placeholder='Created At'/>
        
        <label htmlFor='birthdate'>Birth Date</label>
        <input className={Styles.inputTag} onChange={(e)=>{formHandler(e)}} defaultValue={formData.birthdate} value={formData.birthdate} name="birthdate" type="date" placeholder='Birthdate'/>

        <label htmlFor='marrieagedate'>Marriage Date</label>
        <input className={Styles.inputTag} onChange={(e)=>{formHandler(e)}} defaultValue={formData.marriagedate} value={formData.marrieagedate} name="marriagedate" type="date" placeholder='Annivarsary'/>
        
        <label htmlFor='companyName'>Company Name</label>
        <input className={Styles.inputTag} onChange={(e)=>{formHandler(e)}} defaultValue={formData.companyName} name="companyName" placeholder='Company Name'/>

        <label htmlFor='salesMan'>Sales Man </label>
        <input className={Styles.inputTag} onChange={(e)=>{formHandler(e)}} defaultValue={formData.companyName} value={formData.companyName} name="salesMan" placeholder='Company Name'/>
        </div>
        </div>

        <h1 className={Styles.heading}>Bank Details</h1>
        <div className={Styles.bankDetails}>
        
        <div className={Styles.bankDetails1}>
        <label htmlFor='bankname'>Bank Name</label>
        <input className={Styles.inputTag} onChange={(e)=>{formHandler(e)}} defaultValue={formData.bankname} value={formData.bankname} name="bankname" placeholder='Bank Name'/>
        
        <label htmlFor='branchname'>Branch Name</label>
        <input className={Styles.inputTag} onChange={(e)=>{formHandler(e)}} defaultValue={formData.branchname} value={formData.branchname} name="branchname" placeholder='Branch Name'/>

        <label htmlFor='IFSCCode'>IFSC Code</label>
        <input className={Styles.inputTag} onChange={(e)=>{formHandler(e)}} defaultValue={formData.IFSCcode} value={formData.IFSCcode} name="IFSCcode" placeholder='IFSC Code'/>
        </div>

        <div className={Styles.bankDetails2}>
        <label htmlFor='adharcard'>Adhar Card</label>
        <input className={Styles.inputTag} onChange={(e)=>{formHandler(e)}} defaultValue={formData.adharcard} value={formData.adharcard} name="adharcard" placeholder='Adhar Card'/>
        
        <label htmlFor='pancard'>Pan Card</label>
        <input className={Styles.inputTag} onChange={(e)=>{formHandler(e)}} defaultValue={formData.pancard} value={formData.pancard} name="pancard" placeholder='Pan Card'/>
        </div>
        </div>
        
        <button className={Styles.submitButton} onClick={submitHandler} type="Submit">Submit</button>
    </div>
  )
}

export default ArchitectEditForm