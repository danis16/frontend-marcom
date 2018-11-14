import React, { Component } from 'react';
// import supplierapi from '../../handler/supplier';
import employeeapi from '../../handler/employee';
import DatePicker from 'react-datepicker';
// import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

import CreateEmployee from './create';
import EditEmployee from './edit';
import DetailEmployee from './detail';
import { AlertList } from "react-bs-notifier";
import axios from "axios";


class index extends Component {

    // state = {
    //     employee:[]
    // };
    constructor(props) {
        super(props);
        this.state = {
            employee: [],
            currentEmployee: {},
            formdata: {
                employee_number: '',
                first_name: '',
                last_name: '',
                created_by: ''
                // created_date : ''
            },
            created_date: '',
            alertData: {
                status: 99,
                message: ''
            },
            alerts: []
        };

        this.getAllEmployee = this.getAllEmployee.bind(this);
        this.editHandler = this.editHandler.bind(this);
        // this.handleChangeDate = this.handleChangeDate.bind(this);
        // this.textHandler = this.textHandler.bind(this);
        // this.searchSupplier = this.searchSupplier.bind(this);
        this.modalStatus = this.modalStatus.bind(this);
        this.onAlertDismissed = this.onAlertDismissed.bind(this);
        this.detailModalHandler = this.detailModalHandler.bind(this);
    }

    onAlertDismissed(alert) {
    	const alerts = this.state.alerts;
    	const idx = alerts.indexOf(alert);

    	if (idx >= 0) {
    		this.setState({
    			alerts: [...alerts.slice(0, idx), ...alerts.slice(idx + 1)]
    		});
    	}
    }

    detailModalHandler(employeeid) {
        let tmp = {};

        this.state.employee.map((ele) => {
            if (employeeid === ele._id) {
                tmp = ele;
            }
        });

        this.setState({
            currentEmployee: tmp
        });
        console.log(tmp);

    }

    editHandler(idEmployee){
        // console.log("Klik Edit");
        // console.log(this.props.history);
        localStorage.setItem('_id', idEmployee); 
        // console.log(localStorage.getItem('idSupplier')); 
        this.props.history.push("/employee/edit");
    }

    // handleChangeDate(date) {
    //     let tmp = this.state.formdata;
    //     this.setState({
    //         formdata: tmp,
    //         createdDate: date
    //     });
    // }

    // textHandler(e) {
    //     let tmp = this.state.formdata;
    //     tmp[e.target.name] = e.target.value;
    //     this.setState({
    //         formdata: tmp
    //     });
    // }

    modalStatus(status, message, code) {
        this.getAllEmployee();
        this.setState({
            alertData : {
                status : status,
                message : message
            }
        });

        if(status === 1)
        {
            this.setState({
                alerts : [{
                    key : 1,
                    type: "success",
                    headline: "Good Job!",
                    message: "Process successfully with Employee Code " + code
                }]
            });
        }
        else if(status === 0)
        {
            this.setState({
                alerts : [{
                    key : 2,
                    type: "danger",
                    headline: "Whoa!",
                    message: "Process failed! with Employee Code " + code
                }]
            });
        }

        console.log("Check Modal Status");
        console.log(this.state.alertData.status);
        console.log(this.state.alertData.message);
    }



    modalStatusEdit(status, message, code) {
        this.getDetailEmployeeByID('id');
        this.setState({
            alertData : {
                status : status,
                message : message
            }
        });

        if(status === 1)
        {
            this.setState({
                alerts : [{
                    key : 1,
                    type: "success",
                    headline: "Good Job!",
                    message: "Process successfully with Employee Code " + code
                }]
            });
        }
        else if(status === 0)
        {
            this.setState({
                alerts : [{
                    key : 2,
                    type: "danger",
                    headline: "Whoa!",
                    message: "Process failed! with Employee Code " + code
                }]
            });
        }

        console.log("Check Modal Status Edit");
        console.log(this.state.alertData.status);
        console.log(this.state.alertData.message);
    }



    // async searchSupplier() {
    //     var query = [];
    //     var obj = {};

