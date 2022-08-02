import React,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Styles from './PMCTable.module.css'
import axios from 'axios'
import Add  from '../../../Assets/Add.svg'
import MaterialTable from 'material-table';
import { Paper } from '@material-ui/core';
import Modal from '../../Layout/Modal/Modal';
import ArchitectEditForm from '../../Forms/ArchitectEditForm';
import MistryEditForm from '../../Forms/MistryEditForm';

const PMCTable = ({modalHandler}) => {
  const [PMC, setPMC] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [editModalData, setEditModalData] = useState({});


  const delteHandler = async(id) => {
      const data = await axios.delete(`/api/v1/pmc/delete/${id}`);
      fetchPMC();
  }

  const fetchPMC = async() =>{
    const {data} = await axios.get("/api/v1/pmc/getall");
    setPMC(data.pmcs);
  }
  useEffect(() => {
    fetchPMC();
  }, []);
  return (
    <div className={Styles.container}>
    <div className={Styles.table}>
    <div className={Styles.header}>
    <h3>All PMCs</h3>

    <div className={Styles.buttonContainer}>
     <img className={Styles.addImg} src={Add} alt="add" />
        <p className={Styles.buttonText} onClick={modalHandler}> 
        Add PMC
     </p>
     </div>
     </div>

    {PMC && <MaterialTable
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
      data={PMC}        
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
      editModal ? <Modal><MistryEditForm modalHandler={()=>{setEditModal(false)}} data={editModalData}/></Modal> : null   }

    <div className={Styles.filter}>

    </div>
    </div>
  )
}

export default PMCTable