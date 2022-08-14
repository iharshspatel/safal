import React,{useState, useEffect} from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
import { toast, ToastContainer } from 'react-toastify'
import Styles from './CustomerCreateForm.module.css'
import axios from 'axios'
import Select from 'react-select'

const CustomerEditForm = ({modalHandler,data}) => {
  const [architects, setArchitects] = useState([]);
  const [defalutArchitect, setDefaultArchitect] = useState(()=>data.architectTag?{value:data.architectTag, label:`${data.architectName}-${data.architectNumber}`}:"");
  const [defaultMistry, setDefaultMistry] = useState(()=>data.mistryTag?{value:data.mistryTag, label:`${data.mistryName}-${data.mistryNumber}`}:"");
  const [defaultDealer, setDefaultDealer] = useState(()=>data.dealerTag?{value:data.dealerTag, label:`${data.dealerName}-${data.dealerNumber}`}:"");
  const [deafultPMC, setDefaultPMC] = useState(()=>data.pmcTag?{value:data.PMCTag, label:`${data.PMCName}-${data.PMCNumber}`}:"");
  const [Mistries, setMistries] = useState([]);
  const [Dealers, setDealers] = useState([]);
  const [PMCs, setPMCs] = useState([]);
  let id = data._id
  let initialState = {
    name:data.name,
    email:data.email,
    mobileno:data.mobileno,
    address:data.address,
    remarks:data.remarks,
    orderValue:data.orderValue,
    salesPerson:data.salesPerson,
    mistryTag:data.mistryTag,
    mistryName:data.mistryName,
    mistryNumber:data.mistryNumber,
    architectTag:data.architectTag,
    architectName:data.architectName,
    architectNumber:data.architectNumber,
    dealerTag:data.dealerTag,
    dealerName:data.dealerName,
    dealerNumber:data.dealerNumber,
    pmcTag:data.pmcTag,
    pmcName:data.pmcName,
    pmcNumber:data.pmcNumber,
    birthdate:data.birthdate ? data.birthdate.substr(0, 10) : null,
    marriagedate:data.marriagedate ? data.marriagedate.substr(0, 10) : null,
    date:data.date ? data.date.substr(0,10):null
}
const [formData, setFormData] = useState(initialState)

const formHandler = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value })
}


const submitHandler = async(e) => {
    e.preventDefault();
    let data1={
    name:formData.name,
    email:formData.email,
    mobileno:formData.mobileno,
    address:formData.address,
    companyName:formData.companyName,
    birthdate:formData.birthdate,
    marriagedate:formData.marriagedate,
    remarks:formData.remarks,
    date:formData.date,
    orderValue:formData.orderValue,
    salesPerson:formData.salesPerson,
    mistryTag:formData.mistryTag,
    mistryName:formData.mistryName,
    architectTag:formData.architectTag,
    architectName:formData.architectName,
    dealerTag:formData.dealerTag,
    dealerName:formData.dealerName,
    pmcTag:formData.pmcTag,
    pmcName:formData.pmcName
    }

    try{
    const response = await axios.put(`/api/v1/customer/update/${id}`, data1, {headers:{"Content-Type" : "application/json"}});
    toast.success("customer is edited");
    
    }
    catch(e){
     console.log(e.response.data.message)
    }

}

const getAllArchitects = async() => {
  const {data} = await axios.get("/api/v1/architect/getall");
  const architects = data.architects.map((arch)=>({value:arch._id,label:`${arch.name}-${arch.mobileno}`}))
  setArchitects(architects);
  // let dataone = architects.filter((item) => item.value === formData.architectTag)
  // console.log(dataone[0], `architect data`)
  // if(dataone[0]){
  // setDefaultArchitect(dataone[0]);
  // }
}

const getAllMistry = async() => {
  const {data} = await axios.get("/api/v1/mistry/getall");
  const mistries = data.mistries.map((mistry)=>({value:mistry._id,label:`${mistry.name}-${mistry.mobileno}`}))
  setMistries(mistries);

  let dataone = mistries.filter((item) => item.value === formData.mistriesTag)
  console.log(dataone[0], `mistries data`)
  if(dataone[0]){
  setDefaultMistry(dataone[0]);
  }
}

const getAllDealer = async() => {
  const {data} = await axios.get("/api/v1/dealer/getall");
  const dealers = data.dealers.map((dealer)=>({value:dealer._id,label:`${dealer.name}-${dealer.mobileno}`}))
  setDealers(dealers);

  let dataone = dealers.filter((item) => item.value === formData.dealersTag)
  console.log(dataone[0], `dealers data`)
  setDefaultDealer(dataone[0]);
}

