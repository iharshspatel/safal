import React, { useState, useEffect,useMemo } from 'react';
import { Link } from 'react-router-dom';
import Styles from './CustomerTable.module.css'
import Add from '../../../Assets/Add.svg'
import MaterialTable from 'material-table';
import Modal from '../../Layout/Modal/Modal';
import { Paper } from '@material-ui/core';
import axios from 'axios';
import CustomerEditForm from '../../Forms/CustomerEditForm';
import DummyEditForm from '../../Forms/DummyEditForm';
import { toast, ToastContainer } from 'react-toastify'
import Select from 'react-select'
import TextField from '@mui/material/TextField';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import MaterialReactTable from 'material-react-table';
import { ExportToCsv } from 'export-to-csv';
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
const CustomerTable = ({ modalHandler, refresh, isOpen }) => {

  const [customers, setCustomers] = useState([]);
  const [tabledata, setTableData] = useState([])
  const [editModal, setEditModal] = useState(false);
  const [editModalData, setEditModalData] = useState({});
  const [startDate, setStartDate] = useState(new Date('2022-08-01'));
  const [endDate, setEndDate] = useState(new Date());
  const [branches, setBranches] = useState([]);
  let selectedBranch = [];
  const [isLoading, setIsLoading] = useState(false);

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
    console.log(datass1)
    return datass1

  }

  const delteHandler = async (id) => {
    const data = await axios.delete(`/api/v1/customer/delete/${id}`);
    fetchCustomers();
  }



  const startDateHandler = (e) => {
    setStartDate(new Date(e.target.value));
  }

  const endDateHandler = (e) => {
    setEndDate(new Date(e.target.value));
  }

  const dateformater = (date) => {
    let year = date.getFullYear();
    let month = (date.getMonth() + 1) > 9 ? date.getMonth() + 1 : '0' + date.getMonth();
    let day = (date.getDay() + 1) > 9 ? date.getDay() + 1 : '0' + date.getDay();
    return `${year}-${month}-${day}`
  }

  const submitDateRangeHandler = (e) => {
    console.log(startDate, endDate);
    let data = customers.filter((item) => {
      let date = item.date;
      date = new Date(date);
      if (date < endDate && date > startDate) {
        return true
      }
      else {
        return false
      }
    })
    console.log(data)
    setTableData(data)
    console.log(new Date(customers[0].date));
  }
  //currently it is sending data
  const fetchCustomers = async () => {
    const { data } = await axios.get("/api/v1/customer/getall");
    // console.log(data)
    setCustomers(modifyData(data.customers));
    setTableData(modifyData(data.customers));
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

  const fetchCustomersofBranch = async () => {
    setIsLoading(true);
    sleep(500);
    // let data=selectedBranch;
    console.log(selectedBranch);
    const response = await axios.post("/api/v1/branch/customers", selectedBranch, { headers: { "Content-Type": "application/json" } });
    // const { data } = await axios.get("/api/v1/branch/architects");
    console.log(response);
    const newcust = response.data.customers;
    // setCustomers(newcust);
    setTableData(newcust);
    setIsLoading(false);
  }
  const handlebranch = (selected) => {
    console.log(selected);
    // setselectedBranch(selected);
    selectedBranch = selected;
    fetchCustomersofBranch();
  }
  const [salesman, setSalesman] = useState([]);
  let selectedSalesman = [];
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
    const response = await axios.post("/api/v1/salesman/customers", selectedSalesman, { headers: { "Content-Type": "application/json" } });

    // console.log(response);
    const newarchitects = response.data.customers;

    setTableData(newarchitects);
    setIsLoading(false);
  }
  const handlesalesman = (selected) => {
    console.log(selected);

    selectedSalesman = selected;
    fetchArchitectsofSalesman();
  }


  useEffect(() => {
    fetchCustomers();
    fetchBranches();
    fetchSalesmen();
    // console.log(`editModal`, editModal)
  }, [refresh]);
  const handleCallbackCreate = (childData) => {
    // console.log("Parent Invoked!!")
    toast.success("Customer edited");
    fetchCustomers();
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
  const columns = useMemo(
    () => [
      { header: 'Date', accessorKey: 'date', type: "date", dateSetting: { locale: "en-GB" }, },
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
    { header: 'Email', accessorKey: 'Email', },
    { header: 'Company_Name', accessorKey: 'companyName', },
    { header: 'Birth_Date', accessorKey: 'birthdate', },
    { header: 'Marriage_Date', accessorKey: 'marriagedate', },
    { header: 'Remarks', accessorKey: 'remarks', },
    { header: 'Bank_Name', accessorKey: 'bankname', },
    { header: 'IFS_Code', accessorKey: 'IFSCcode', },
    { header: 'Branch_Name', accessorKey: 'branchname', },
    { header: 'Adhar_Card', accessorKey: 'adharcard', },
    { header: 'Pan_Card', accessorKey: 'pancard', columnVisibility: 'false' },
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
          <h3>All Customers</h3>

          <div className={Styles.buttonContainer}>
            <img className={Styles.addImg} src={Add} alt="add" />
            <p className={Styles.buttonText} onClick={modalHandler}>
              Add Customer
            </p>
          </div>
        </div>
        {/* = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(); */}
        <div className={Styles.Yellow}>
          <div className={Styles.DateRangeContainer}>
            {/* <label>Branche</label> */}
            <label>Salesman Filter</label>
            <Select styles={customStyles} onChange={(e) => handlesalesman(e)} options={salesman} />
            <label>Branch Filter</label>
            <Select styles={customStyles} onChange={(e) => handlebranch(e)} options={branches} />
            {/* <Select styles={customStyles} selectedValue={branches} onChange={(e) => handlebranch(e)} options={branches} /> */}
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
        {customers &&
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

                    setEditModalData(row.original)
                    setEditModal(true);
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
                    delteHandler(row.original._id);
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



        {/* {customers && <MaterialTable
          isLoading={isLoading}
          className={Styles.Table}
          columns={[
            { title: 'Date', field: 'date', type: "date", dateSetting: { locale: "en-GB" }, },
            { title: 'Name', field: 'name' },
            { title: 'Email', field: 'Email', hidden: 'true' },
            { title: 'Address', field: 'address' },
            { title: 'Birth Date', field: 'birthdate', hidden: 'true' },
            { title: 'Marriage Date', field: 'marriagedate', hidden: 'true' },
            { title: 'Remarks', field: 'remarks', hidden: 'true' },
            { title: 'Order Value', field: 'orderValue', hidden: 'true' },
            { title: 'Sales Person', field: 'salesPerson', hidden: 'true' },
            { title: 'Tag', field: 'tag' },


          ]}
          data={tabledata}
          options={{
            sorting: true,
            headerStyle: {
              zIndex: 0
            },
            showTitle: false,
            actionsColumnIndex: -1,
            filtering: true,
            exportButton: true

          }}
          components={{
            Container: props => <Paper {...props}
              elevation={0}
              style={{
                padding: 20,
                width: "100%",
              }} />
          }}


          actions={[
            {
              icon: 'edit',
              tooltip: 'Edit',
              onClick: (event, rowData) => {
                window.scrollTo({
                  top: 0,
                  left: 0,
                  behavior: "smooth"
                });
                setEditModalData(rowData);
                setEditModal(!editModal);
                console.log(`Edit `, rowData)
              }
            },
            {
              icon: 'delete',
              tooltip: 'Delete',
              onClick: (event, rowData) => {
                window.scrollTo({
                  top: 0,
                  left: 0,
                  behavior: "smooth"
                });
                // Do save operation
                delteHandler(rowData._id);
                console.log(`delete `, rowData)
              }
            }
          ]}

        />} */}
      </div>

      {
        editModal ? <Modal><CustomerEditForm modalHandler={() => { setEditModal(false) }} data={editModalData} setIsOpen={setEditModal} parentCallback={handleCallbackCreate} /></Modal> : null
      }

      <div className={Styles.filter}>

      </div>
    </div>

  )
}

export default CustomerTable