import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Styles from './branchTable.module.css'
import axios from 'axios'
import Add from '../../../Assets/Add.svg'
import MaterialTable from 'material-table';
import { Paper } from '@material-ui/core';
import Modal from '../../Layout/Modal/Modal';

import { toast, ToastContainer } from 'react-toastify';
import Select from 'react-select'

const BranchTable = ({ modalHandler }) => {
    const [tabledata, setTableData] = useState([])
    const [branches, setBranches] = useState([]);
    const deleteHandler = async (id) => {
        const data = await axios.delete(`/api/v1/branch/delete/${id}`);
        console.log(id)
        fetchBranches();
    }
    const fetchBranches = async () => {
        const { data } = await axios.get("/api/v1/branch/getall");
        const branches = data.lengths.map((branch) => {
            return {
                branchname: branch._doc.branchname,
                arch: branch.arclen,
                cust:branch.custlen,
                deal:branch.deallen,
                mist:branch.mistlen,
                pmc:branch.pmclen
            }
        });
        
        setBranches(branches);
        setTableData(branches);
        
    }
    useEffect(() => {
        fetchBranches();
    }, []);
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

                                deleteHandler(rowData.branchname);
                                console.log(`delete `, rowData)
                            }
                        }
                    ]}
                />}

            </div>

            {/* {
                editModal ? <Modal><BranchEditForm modalHandler={() => { setEditModal(false) }} data={editModalData} setIsOpen={setEditModal} parentCallback={handleCallbackCreate} /></Modal> : null}

            <div className={Styles.filter}>

            </div> */}
        </div>
    )
}

export default BranchTable