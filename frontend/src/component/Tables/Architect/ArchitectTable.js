import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Styles from './ArchitectTable.module.css'
import axios from 'axios'
import Add from '../../../Assets/Add.svg'
import MaterialTable from 'material-table';
import { Paper } from '@material-ui/core';
import Modal from '../../Layout/Modal/Modal';
import ArchitectEditForm from '../../Forms/ArchitectEditForm';
import { toast, ToastContainer } from 'react-toastify';
import Select from 'react-select'

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
  TextField,
  Tooltip,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

import FileDownloadIcon from '@mui/icons-material/FileDownload';
const ArchitecTable = ({ modalHandler, refresh }) => {
  const [architects, setArchitects] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [editModalData, setEditModalData] = useState({});
  const [tabledata, setTableData] = useState([])
  const [startDate, setStartDate] = useState(new Date('2022-08-01'));
  const [endDate, setEndDate] = useState(new Date());
  const [branches, setBranches] = useState([]);
  let selectedBranch = [];
  const [isLoading, setIsLoading] = useState(false);
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
    let data = architects.filter((item) => {
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

  const delteHandler = async (id) => {
    const data = await axios.delete(`/api/v1/architect/delete/${id}`);
    fetchArchitect();
  }

  const fetchArchitect = async () => {
    const { data } = await axios.get("/api/v1/architect/getall");
    setArchitects(data.architects);
    setTableData(data.architects);
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
  const sleep = time => {
    return new Promise(resolve => setTimeout(resolve, time));
  };

  const fetchArchitectsofBranch = async () => {
    setIsLoading(true);
    sleep(500);

    console.log(selectedBranch);
    const response = await axios.post("/api/v1/branch/architects", selectedBranch, { headers: { "Content-Type": "application/json" } });

    console.log(response);
    const newarchitects = response.data.architects;

    setTableData(newarchitects);
    setIsLoading(false);
  }
  const handlebranch = (selected) => {
    console.log(selected);

    selectedBranch = selected;
    fetchArchitectsofBranch();
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


    const response = await axios.post("/api/v1/salesman/architects", selectedSalesman, { headers: { "Content-Type": "application/json" } });


    const newarchitects = response.data.architects;

    setTableData(newarchitects);
    setIsLoading(false);
  }
  const handlesalesman = (selected) => {
    console.log(selected);

    selectedSalesman = selected;
    fetchArchitectsofSalesman();
  }

  useEffect(() => {

    fetchBranches();

    fetchArchitect();
    fetchSalesmen();
  }, [refresh]);

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
  const handleCallbackCreate = (childData) => {

    toast.success("Architect edited");
    fetchArchitect();
    window.scrollTo(0, 0)
  }
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
          <h3>All Architect</h3>

          <div className={Styles.buttonContainer}>
            <img className={Styles.addImg} src={Add} alt="add" />
            <p className={Styles.buttonText} onClick={modalHandler}>
              Add Architect
            </p>

          </div>
        </div>
        <div className={Styles.Yellow}>

          <div className={Styles.DateRangeContainer}>
            <label>Salesman Filter</label>
            <Select styles={customStyles} onChange={(e) => handlesalesman(e)} options={salesman} />
            <label>Branch Filter</label>
            <Select styles={customStyles} onChange={(e) => handlebranch(e)} options={branches} />
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
        {architects &&
          <MaterialReactTable
            displayColumnDefOptions={{
              'mrt-row-actions': {
                muiTableHeadCellProps: {
                  align: 'center',
                },

                size: 120,
              },
            }}
            // muiTopToolbarProps={{color:'secondary',zIndex:'-1'}}
            muiTopToolbarProps={
              ({})=>({
                color:'green',
                sx: { display:  'block'  },
                zIndex:'0'
              })
            }
            // muiLinearProgressProps={({ isTopToolbar }) => ({
            //   color: 'secondary',
            //   // sx: { display: isTopToolbar ? 'block' : 'none' }, //only show top toolbar progress bar
            //   // value: fetchProgress, //show precise real progress value if you so desire
            //   variant: 'determinate',
            //   zIndex:'0'
            // })}

            columns={columns}
            data={tabledata}
            enableEditing
            enableRowNumbers
            rowNumberMode='original'
            enableTopToolbar={!editModal}

            muiTablePaginationProps={{
              rowsPerPageOptions: [5, 10],
              showFirstLastPageButtons: true,
            }}
            enableGlobalFilter={true}
            // components={{
            //   Container: props => <Paper {...props}
            //     elevation={0}
            //     style={{
            //       padding: 20,
            //       width: "100%",
            //     }} />
            // }}
            positionActionsColumn='last'
            // muiTopToolbarProps={}
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


                    console.log(`Edit `, row.original)
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
                sx={{ display: 'flex', gap: '1rem', p: '0.5rem', flexWrap: 'wrap', zIndex: '-1' }}
              >
                <Button
                  disabled={table.getPrePaginationRowModel().rows.length === 0}
                  //export all rows, including from the next page, (still respects filtering and sorting)
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
        editModal ? <Modal ><ArchitectEditForm className={Styles.zi} modalHandler={() => { setEditModal(false) }} data={editModalData} setIsOpen={setEditModal} parentCallback={handleCallbackCreate} /></Modal> : null}

      <div className={Styles.filter}>

      </div>
    </div>
  )
}

export default ArchitecTable