    //     console.log("search" + this.state.formdata);
    //     console.log(this.state.formdata.companyName);
    //     console.log(this.state.formdata.contactName);
    //     console.log(this.state.formdata.createdBy);
    //     console.log(this.state.createdDate._d);

    //     let CompanyName = this.state.formdata.companyName;
    //     let ContactName = this.state.formdata.contactName;
    //     let CreatedBy = this.state.formdata.createdBy;
    //     let CreatedDate = moment(this.state.createdDate._d).format("YYYY-MM-DD");

    //     query.push({
    //         "id" : "IsDelete",
    //         "value" : false
    //     });

    //     if(this.state.formdata.companyName === '' || this.state.formdata.companyName === null || typeof this.state.formdata.companyName === undefined || this.state.formdata.companyName === undefined){
    //     } 
    //     else
    //     {
    //         query.push({
    //             "id" : "CompanyName",
    //             "value" : CompanyName
    //         });
    //     }

    //     if(this.state.formdata.contactName === '' || this.state.formdata.contactName === null || typeof this.state.formdata.contactName === undefined || this.state.formdata.contactName === undefined) { 
    //     } 
    //     else
    //     {
    //         query.push({
    //             "id" : "ContactName",
    //             "value" : ContactName
    //         });
    //     }

    //     if(this.state.formdata.createdBy === '' || this.state.formdata.createdBy === null || typeof this.state.formdata.createdBy === undefined || this.state.formdata.createdBy === undefined) {
    //     } 
    //     else
    //     {
    //         query.push({
    //             "id" : "CreatedBy",
    //             "value" : CreatedBy
    //         });
    //     }

    //     if(this.state.createdDate._d === '' || this.state.createdDate._d === null || typeof this.state.createdDate._d === undefined || this.state.createdDate._d === undefined) {
    //     } 
    //     else
    //     {
    //         query.push({
    //             "id" : "CreatedDate",
    //             "value" : CreatedDate
    //         });
    //     }

    //     console.log(query);
    //     let result = await supplierapi.GetAllSupplierHandlerSearch(query);

    //     if(result.status === 200)
    //     {
    //         console.log('Client - Index.js Debugger : GetAllSupplierHandlerSearch');
    //         console.log(result.message);
    //         this.setState({
    //             client: result.message
    //         });
    //     }
    //     else
    //     {
    //         console.log(result.message);
    //     }
    // }

    async getAllEmployee() {
        let result = await employeeapi.GetAllHandler();

        if (result.status === 200) {
            console.log('Client - Index.js Debugger : getAllEmployee');
            console.log(result.message);
            this.setState({
                employee: result.message
            });

        }
        else {
            console.log(result.message);
        }
    }


    async getDetailEmployeeByID(id) {
        let result = await employeeapi.GetDetailByEmployeeIDHandler(id);

        if (result.status === 200) {
            console.log('Client - Index.js Debugger : getAllEmployee');
            console.log(result.message);
            this.setState({
                employee: result.message
            });

        }
        else {
            console.log(result.message);
        }
    }


    
    // async getDetailEmployeeByID(id) {
    //     let result = await employee.GetDetailByEmployeeIDHandler(id);
    //     let currEmployee = {};

    //     if(result.status === 200)
    //     {
    //         console.log('Employee - Edit.js Debugger');
    //         console.log(result.message);

    //         result.message.map((ele) => {
    //             currEmployee = ele;
    //         });

    //         this.setState({
    //             formdata: currEmployee
    //         });
    //     }
    //     else
    //     {
    //         console.log(result.message);
    //     }
    // }



    componentDidMount() {
        this.getAllEmployee();
        localStorage.removeItem('_id');
        this.getDetailEmployeeByID('id');
    }