const getAllPMC = async() => {
  const {data} = await axios.get("/api/v1/pmc/getall");
  const pmcs = data.pmcs.map((pmc)=>({value:pmc._id,label:`${pmc.name}-${pmc.mobileno}`}))
  setPMCs(pmcs);

  let dataone = pmcs.filter((item) => item.value === formData.pmcTag)
  console.log(dataone[0], `pmcs data`)
  setDefaultPMC(dataone[0]);
}

useEffect(() => {
  console.log(`Default Architect: `,defalutArchitect);
  getAllArchitects();
  getAllDealer();
  getAllMistry();
  getAllPMC();
}, []);


const ArchitectFormHandler = (e) => {
  setFormData({...formData, architectTag:e.value, architectName:e.label.split('-')[0], architectNumber:e.label.split('-')[1]})
}

const MistryFormHandler = (e) => {
  setFormData({...formData, mistryTag:e.value, mistryName:e.label.split('-')[0], mistryNumber:e.label.split('-')[1]})
}

const DealerFormHandler = (e) => {
  setFormData({...formData, dealerTag:e.value, dealerName:e.label.split('-')[0], dealerNumber:e.label.split('-')[1]})
}

const PMCFormHandler = (e) => {
  setFormData({...formData, pmcTag:e.value, pmcName:e.label.split('-')[0], pmcNumber:e.label.split('-')[1]})
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
          pauseOnHover/>

        <div className={Styles.closebutton} onClick={modalHandler}>
            <AiFillCloseCircle/>
        </div>

        <h1 className={Styles.heading}>Personal Details</h1>

        <div className={Styles.personalDetails}>
        
        <div className={Styles.personalDetails1}>
        
        <label htmlFor='name'>Customer Name</label>
        <input className={Styles.inputTag} name="name" value={formData.name} onChange={(e)=>formHandler(e)} placeholder='Customer Name'/>

        <label htmlFor='number'>Mobile Number</label>
        <input className={Styles.inputTag} name="mobileno" value={formData.mobileno} onChange={(e)=>formHandler(e)} placeholder='Mobile Number'/>

        <label htmlFor='number'>Email</label>
        <input className={Styles.inputTag} name="email" value={formData.email} onChange={(e)=>formHandler(e)} placeholder='Email'/>

        <label htmlFor='address'>Address</label>
        <input className={Styles.inputTag} name="address" value={formData.address} onChange={(e)=>formHandler(e)} placeholder='Address'/>

        <label htmlFor='ordervalue'>Order Value</label>
        <input className={Styles.inputTag} name="orderValue" value={formData.orderValue} onChange={(e)=>formHandler(e)} placeholder='Order Value'/>

        <label htmlFor='name'>Remarks</label>
        <input className={Styles.inputTag} name="remarks" value={formData.remarks} onChange={(e)=>formHandler(e)} placeholder='Remarks'/>
        </div>

        <div className={Styles.personalDetails2}>
        
        <label htmlFor='name'>Created At</label>
        <input className={Styles.inputTag} type="date" name="date" value={formData.date} onChange={(e)=>formHandler(e)} placeholder='Created At'/>

        <label htmlFor='name'>Birth Date</label>
        <input className={Styles.inputTag} type="date" name="birthdate" value={formData.birthdate} onChange={(e)=>formHandler(e)} placeholder='Birthdate'/>

        <label htmlFor='name'>Annivarsary</label>
        <input className={Styles.inputTag} type="date" name="marriagedate" value={formData.marriagedate} onChange={(e)=>formHandler(e)} placeholder='Annivarsary'/>

        <label htmlFor='name'>Sales Person</label>
        <input className={Styles.inputTag} name="salesPerson" value={formData.salesPerson} onChange={(e)=>formHandler(e)} placeholder='Sales Person'/>
        </div>
        </div>

        <div className={Styles.bankDetails}>
        <div className={Styles.bankDetails1}>

        <label htmlFor='name'>Mistry Tag</label>
        <Select defaultValue={defaultMistry} onChange={(e)=>MistryFormHandler(e)} options={Mistries}/>

        <label htmlFor='name'>Architect Tag</label>
        <Select defaultValue={defalutArchitect} onChange={(e)=>ArchitectFormHandler(e)} options={architects}/>
        </div>

        <div className={Styles.bankDetails2}>
        
        <label htmlFor='name'>Dealer Tag</label>
        <Select defaultValue={defaultDealer} onChange={(e)=>DealerFormHandler(e)} options={Dealers}/>

        <label htmlFor='name'>PMC Tag</label>
        <Select defaultValue={deafultPMC} onChange={(e)=>PMCFormHandler(e)} options={PMCs}/>
        </div>
        </div>
        <button className={Styles.submitButton} onClick={(e)=>submitHandler(e)} type="Submit">Submit</button>
    </div>
  )
}

export default CustomerEditForm