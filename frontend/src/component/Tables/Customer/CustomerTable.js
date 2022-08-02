import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Styles from './CustomerTable.module.css'
import Add  from '../../../Assets/Add.svg'
import MaterialTable from 'material-table';
import Modal from '../../Layout/Modal/Modal';
import { Paper } from '@material-ui/core';
import axios from 'axios';
import CustomerEditForm from '../../Forms/CustomerEditForm';
import DummyEditForm from '../../Forms/DummyEditForm';

const CustomerTable = ({modalHandler}) => {

  const [customers, setCustomers] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [editModalData, setEditModalData] = useState({});

  const modifyData = (data) => {

     
     let datass1 = data.map((d)=>{
      if(d.architectTag){
        return{
          ...d,
         tag:d.architectTag + '(A)'
        }}
      if(d.mistryTag){
          return{
            ...d,
           tag:d.mistryTag + '(M)'
          }
      }
      if(d.PMCTag){
        return{
          ...d,
         tag:d.PMCTag + '(P)'
        }
      }
      if(d.dealerTag){
        return{
          ...d,
         tag:d.dealerTag + '(D)'
        }
      }
      return d
     })
    console.log(datass1)
     return datass1
    
  } 

  const delteHandler = async(id) => {
      const data = await axios.delete(`/api/v1/customer/delete/${id}`);
      fetchCustomers();
  }

  const fetchCustomers = async() =>{
    const {data} = await axios.get("/api/v1/customer/getall");
    console.log(data)
    setCustomers(modifyData(data.customers));
  }
  useEffect(() => {
    fetchCustomers(); 
    console.log(`editModal`, editModal)
  }, [editModal]);


  return (
    <div className={Styles.container}>
    <div className={Styles.table}>
    <div className={Styles.header}>
    <h3>All Customers</h3>

    <div className={Styles.buttonContainer}>
     <img className={Styles.addImg} src={Add} alt="add" />
        <p className={Styles.buttonText} onClick={modalHandler}> 
        Add Customer
     </p>
     </div>
     </div>

     { customers && <MaterialTable
     className={Styles.Table}
      columns={[
        { title: 'Date', field: 'date', type:"date", dateSetting: { locale: "en-GB" },},
        { title: 'Name', field: 'name'},
        { title: 'Email', field: 'Email', hidden:'true'},
        { title: 'Address', field: 'address'},
        { title: 'Birth Date', field: 'birthdate',hidden:'true' },
        { title: 'Marriage Date', field: 'marriagedate', hidden:'true' },
        { title: 'Remarks', field: 'remarks', hidden:'true' },
        { title: 'Order Value', field: 'orderValue', hidden:'true' },
        { title: 'Sales Person', field: 'salesPerson', hidden:'true' },
        { title: 'Tag', field: 'tag' },
        
        
      ]}
      data={customers}        
      options={{
        sorting: true,
        headerStyle: {
          zIndex:0
        },
        showTitle:false,
        actionsColumnIndex: -1,
        filtering:true
      }}
      components={{
        Container: props => <Paper {...props} 
        elevation={0}  
        style={{
          padding: 20,
          width:"100%",
      }}/>
    }}

    
   actions={[
    {
      icon: 'edit',
      tooltip: 'Edit',
      onClick: (event, rowData) => {
        setEditModalData(rowData);
        setEditModal(!editModal);
        console.log(`Edit ` , rowData)
      }
    },
    {
      icon: 'delete',
      tooltip: 'Delete',
      onClick: (event, rowData) => {
        // Do save operation
        delteHandler(rowData._id);
        console.log(`delete ` , rowData)
      }
    }
  ]}

    />}
  </div>
  
{
   editModal ? <Modal><CustomerEditForm modalHandler={()=>{setEditModal(false)}} data={editModalData}/></Modal>: null
} 

    <div className={Styles.filter}>

    </div>
    </div>
 
  )
}

export default CustomerTable