    render() {

        let employee_data = this.state.employee;

        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>
                        Employee
                        <small>list employee</small>
                    </h1>
                    <ol className="breadcrumb">
                        <li><a href="#"><i className="fa fa-dashboard"></i> App</a></li>
                        <li><a href="#">Employee</a></li>
                        <li className="active">List</li>
                    </ol>
                </section>

                {
                    (this.state.alertData.status === 1) ? <AlertList alerts={this.state.alerts} timeout={250} onDismiss={this.onAlertDismissed.bind(this)} /> : ''
                }
                {
                    (this.state.alertData.status === 0) ? <AlertList alerts={this.state.alerts} timeout={250} onDismiss={this.onAlertDismissed.bind(this)} /> : ''
                }

                <section className="content">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box">
                                <div className="box-header">
                                    <h3 className="box-title">List All Employee
                                    </h3>
                                    <div className="box-tools">
                                        <div className="input-group input-group-sm">
                                            <div className="input-group-btn">
                                                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#modal-create" style={{ float: 'right' }}>Add</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <form>
                                    <div className="box-header">
                                        <div className="row">
                                            <div className="col-md-3">
                                                <input type="text" className="form-control" id="companyName" name="companyName" value={this.state.formdata.companyName} onChange={this.textHandler} placeholder="Company Name" />
                                            </div>
                                            <div className="col-md-3">
                                                <input type="text" className="form-control" id="contactName" name="contactName" value={this.state.formdata.contactName} onChange={this.textHandler} placeholder="Contact Name" />
                                            </div>
                                            <div className="col-md-2">
                                                <div className="input-group date">
                                                    <DatePicker
                                                        selected={this.state.createdDate}
                                                        onChange={this.handleChangeDate}
                                                        className="form-control pull-right"
                                                        fixedHeight
                                                        dateFormat="DD/MM/YYYY"
                                                        id="datepicker"
                                                        name="datepicker"
                                                        showMonthDropdown
                                                        showYearDropdown
                                                        placeholderText="Created Date"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <input type="text" className="form-control" id="createdBy" name="createdBy" value={this.state.formdata.createdBy} onChange={this.textHandler} placeholder="Created By" />
                                            </div>
                                            <div className="col-md-1">
                                                <div className="input-group-btn">
                                                    <button type="button" className="btn btn-warning" onClick={this.searchSupplier} style={{ float: 'right' }}>Search</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <div className="box-body table-responsive no-padding">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Employee ID Number</th>
                                                <th>Employee Name</th>
                                                <th>Company Name</th>
                                                <th>Created Date</th>
                                                <th>Created By</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                employee_data.map((ele, x) =>
                                                    <tr key={ele._id}>
                                                        <td>{x + 1}</td>
                                                        <td>{ele.employee_number}</td>
                                                        <td>{ele.first_name} {ele.last_name}</td>
                                                        <td>{ele.company_name}</td>
                                                        <td>{ele.created_date}</td>
                                                        <td>{ele.created_by}</td>
                                                        <td>
                                                            {/* <button type="button" className="btn btn-success" data-toggle="modal" data-target="#modal-create" style={{ float: 'right', marginRight: '5px' }}><i className="fa fa-edit"></i></button> */}
                                                            <button type="button" className="btn btn-info" onClick={() => { this.detailModalHandler(ele._id) }} data-toggle="modal" data-target="#modal-view" style={{ marginRight: '5px' }}><i className="fa fa-search"></i></button>
                                                            <button type="button" className="btn btn-success" onClick={() => { this.detailModalHandler(ele._id) }} data-toggle="modal" data-target="#modal-edit" style={{ marginRight: '5px' }}><i className="fa fa-edit"></i></button>
                                                            <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#modal-delete" style={{ marginRight: '5px' }}><i className="fa fa-trash"></i></button>
                                                            {/* <button type="button" className="btn btn-success" onClick = {() => {this.editHandler(ele._id)}} style={{marginRight : '5px'}}><i className="fa fa-edit"></i></button> */}
                                            
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="modal fade" id="modal-create">
                    <div className="modal-dialog">
                        <CreateEmployee
                                modalStatus = {this.modalStatus}
                            />
                    </div>
                </div>

                <div className="modal fade" id="modal-edit">
                    <div className="modal-dialog">
                        <EditEmployee
                                Employee={this.state.currentEmployee}
                                modalStatus = {this.modalStatus}
                            />
                    </div>
                </div>


                <div className="modal fade" id="modal-view">
                    <div className="modal-dialog">
                        <DetailEmployee
                            Employee={this.state.currentEmployee}
                        />
                    </div>
                </div>
            </div>
        )
    }
};

export default index