import React,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Styles from './DealerTable.module.css'
import axios from 'axios'
import Add  from '../../../Assets/Add.svg'
import MaterialTable from 'material-table';
import { Paper } from '@material-ui/core';
import Modal from '../../Layout/Modal/Modal';
import DealerEditForm from '../../Forms/DealerEditForm';

const DealerTable = ({modalHandler}) => {
  const [dealers, setDealers] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [editModalData, setEditModalData] = useState({});

  const modifyData = (data) => {

     let datass = data.map((d)=>{

      let address= d.address;
      if(address){
      let newaddress = `${address.AddressLine1}  ${address.AddressLine2}  ${address.AddressLine3}`

      return {
        ...d,
        address:newaddress
      }
    }
    else{
      return d;
    }


     })

     return datass
    
  } 

  const delteHandler = async(id) => {
      const data = await axios.delete(`/api/v1/dealer/delete/${id}`);
      fetchDealer();
  }

  const fetchDealer = async() =>{
    const {data} = await axios.get("/api/v1/dealer/getall");
    setDealers(modifyData(data.dealers));
  }
  useEffect(() => {
    fetchDealer();
  }, []);
  return (
    <div className={Styles.container}>
    <div className={Styles.table}>
    <div className={Styles.header}>
    <h3>All Dealer</h3>

    <div className={Styles.buttonContainer}>
     <img className={Styles.addImg} src={Add} alt="add" />
        <p className={Styles.buttonText} onClick={modalHandler}> 
        Add Dealer
     </p>
     </div>
     </div>

    {dealers && <MaterialTable
     className={Styles.Table}
      columns={[
        { title: 'Date', field: 'date', type:"date", dateSetting: { locale: "en-GB" },},
        { title: 'Name', field: 'name'},
        { title: 'Email', field: 'Email', hidden:'true'},
        { title: 'Address', field: 'address'},
        { title: 'Company Name', field: 'companyName',hidden:'true' },
        { title: 'Birth Date', field: 'birthdate',hidden:'true' },
        { title: 'Marriage Date', field: 'marriagedate', hidden:'true' },
        { title: 'Remarks', field: 'remarks', hidden:'true' },
        { title: 'Bank Name', field: 'bankname', hidden:'true' },
        { title: 'IFS Code', field: 'IFSCcode', hidden:'true' },
        { title: 'Branch Name', field: 'branchname',hidden:'true' },
        { title: 'Adhar Card', field: 'adharcard',hidden:'true' },
        { title: 'Pan Card', field: 'pancard',hidden:'true' },
      ]}
      data={dealers}        
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
        setEditModal(true);
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
      editModal ? <Modal><DealerEditForm modalHandler={()=>{setEditModal(false)}} data={editModalData}/></Modal> : null   }

    <div className={Styles.filter}>

    </div>
    </div>
  )
}

export default DealerTable