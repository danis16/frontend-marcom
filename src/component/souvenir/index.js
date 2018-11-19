import React, { Component } from 'react';
import souvenirapi from '../../handler/souvenir';
import DatePicker from 'react-datepicker';
// import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

import CreateSouvenir from './create';
import EditSouvenir from './edit';
import DetailSouvenir from './detail';
import DeleteSouvenir from './delete';
// import DetailSouvenir from './detail';
import { AlertList } from "react-bs-notifier";
import axios from "axios";


class index extends Component {

    // state = {
    //     employee:[]
    // };
    constructor(props) {
        super(props);
        this.state = {
            souvenir: [],
            currentSouvenir: {},
            formdata: {
                code : '',
                name : '',
                m_unit_id : '',
                description : '',
                created_by: ''
                
            },
            created_date: '',
            alertData: {
                status: 99,
                message: ''
            },
            alerts: []
        };

        this.getAllSouvenir = this.getAllSouvenir.bind(this);
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

    detailModalHandler(souvenirid) {
        let tmp = {};

        this.state.souvenir.map((ele) => {
            if (souvenirid === ele._id) {
                tmp = ele;
            }
        });

        this.setState({
            currentSouvenir: tmp
        });
        console.log(tmp);

    }

    editHandler(idSouvenir){
    //     // console.log("Klik Edit");
    //     // console.log(this.props.history);
        localStorage.setItem('_id', idSouvenir); 
    //     // console.log(localStorage.getItem('idSupplier')); 
        this.props.history.push("/souvenir/edit");
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
        this.getAllSouvenir();
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
                    message: "Process successfully with Souvenir Code " + code
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
                    message: "Process failed! with Souvenir Code " + code
                }]
            });
        }

        console.log("Check Modal Status");
        console.log(this.state.alertData.status);
        console.log(this.state.alertData.message);
    }

    modalStatusEdit(status, message, code) {
        this.getDetailSouvenirByID('id');
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
                    type : "succes",
                    headline: "Good Job!",
                    message: "process successfully with Souvenir Code" + code
                }]
            });
        }
        else if (status === 0)
        {
            this.setState({
                alerts : [{
                    key : 2,
                    type : "danger",
                    headline : "whoaaa!!",
                    message : "process failed! with Souvenir Code" + code
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

    async getAllSouvenir() {
        let result = await souvenirapi.GetAllHandler();

        if (result.status === 200) {
            console.log('Client - Index.js Debugger : getAllSouvenir');
            console.log(result.message);
            this.setState({
                souvenir: result.message
            });

        }
        else {
            console.log(result.message);
        }
    }

    async getDetailSouvenirByID(id) {
        let result = await souvenirapi.GetDetailBySouvenirIDHandler(id);

        if(result.status === 200) {
            console.log('Client - index.js Debugger : getAllSouvenir');
            console.log(result.message);
            this.setState({
                souvenir: result.message
            });
        }
        else {
            console.log(result.message);
        }
    }

    
    componentDidMount() {
        this.getAllSouvenir();
        localStorage.removeItem('_id');
        this.getDetailSouvenirByID('id');
    }
        // axios
        //     .get("http://localhost:8000/api/employee/")
        //     .then(result => {
        //         this.setState({
        //             employee: result.employee
        //         });
        //         console.log(this.state.employee);
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });
    // }

    render() {
        let souvenir_data = this.state.souvenir;
    
        return (
          <div className="content-wrapper">
            <section className="content-header">
              <h1>
                Souvenir
                <small>list souvenir</small>
              </h1>
              <ol className="breadcrumb">
                <li>
                  <a href="#">
                    <i className="fa fa-dashboard" /> App
                  </a>
                </li>
                <li>
                  <a href="#">Souvenir</a>
                </li>
                <li className="active">List</li>
              </ol>
            </section>
    
            {this.state.alertData.status === 1 ? (
              <AlertList
                alerts={this.state.alerts}
                timeout={250}
                onDismiss={this.onAlertDismissed.bind(this)}
              />
            ) : (
              ""
            )}
            {this.state.alertData.status === 0 ? (
              <AlertList
                alerts={this.state.alerts}
                timeout={250}
                onDismiss={this.onAlertDismissed.bind(this)}
              />
            ) : (
              ""
            )}
    
            <section className="content">
              <div className="row">
                <div className="col-xs-12">
                  <div className="box">
                    <div className="box-header">
                      <h3 className="box-title">List All Employee</h3>
                      <div className="box-tools">
                        <div className="input-group input-group-sm">
                          <div className="input-group-btn">
                            <button
                              type="button"
                              className="btn btn-primary"
                              data-toggle="modal"
                              data-target="#modal-create"
                              style={{ float: "right" }}
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <form>
                      <div className="box-header">
                        <div className="row">
                          <div className="col-md-3">
                            <input
                              type="text"
                              className="form-control"
                              id="unitName"
                              name="unitName"
                              value={this.state.formdata.unitName}
                              onChange={this.textHandler}
                              placeholder="Unit Name"
                            />
                          </div>
                          <div className="col-md-3">
                            <input
                              type="text"
                              className="form-control"
                              id="contactName"
                              name="contactName"
                              value={this.state.formdata.contactName}
                              onChange={this.textHandler}
                              placeholder="Contact Name"
                            />
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
                            <input
                              type="text"
                              className="form-control"
                              id="createdBy"
                              name="createdBy"
                              value={this.state.formdata.createdBy}
                              onChange={this.textHandler}
                              placeholder="Created By"
                            />
                          </div>
                          <div className="col-md-1">
                            <div className="input-group-btn">
                              <button
                                type="button"
                                className="btn btn-warning"
                                onClick={this.searchSupplier}
                                style={{ float: "right" }}
                              >
                                Search
                              </button>
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
                            <th>Souvenir Code</th>
                            <th>Souvenir Name</th>
                            <th>Unit Name</th>
                            <th>Created Date</th>
                            <th>Created By</th>
                          </tr>
                        </thead>
                        <tbody>
                          {souvenir_data.map((ele, x) => (
                            <tr key={ele._id}>
                              <td>{x + 1}</td>
                              <td>{ele.code}</td>
                              <td>{ele.name}</td>
                              <td>{ele.m_unit_id}</td>
                              <td>{ele.created_date}</td>
                              <td>{ele.created_by}</td>
                              <td>
                                {/* <button type="button" className="btn btn-success" data-toggle="modal" data-target="#modal-create" style={{ float: 'right', marginRight: '5px' }}><i className="fa fa-edit"></i></button> */}
                                <button
                                  type="button"
                                  className="btn btn-info"
                                  onClick={() => {
                                    this.detailModalHandler(ele._id);
                                  }}
                                  data-toggle="modal"
                                  data-target="#modal-view"
                                  style={{ marginRight: "5px" }}
                                >
                                  <i className="fa fa-search" />
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-success"
                                  onClick={() => {
                                    this.detailModalHandler(ele._id);
                                  }}
                                  data-toggle="modal"
                                  data-target="#modal-edit"
                                  style={{ marginRight: "5px" }}
                                >
                                  <i className="fa fa-edit" />
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-danger"
                                  onClick={() => {
                                    this.detailModalHandler(ele._id);
                                  }}
                                  data-toggle="modal"
                                  data-target="#modal-delete"
                                  style={{ marginRight: "5px" }}
                                >
                                  <i className="fa fa-trash" />
                                </button>
                                {/* <button type="button" className="btn btn-success" onClick = {() => {this.editHandler(ele._id)}} style={{marginRight : '5px'}}><i className="fa fa-edit"></i></button> */}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <div className="modal fade" id="modal-create">
              <div className="modal-dialog">
                <CreateSouvenir
                 modalStatus={this.modalStatus} />
              </div>
            </div>
    
            <div className="modal fade" id="modal-edit">
              <div className="modal-dialog">
                <EditSouvenir
                  souvenir={this.state.currentSouvenir}
                  modalStatus={this.modalStatus}
                />
              </div>
            </div>
    
            <div className="modal fade" id="modal-view">
              <div className="modal-dialog">
                <DetailSouvenir
                Souvenir={this.state.currentSouvenir} />
              </div>
            </div>
    
            {/* <div className="modal fade" id="modal-delete">
              <div className="modal-dialog">
                <DetailEmployee Employee={this.state.currentEmployee} />
              </div>
            </div> */}
    
            <div className="modal fade" id="modal-delete">
              <div className="modal-dialog">
                <DeleteSouvenir
                  souvenir={this.state.currentSouvenir}
                  modalStatus={this.modalStatus}
                />
              </div>
            </div>
    
          </div>
        );
      }
    }

    export default index;
