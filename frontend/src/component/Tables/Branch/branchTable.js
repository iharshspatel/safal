import React, { useEffect, useState ,useMemo} from 'react';
import { Link } from 'react-router-dom';
import Styles from './branchTable.module.css'
import axios from 'axios'
import Add from '../../../Assets/Add.svg'
import MaterialTable from 'material-table';
import { Paper } from '@material-ui/core';
import Modal from '../../Layout/Modal/Modal';

import { toast, ToastContainer } from 'react-toastify';
import Select from 'react-select'
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


const BranchTable = ({ modalHandler, refresh ,isOpen}) => {
    const [tabledata, setTableData] = useState([])
    const [branches, setBranches] = useState([]);
    const delteHandler = async (id) => {
        if(window.confirm("Are you sure ?")){
            const data = await axios.delete(`/api/v1/branch/delete/${id}`);
            console.log(id)
            fetchBranches();
        }
    }
    const fetchBranches = async () => {
        const { data } = await axios.get("/api/v1/branch/getall");
        const branches = data.lengths.map((branch) => {
            return {
                branchname: branch._doc.branchname,
                arch: branch.arclen,
                cust: branch.custlen,
                deal: branch.deallen,
                mist: branch.mistlen,
                pmc: branch.pmclen
            }
        });

        setBranches(branches);
        setTableData(branches);

    }
    useEffect(() => {
        fetchBranches();
    }, [refresh]);

    const columns = useMemo(
        () =>
            [
                { header: 'Branch', accessorKey: 'branchname' },
                { header: 'Architects', accessorKey: 'arch' },
                { header: 'Customers', accessorKey: 'cust' },
                { header: 'Dealers', accessorKey: 'deal' },
                { header: 'Mistries', accessorKey: 'mist' },
                { header: 'PMCs', accessorKey: 'pmc' },
            ]
        ,
        [],
    );
    const ops = [
        { header: 'Branch', accessorKey: 'branchname' },
        { header: 'Architects', accessorKey: 'arch' },
        { header: 'Customers', accessorKey: 'cust' },
        { header: 'Dealers', accessorKey: 'deal' },
        { header: 'Mistries', accessorKey: 'mist' },
        { header: 'PMCs', accessorKey: 'pmc' },
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
                    <h3>All Branch</h3>

                    <div className={Styles.buttonContainer}>
                        <img className={Styles.addImg} src={Add} alt="add" />
                        <p className={Styles.buttonText} onClick={modalHandler}>
                            Add Branch
                        </p>

                    </div>
                </div>

                {branches &&
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
                        enableTopToolbar={ !isOpen}

                        muiTablePaginationProps={{
                            rowsPerPageOptions: [5, 10],
                            showFirstLastPageButtons: true,
                        }}
                        enableGlobalFilter={true}
                        positionActionsColumn='last'
                        renderRowActions={({ row, table }) => (
                            <Box sx={{ display: 'flex', gap: '1rem' }}>
                                
                                <Tooltip arrow placement="right" title="Delete">
                                    <IconButton color="error" onClick={() => {
                                        window.scrollTo({
                                            top: 0,
                                            left: 0,
                                            behavior: "smooth"
                                        });
                                        delteHandler(row.original.branchname);
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


                {/*                 
                {branches && <MaterialTable


                    className={Styles.Table}
                    columns={[
                        { title: 'Branch', field: 'branchname' },
                        { title: 'Architects', field: 'arch' },
                        { title: 'Customers', field: 'cust' },
                        { title: 'Dealers', field: 'deal' },
                        { title: 'Mistries', field: 'mist' },
                        { title: 'PMCs', field: 'pmc' },
                    ]}
                    data={branches}
                    options={{
                        sorting: true,
                        headerStyle: {
                            zIndex: 0
                        },
                        showTitle: false,
                        actionsColumnIndex: -1,
                        filtering: true
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
                            icon: 'delete',
                            tooltip: 'Delete',
                            onClick: (event, rowData) => {
                                window.scrollTo({
                                    top: 0,
                                    left: 0,
                                    behavior: "smooth"
                                });
                                deleteHandler(rowData.branchname);
                                console.log(`delete `, rowData)
                            }
                        }
                    ]}
                />} */}

            </div>

            {/* {
                editModal ? <Modal><BranchEditForm modalHandler={() => { setEditModal(false) }} data={editModalData} setIsOpen={setEditModal} parentCallback={handleCallbackCreate} /></Modal> : null}

            <div className={Styles.filter}>

            </div> */}
        </div>
    )
}

export default BranchTable