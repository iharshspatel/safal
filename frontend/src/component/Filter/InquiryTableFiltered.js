import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import Styles from "../Tables/Customer/CustomerTable.module.css"
import MaterialTable from 'material-table';

import { Paper } from '@material-ui/core';
import axios from 'axios';


import { toast, ToastContainer } from 'react-toastify'
import Select from 'react-select'
import TextField from '@mui/material/TextField';

const InquiryTableFlitered = ({ modalHandler, refresh }) => {

    const [inquiries, setInquiries] = useState([]);
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
        alert("Are you sure ?")
        const data = await axios.delete(`/api/v1/inquiry/delete/${id}`);
        fetchInquiry();
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
        let data = inquiries.filter((item) => {
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

    }

    let { salesman } = useParams();
    let { branch } = useParams();
    let { startdate } = useParams();
    let { enddate } = useParams();
    const fetchInquiry = async () => {
        
        const { data } = await axios.get("/api/v1/inquiry/get/"+salesman+"/"+branch+"/"+startdate+"/"+enddate);
        
        console.log(data)
        setInquiries(modifyData(data.inquiries));
        setTableData(modifyData(data.inquiries));
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

      const fetchInquiriesofBranch = async () => {
        setIsLoading(true);
        sleep(500);

        console.log(selectedBranch);
        const response = await axios.post("/api/v1/branch/inquiry", selectedBranch, { headers: { "Content-Type": "application/json" } });

        console.log(response);
        const newcust = response.data.inquiries;

        setTableData(newcust);
        setIsLoading(false);
      }
      const handlebranch = (selected) => {
        console.log(selected);

        selectedBranch = selected;
        fetchInquiriesofBranch();
      }


    useEffect(() => {
        fetchInquiry();
        
        
        

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

    return (
        <div className={Styles.container}>
            <div className={Styles.table}>
                <div className={Styles.header}>
                    <h3>All Filtered Inquiries</h3>

                    {/* <div className={Styles.buttonContainer}> */}
                    {/* <img className={Styles.addImg} src={Add} alt="add" /> */}
                    {/* <p className={Styles.buttonText} onClick={modalHandler}>
              Add Inquiry
            </p> */}
                    {/* </div> */}
                </div>
                {/* = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(); */}
                <div className={Styles.Yellow}>
                    <div className={Styles.DateRangeContainer}>
                        {/* <label>Branche</label> */}
                        {/* <label>Salesman Filter</label>
            <Select styles={customStyles} onChange={(e) => handlesalesman(e)} options={salesman} />
            <label>Branch Filter</label> */}
                        {/* <Select styles={customStyles} onChange={(e) => handlebranch(e)} options={branches} /> */}
                        {/* <Select styles={customStyles} selectedValue={branches} onChange={(e) => handlebranch(e)} options={branches} /> */}
                        {/* <TextField
              className={Styles.InputDate}
              id="date"
              label="Start Date"
              type="date"
              
              onChange={(e) => startDateHandler(e)}
              sx={{ width: 180, margin: 1 }}
              InputLabelProps={{
                shrink: true,
              }}
            /> */}
                        {/* <TextField
              className={Styles.InputDate}
              id="date"
              label="End Date"
              type="date"
              onChange={(e) => endDateHandler(e)}
              
              sx={{ width: 180, margin: 1 }}
              InputLabelProps={{
                shrink: true,
              }}
            /> */}
                        {/* <button className={Styles.SubmitButton} onClick={(e) => submitDateRangeHandler(e)} type="submit"> Submit </button> */}
                    </div>
                </div>

                {inquiries && <MaterialTable
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
                        exportButton:true

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

                                delteHandler(rowData._id);
                                console.log(`delete `, rowData)
                            }
                        }
                    ]}

                />}
            </div>

            {/* {
        editModal ? <Modal><InquiryEditForm modalHandler={() => { setEditModal(false) }} data={editModalData} setIsOpen={setEditModal} parentCallback={handleCallbackCreate} /></Modal> : null
      } */}

            <div className={Styles.filter}>

            </div>
        </div>

    )
}

export default InquiryTableFlitered