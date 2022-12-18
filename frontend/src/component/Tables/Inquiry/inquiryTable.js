import React, { useState, useEffect,useMemo } from 'react';
import Styles from './inquiryTable.module.css'
import Add from '../../../Assets/Add.svg'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Modal from '../../Layout/Modal/Modal';
import axios from 'axios';
import { toast } from 'react-toastify'
import Select from 'react-select'
import TextField from '@mui/material/TextField';
import InquiryEditForm from '../../Forms/InquiryEditForm';
import { dateformater,dateParser } from '../Utils/util';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import MaterialReactTable from 'material-react-table';
import { ExportToCsv } from 'export-to-csv';

import {
  Box,
  Button,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
const InquiryTable = ({ modalHandler ,modalHandler2,refresh,isOpen}) => {

  const [inquiries, setInquiries] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [tabledata, setTableData] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [editModalData, setEditModalData] = useState({});
  const [startDate, setStartDate] = useState(new Date('2022-08-01'));
  const [endDate, setEndDate] = useState(new Date());
  const [branches, setBranches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [salesman, setSalesman] = useState([]);
  let [selectedBranch,setSelectedBranch] = useState(null);
  let [selectedSalesman,setSelectedSalesman] = useState(null);

  const fetchSalesmen = async () => {
    const { data } = await axios.get("/api/v1/salesman/getall");
    const salesmen = data.salesmans.map((salesman) => (
      {
        name: salesman.name,
        value: salesman.name,
        label: salesman.name

      }
    ))
    setSalesman(salesmen);
  }

  const fetchBranches = async () => {
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

  const handlesalesman = (selected) => {
    console.log(selected);
    setSelectedSalesman(selected.value);
    console.log(selected.value)
    fetchFilteredInquiries(selected.value,selectedBranch);
  }

  const handlebranch = (selected) => {
    setSelectedBranch(selected.value);
    console.log(selected.value)
    console.log(selected);
    fetchFilteredInquiries(selectedSalesman,selected.value);
  }

  const modifyData = (data) => {
    let datass1 = data.map((d) => {
      if (d.architectTag) {
        return {
          ...d,
          tag: d.architectName + '(A)'
        }
      }
      if (d.mistryTag) {
        return {
          ...d,
          tag: d.mistryName + '(M)'
        }
      }
      if (d.pmcTag) {
        return {
          ...d,
          tag: d.pmcName + '(P)'
        }
      }
      if (d.dealerTag) {
        return {
          ...d,
          tag: d.dealerName + '(D)'
        }
      }
      return d
    })
    return datass1
  }

  const delteHandler = async (id) => {
    alert(id);
    const data = await axios.delete(`/api/v1/inquiry/delete/${id}`);
    fetchInquiry();
  }

  const startDateHandler = (e) => {
    setStartDate(new Date(e.target.value));
  }

  const endDateHandler = (e) => {
    setEndDate(new Date(e.target.value));
  }

  const getInquiryData = (mobileno) => {
    let inquiry = originalData.filter((item) => item.mobileno === mobileno);
    setEditModalData(inquiry[0]);
    setEditModal(true);
  }

  const submitDateRangeHandler = (e) => {
    let data = inquiries.filter((item) => {
      let date = (item.followupdate);
      date = new Date(date);
      if(date){
      if (date < endDate && date > startDate) {
        return true
      }
      else {
        return false
      }
    }
    else{
      return false
    }
    })
    setTableData(data)
  }
  
  const fetchInquiry = async () => {
    const { data } = await axios.get("/api/v1/inquiry/getall");
    setOriginalData(data.inquiries);
    let inquires = data.inquiries.map((item)=>{
      return {
        date:item.date,
        name:item.name,
        followupdate:item.followupdate,
        stage:item.stage,
        mobileno:item.mobileno
      }
    })
    setInquiries(modifyData(inquires));
    setTableData(modifyData(inquires));
  }


  const sleep = time => {
    return new Promise(resolve => setTimeout(resolve, time));
  };


  const fetchFilteredInquiries =(salesman, branch) => {

    let filteredData = originalData.filter((item)=>{
      let isBranch = false;
      let isSalesman = false;
      
      item.branches.forEach((branchObject)=>{
        if(Object.values(branchObject).includes(branch) || branch===null){
        isBranch = true;
      }})
      item.salesmen.forEach((salesmanObj)=>{
        if(Object.values(salesmanObj).includes(salesman) || salesman===null){
          isSalesman = true;
        }})

      console.log(isBranch, isSalesman)
      if(isSalesman && isBranch){
        return true
      }
    })
    console.log(filteredData);
    let data = filteredData.map((item)=>{
        return {
          date:item.date,
          name:item.name,
          followupdate:item.followupdate,
          stage:item.stage,
          mobileno:item.mobileno
        }
      })

    setInquiries(modifyData(data));
    setTableData(modifyData(data));  
  }

  useEffect(() => {
    fetchInquiry();
    fetchBranches();
    fetchSalesmen();
    
  }, [refresh]);

  const handleCallbackCreate = (childData) => {
    toast.success("Inquiry edited");
    fetchInquiry();
  }

  const customStyles = {
    control: base => ({
        ...base,
        minHeight: 55
    }),
    dropdownIndicator: base => ({
        ...base,
        padding: 4
    }),
    clearIndicator: base => ({
        ...base,
        padding: 4
    }),
    multiValue: base => ({
        ...base,
        
    }),
    valueContainer: base => ({
        ...base,
        padding: '0px 6px'
    }),
    input: base => ({
        ...base,
        margin: 0,
        padding: 0
    })
};
const columns = useMemo(
  () => [
    { header: 'Date', accessorKey: 'date', type: "date", dateSetting: { locale: "en-GB" }, 
    Cell: ({cell})=>(dateformater(cell.getValue()))},
    { header: 'Name', accessorKey: 'name' },
    { header: 'Follow Update', accessorKey: 'followupdate', type: "date", dateSetting: { locale: "en-GB" }, Cell: ({cell})=>(dateformater(cell.getValue())) },
    {header: 'Stage', accessorKey:'stage'},
    { header: 'Mobile Number', accessorKey: 'mobileno' },
  ],
  [],
);
const ops = [
  { header: 'Date', accessorKey: 'date', type: "date", dateSetting: { locale: "en-GB" }, },
  { header: 'Name', accessorKey: 'name' },
  { header: 'Follow Date', accessorKey: 'followupdate', type: "date", dateSetting: { locale: "en-GB" }, },
  {header: 'Stage', accessorKey:'stage'},
  { header: 'Mobile Number', accessorKey: 'mobileno' },
]
const csvOptions = {
  fieldSeparator: ',',
  quoteStrings: '"',
  decimalSeparator: '.',
  showLabels: true,
  useBom: true,
  useKeysAsHeaders: false,
  headers: ops.map((c) => c.header),
};
const csvExporter = new ExportToCsv(csvOptions);
const handleExportData = () => {

  csvExporter.generateCsv(tabledata);
};
const handleExportRows = (rows) => {
  csvExporter.generateCsv(rows.map((row) => row.original));
};
  return (
    <div className={Styles.container}>
      <div className={Styles.table}>
        <div className={Styles.header}>
          <h3>All Inquiries</h3>

          <div className={Styles.buttonContainer}>
            <img className={Styles.addImg} src={Add} alt="add" />
            <p className={Styles.buttonText} onClick={modalHandler}>
              Add Inquiry
            </p>
            <FilterAltIcon/>
            <p className={Styles.buttonText} onClick={modalHandler2}>
            Filter</p>
          </div>
        </div>
        {/* = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(); */}
        <div className={Styles.Yellow}>
          <div className={Styles.DateRangeContainer}>
            {/* <label>Branche</label> */}
            <label>Salesman Filter</label>
            <Select styles={customStyles} onChange={(e) => handlesalesman(e)} options={salesman} />
            <label>Branch Filter</label>
            {/* <Select styles={customStyles} onChange={(e) => handlebranch(e)} options={branches} /> */}
            <Select styles={customStyles} selectedValue={branches} onChange={(e) => handlebranch(e)} options={branches} />
            <TextField
              className={Styles.InputDate}
              id="date"
              label="Start Date"
              type="date"
              
              onChange={(e) => startDateHandler(e)}
              sx={{ width: 180, margin: 1 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              className={Styles.InputDate}
              id="date"
              label="End Date"
              type="date"
              onChange={(e) => endDateHandler(e)}
              
              sx={{ width: 180, margin: 1 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <button className={Styles.SubmitButton} onClick={(e) => submitDateRangeHandler(e)} type="submit"> Submit </button>
          </div>
        </div>
        {inquiries &&
          <MaterialReactTable
            displayColumnDefOptions={{
              'mrt-row-actions': {
                muiTableHeadCellProps: {
                  align: 'center',
                },

                size: 120,
              },
            }}

            muiTopToolbarProps={
              ({ }) => ({
                color: 'green',
                sx: { display: 'block' },
                zIndex: '0'
              })
            }
            columns={columns}
            data={tabledata}
            enableEditing
            enableRowNumbers
            rowNumberMode='original'
            enableTopToolbar={!editModal && !isOpen}

            muiTablePaginationProps={{
              rowsPerPageOptions: [5, 10],
              showFirstLastPageButtons: true,
            }}
            enableGlobalFilter={true}
            positionActionsColumn='last'
            renderRowActions={({ row, table }) => (
              <Box sx={{ display: 'flex', gap: '1rem' }}>
                <Tooltip arrow placement="left" title="Edit">
                  <IconButton onClick={() => {
                    window.scrollTo({
                      top: 0,
                      left: 0,
                      behavior: "smooth"
                    });
                    getInquiryData(row.original.mobileno)
                    // setEditModalData(row.original)
                    // setEditModal(true);
                  }}>
                    <Edit />

                  </IconButton>
                </Tooltip>
                <Tooltip arrow placement="right" title="Delete">
                  <IconButton color="error" onClick={() => {
                    window.scrollTo({
                      top: 0,
                      left: 0,
                      behavior: "smooth"
                    });
                    delteHandler(row.original.mobileno);
                  }}>
                    <Delete />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
            renderTopToolbarCustomActions={({ table }) => (
              <Box
                sx={{ display: 'flex', gap: '1rem', p: '0.5rem', flexWrap: 'wrap' }}
              >
                <Button
                  disabled={table.getPrePaginationRowModel().rows.length === 0}

                  onClick={() =>
                    handleExportRows(table.getPrePaginationRowModel().rows)
                  }
                  startIcon={<FileDownloadIcon />}
                  variant="contained"
                >Export All Rows</Button>
                <Button
                  className={Styles.bu}
                  color="primary"
                  onClick={handleExportData}
                  startIcon={<FileDownloadIcon />}
                  variant="contained"
                >
                  Export All Data
                </Button>
              </Box>)}

          />}

      </div>

      {
        editModal ? <Modal><InquiryEditForm modalHandler={() => { setEditModal(false) }} data={editModalData} setIsOpen={setEditModal} parentCallback={handleCallbackCreate} /></Modal> : null
      }

      <div className={Styles.filter}>

      </div>
    </div>

  )
}

export default InquiryTable