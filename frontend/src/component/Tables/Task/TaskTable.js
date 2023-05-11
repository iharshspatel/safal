import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Styles from './TaskTable.module.css'
import Add from '../../../Assets/Add.svg'
import MaterialTable from 'material-table';
import Modal from '../../Layout/Modal/Modal';
import { Paper } from '@material-ui/core';
import axios from 'axios';
import DummyEditForm from '../../Forms/DummyEditForm';
import { toast, ToastContainer } from 'react-toastify'
import Select from 'react-select'
import TextField from '@mui/material/TextField';
import { dateformater } from '../Utils/util';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import MaterialReactTable from 'material-react-table';
import { ExportToCsv } from 'export-to-csv';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, MenuItem, Stack, Tooltip, } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import TaskEditForm from '../../Forms/TaskEditForm';
const TaskTable = ({ modalHandler, refresh, isOpen, doRefresh }) => {

    const [customers, setCustomers] = useState([]);
    const [tabledata, setTableData] = useState([])
    const [originalData, setOriginalData] = useState([]);
    const [editModal, setEditModal] = useState(false);
    const [editModalData, setEditModalData] = useState({});
    const [startDate, setStartDate] = useState(new Date('2022-08-01'));
    const [endDate, setEndDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(false);
    let [selectedSalesman, setSelectedSalesman] = useState(null);

    const modifyData = (data) => {
        let datass1 = data.map((d) => {
            if (d.architectTag) {
                return {
                    ...d,
                    tag: d.architectTag.name + '(A)'
                }
            }
            if (d.mistryTag) {
                return {
                    ...d,
                    tag: d.mistryTag.name + '(M)'
                }
            }
            if (d.pmcTag) {
                return {
                    ...d,
                    tag: d.pmcTag.name + '(P)'
                }
            }
            if (d.dealerTag) {
                return {
                    ...d,
                    tag: d.dealerTag.name + '(D)'
                }
            }
            return d
        })
        console.log(datass1)
        return datass1
    }

    const delteHandler = async (id) => {
        if (window.confirm("Are you sure ?")) {
            const data = await axios.delete(`/api/v1/task/delete/${id}`);
            fetchCustomers();
            doRefresh(!refresh)
        }
    }

    const startDateHandler = (e) => {
        setStartDate(new Date(e.target.value));
    }

    const endDateHandler = (e) => {
        setEndDate(new Date(e.target.value));
    }

    const submitDateRangeHandler = (e) => {
        let data = customers.filter((item) => {
            console.log(item.date)
            if (item.date) {
                let date = item.date;
                date = new Date(date);
                if (date < endDate && date > startDate) {
                    return true
                }
                else {
                    return false
                }
            }
            else {
                return false
            }


        })
        setCustomers(data);
        setTableData(data)
    }

    const fetchCustomers = async () => {
        const { data } = await axios.get("/api/v1/task/totaltasks");
        let modifiedData = modifyData(data.tasks);
        const newCustomers = modifiedData.map((item) => {
            let formateddate = item.date ? item.date : ' ';

            return {
                date: formateddate,
                tag: item.tag,
                remarks: item.remarks,
                salesman: item.salesmanId.name,
                _id: item._id
            }
        });
        setOriginalData(modifiedData);
        setCustomers(newCustomers);
        setTableData(newCustomers);
    }

    const sleep = time => {
        return new Promise(resolve => setTimeout(resolve, time));
    };

    const fetchFilteredCustomers = (salesman) => {
        let filteredData = originalData.filter((item) => item.salesmanId.name === salesman)
        let data = filteredData.map((item) => {
            let formateddate = item.date ? item.date : ' ';
            return {
                date: formateddate,
                tag: item.tag,
                remarks: item.remarks,
                salesman: item.salesmanId.name,
                _id: item._id
            }
        })

        setCustomers(modifyData(data));
        setTableData(modifyData(data));
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
    const handlesalesman = (selected) => {
        selectedSalesman = selected;
        fetchFilteredCustomers(selected.value);
    }


    useEffect(() => {
        fetchCustomers();
        fetchFilteredCustomers(selectedSalesman);
        fetchSalesmen();
    }, [refresh]);

    useEffect(() => {
        fetchFilteredCustomers(selectedSalesman)
    }, [originalData]);

    const handleCallbackCreate = async (childData) => {
        toast.success("Task edited");
        const { data } = await axios.get("/api/v1/task/totaltasks");
        setOriginalData(modifyData(data.tasks));
    }

    const getCustomerData = (id) => {
        console.log(originalData);
        let customer = originalData.filter((item) => item._id === id);
        console.log(customer);
        setEditModalData(customer[0]);
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
    const columns = useMemo(
        () => [
            {
                header: 'Date', accessorKey: 'date', type: "date", dateSetting: { locale: "en-GB" },
                Cell: ({ cell }) => (dateformater(cell.getValue()))
            },
            { header: 'Remarks', accessorKey: 'remarks', },
            { header: 'Tag', accessorKey: 'tag' },
            { header: 'Salesman', accessorKey: 'salesman' },
        ],
        [],
    );
    const ops = [
        { header: 'Date', accessorKey: 'date', type: "date", dateSetting: { locale: "en-GB" }, },
        { header: 'Remarks', accessorKey: 'remarks', },
        { header: 'Tag', accessorKey: 'tag' },
        { header: 'Salesman', accessorKey: 'salesman' },
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
                    <h3>All Tasks</h3>

                    <div className={Styles.buttonContainer}>
                        <img className={Styles.addImg} src={Add} alt="add" />
                        <p className={Styles.buttonText} onClick={modalHandler}>
                            Add Task
                        </p>
                    </div>
                </div>
                <div className={Styles.Yellow}>
                    <div className={Styles.DateRangeContainer}>
                        <label>Salesman Filter</label>
                        <Select styles={customStyles} onChange={(e) => handlesalesman(e)} options={salesman} />
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
                                        getCustomerData(row.original._id);
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
                                    // className={Styles.bu}
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
                editModal ? <Modal><TaskEditForm modalHandler={() => { setEditModal(false) }} data={editModalData} setIsOpen={setEditModal} parentCallback={handleCallbackCreate} /></Modal> : null
            }

            <div className={Styles.filter}></div>
        </div>

    )
}

export default TaskTable