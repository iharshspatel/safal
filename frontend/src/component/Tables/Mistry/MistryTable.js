import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Styles from './MistryTable.module.css'
import axios from 'axios'
import Add from '../../../Assets/Add.svg'
import MaterialTable from 'material-table';
import { Paper } from '@material-ui/core';
import Modal from '../../Layout/Modal/Modal';
import ArchitectEditForm from '../../Forms/ArchitectEditForm';
import MistryEditForm from '../../Forms/MistryEditForm';
import { toast, ToastContainer } from 'react-toastify'
import Select from 'react-select'
import TextField from '@mui/material/TextField';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import MaterialReactTable from 'material-react-table';
import { ExportToCsv } from 'export-to-csv';
import { dateformater } from '../Utils/util';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  // TextField,
  Tooltip,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
const MistryTable = ({ modalHandler, refresh, isOpen }) => {
  const [mistry, setMistry] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [editModalData, setEditModalData] = useState({});
  const [tabledata, setTableData] = useState([])
  const [originalData, setOriginalData] = useState([]);
  const [startDate, setStartDate] = useState(new Date('2022-08-01'));
  const [endDate, setEndDate] = useState(new Date());
  const [branches, setBranches] = useState([]);
  let [selectedBranch,setSelectedBranch] = useState(null);
  let [selectedSalesman,setSelectedSalesman] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const startDateHandler = (e) => {
    setStartDate(new Date(e.target.value));
  }

  const endDateHandler = (e) => {
    setEndDate(new Date(e.target.value));
  }

  const columns = useMemo(
    () => [
      { header: 'Date', accessorKey: 'date', type: "date", dateSetting: { locale: "en-GB" },  Cell: ({cell})=>(dateformater(cell.getValue())) },
      { header: 'Name', accessorKey: 'name' },
      { header: 'Address', accessorKey: 'address' },
      { header: 'Mobile Number', accessorKey: 'mobileno' },
    ],
    [],
  );
  const ops = [
    { header: 'Date', accessorKey: 'date', type: "date", dateSetting: { locale: "en-GB" }, },
    { header: 'Name', accessorKey: 'name' },
    { header: 'Address', accessorKey: 'address' },
    { header: 'Mobile Number', accessorKey: 'mobileno' },
    // { header: 'Email', accessorKey: 'Email', },
    // { header: 'Company_Name', accessorKey: 'companyName', },
    // { header: 'Birth_Date', accessorKey: 'birthdate', },
    // { header: 'Marriage_Date', accessorKey: 'marriagedate', },
    // { header: 'Remarks', accessorKey: 'remarks', },
    // { header: 'Bank_Name', accessorKey: 'bankname', },
    // { header: 'IFS_Code', accessorKey: 'IFSCcode', },
    // { header: 'Branch_Name', accessorKey: 'branchname', },
    // { header: 'Adhar_Card', accessorKey: 'adharcard', },
    // { header: 'Pan_Card', accessorKey: 'pancard', columnVisibility: 'false' },
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
  const submitDateRangeHandler = (e) => {
    console.log(startDate, endDate);
    let data = mistry.filter((item) => {
      let date = item.date;
      date = new Date(date);
      if (date < endDate && date > startDate) {
        return true
      }
      else {
        return false
      }
    })
    setTableData(data)
  }

  const delteHandler = async (mobileno) => {
    alert("Are you sure ?")
    const data = await axios.delete(`/api/v1/mistry/delete/${mobileno}`);
    fetchMistry();
  }

  const fetchMistry = async () => {
    const { data } = await axios.get("/api/v1/mistry/getall");
    const newMistries = data.mistries.map((item)=>{
      let formateddate = item.date ? dateformater(item.date) : '01/01/1799';
      return {
        date:formateddate,
        name:item.name,
        address:item.address,
        mobileno:item.mobileno,
      }
    });
    setOriginalData(data.mistries);
    setTableData(newMistries);
    setMistry(data.mistries);
  }
  const fetchBranches = async () => {
    const { data } = await axios.get("/api/v1/branch/getall");
    // console.log(data.branches);
    const branches = data.branches.map((branch) => (
      {
        branchname: branch.branchname,
        value: branch.branchname,
        label: branch.branchname

      }
    ))
    setBranches(branches);
  }
  const sleep = time => {
    return new Promise(resolve => setTimeout(resolve, time));
  };

  const fetchMistryofBranch = async () => {
    setIsLoading(true);
    sleep(500);
    const {data} = await axios.post("/api/v1/branch/mistry", selectedBranch, { headers: { "Content-Type": "application/json" } });

    const newMistries = data.mistries.map((item)=>{
      let formateddate = item.date ? dateformater(item.date) : ' ';
      return {
        date:formateddate,
        name:item.name,
        address:item.address,
        mobileno:item.mobileno,
      }
    });

    setOriginalData(data.mistries);
    setTableData(newMistries);
    setIsLoading(false);
  }
  const handlebranch = (selected) => {
    console.log(selected);
    // setselectedBranch(selected);
    setSelectedBranch(selected.value);
    fetchFilteredMistry(selectedSalesman, selected.value);
  }
  const [salesman, setSalesman] = useState([]);
  const fetchSalesmen = async () => {
    const { data } = await axios.get("/api/v1/salesman/getall");

    const salesmen = data.salesmans.map((branch) => (
      {
        name: branch.name,
        value: branch.name,
        label: branch.name

      }
    ))
    setSalesman(salesmen);
  }
  const fetchArchitectsofSalesman = async () => {
    setIsLoading(true);
    sleep(500);

    // console.log(selectedSalesman);
    const {data} = await axios.post("/api/v1/salesman/mistry", selectedSalesman, { headers: { "Content-Type": "application/json" } });

    const newMistries = data.mistries.map((item)=>{
      let formateddate = item.date ? dateformater(item.date) : ' ';
      return {
        date:formateddate,
        name:item.name,
        address:item.address,
        mobileno:item.mobileno,
      }
    });

    setOriginalData(data.mistries);
    setTableData(newMistries);
    setIsLoading(false);
  }
  const handlesalesman = (selected) => {
    setSelectedSalesman(selected.value)
    fetchFilteredMistry(selected.value, selectedBranch);
  }

  const fetchFilteredMistry =(salesman, branch) => {

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
      let formateddate = item.date ? item.date : '01/01/1799';
      return {
        date:formateddate,
        name:item.name,
        address:item.address,
        mobileno:item.mobileno,
      }
      })

    setMistry(data);
    setTableData(data);  
  }

  useEffect(() => {
    fetchBranches();
    fetchMistry();
    fetchSalesmen();

  }, [refresh]);
  const handleCallbackCreate = (childData) => {
    // console.log("Parent Invoked!!")
    toast.success("Mistry edited");
    // fetchMistry();
  }

  const getMistryData = (mobileno) => {
    alert(mobileno);
    let mistry = originalData.filter((item) => item.mobileno === mobileno);
    console.log(mistry);
    setEditModalData(mistry[0]);
    setEditModal(true);
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
      // backgroundColor: variables.colorPrimaryLighter
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
  return (
    <div className={Styles.container}>
      <div className={Styles.table}>
        <div className={Styles.header}>
          <h3>All Mistry</h3>

          <div className={Styles.buttonContainer}>
            <img className={Styles.addImg} src={Add} alt="add" />
            <p className={Styles.buttonText} onClick={modalHandler}>
              Add Mistry
            </p>
          </div>
        </div>
        <div className={Styles.Yellow}>

          <div className={Styles.DateRangeContainer}>
            {/* <label>Branch</label> */}
            <label>Salesman Filter</label>
            <Select styles={customStyles} onChange={(e) => handlesalesman(e)} options={salesman} />
            <label>Branch Filter</label>
            <Select styles={customStyles} onChange={(e) => handlebranch(e)} options={branches} />
            {/* <Select styles={customStyles} onChange={(e) => handlebranch(e)} options={branches} /> */}
            <TextField
              className={Styles.InputDate}
              id="date"
              label="Start Date"
              type="date"
              // defaultValue="2017-05-24"
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
              // defaultValue="2017-05-24"
              sx={{ width: 180, margin: 1 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <button className={Styles.SubmitButton} onClick={(e) => submitDateRangeHandler(e)} type="submit"> Submit </button>
          </div>

        </div>
        {mistry &&
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
                    getMistryData(row.original.mobileno);
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
                    console.log(`delete `, row)
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
        editModal ? <Modal><MistryEditForm modalHandler={() => { setEditModal(false) }} data={editModalData} setIsOpen={setEditModal} parentCallback={handleCallbackCreate} /></Modal> : null}

      <div className={Styles.filter}>

      </div>
    </div>
  )
}

export default MistryTable