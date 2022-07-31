import React,{useState} from 'react'
import Styles from './ArchitectCreateForm.module.css'
import axios from "axios"
import { AiFillCloseCircle } from 'react-icons/ai'
import { toast, ToastContainer } from 'react-toastify'

const PMCCreateForm = ({modalHandler}) => {
    let initialState = {
        name:"",
        email:"",
        mobileno:"",
        AddressLine1:"",
        AddressLine2:"",
        AddressLine3:"",
        companyName:"",
        birthdate:"",
        marriagedate:"",
        remarks:"",
        bankname:"",
        adharcard:"",
        pancard:"",
        date:""
    }
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

        try{
            const response = await axios.post("/api/v1/pmc/create", data, {headers:{"Content-Type" : "application/json"}});
            console.log(response);
            toast.success("PMC is Created")
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
    <div className={Styles.closebutton} onClick={modalHandler}>
        <AiFillCloseCircle/>
    </div>
    <h1 className={Styles.heading}>PMC Details</h1>
    <div className={Styles.personalDetails}>
    
    <div className={Styles.personalDetails1}>

    <label htmlFor='name'>Name</label>
    <input className={Styles.inputTag} onChange={(e)=>{formHandler(e)}} value={formData.name} name="name" placeholder='PMC Name'/>
    
    <label htmlFor='mobileno'>Mobile Number</label>
    <input className={Styles.inputTag} onChange={(e)=>{formHandler(e)}} value={formData.mobileno} name="mobileno" placeholder='Mobile Number'/>
    
    <label htmlFor='email'>Email</label>
    <input className={Styles.inputTag} onChange={(e)=>{formHandler(e)}} value={FormData.email} name="email" placeholder='email'/>

    <label htmlFor='AddressLine1'>Address</label>
    <input className={Styles.inputTag} onChange={(e)=>{formHandler(e)}} value={formData.AddressLine1} name="AddressLine1" placeholder='address Line 1'/>
    <input className={Styles.inputTag} onChange={(e)=>{formHandler(e)}} value={formData.AddressLine2} name="AddressLine2" placeholder='address Line 2'/>
    <input className={Styles.inputTag} onChange={(e)=>{formHandler(e)}} value={formData.AddressLine3} name="AddressLine3" placeholder='address Line 3'/>

    <label htmlFor='AddressLine1'>Remarks</label>
    <input className={Styles.inputTag} onChange={(e)=>{formHandler(e)}} value={formData.remarks} name="remarks" placeholder='Remarks'/>
    </div>

    <div className={Styles.personalDetails2}>

    <label htmlFor='date'>Date</label>
    <input className={Styles.inputTag} onChange={(e)=>{formHandler(e)}} value={formData.date} name="date" type="date" placeholder='Created At'/>
    
    <label htmlFor='birthdate'>Birth Date</label>
    <input className={Styles.inputTag} onChange={(e)=>{formHandler(e)}} value={formData.birthdate} name="birthdate" type="date" placeholder='Birthdate'/>

    <label htmlFor='marrieagedate'>Marriage Date</label>
    <input className={Styles.inputTag} onChange={(e)=>{formHandler(e)}} value={formData.marrieagedate} name="marriagedate" type="date" placeholder='Annivarsary'/>
    
    <label htmlFor='companyName'>Company Name</label>
    <input className={Styles.inputTag} onChange={(e)=>{formHandler(e)}} value={formData.companyName} name="companyName" placeholder='Company Name'/>

    <label htmlFor='salesMan'>Sales Man </label>
    <input className={Styles.inputTag} onChange={(e)=>{formHandler(e)}} value={formData.companyName} name="salesMan" placeholder='Company Name'/>
    </div>
    </div>

    <h1 className={Styles.heading}>Bank Details</h1>
    <div className={Styles.bankDetails}>
    
    <div className={Styles.bankDetails1}>
    <label htmlFor='bankname'>Bank Name</label>
    <input className={Styles.inputTag} onChange={(e)=>{formHandler(e)}} value={formData.bankname} name="bankname" placeholder='Bank Name'/>
    
    <label htmlFor='branchname'>Branch Name</label>
    <input className={Styles.inputTag} onChange={(e)=>{formHandler(e)}} value={formData.branchname} name="branchname" placeholder='Branch Name'/>

    <label htmlFor='IFSCCode'>IFSC Code</label>
    <input className={Styles.inputTag} onChange={(e)=>{formHandler(e)}} value={formData.IFSCcode} name="IFSCcode" placeholder='IFSC Code'/>
    </div>

    <div className={Styles.bankDetails2}>
    <label htmlFor='adharcard'>Adhar Card</label>
    <input className={Styles.inputTag} onChange={(e)=>{formHandler(e)}} value={formData.adharcard} name="adharcard" placeholder='Adhar Card'/>
    
    <label htmlFor='pancard'>Pan Card</label>
    <input className={Styles.inputTag} onChange={(e)=>{formHandler(e)}} value={formData.pancard} name="pancard" placeholder='Pan Card'/>
    </div>
    </div>
    
    <button className={Styles.submitButton} onClick={submitHandler} type="Submit">Submit</button>
</div>
  )
}

export default PMCCreateForm