import React, { Component } from "react";
// import supplierapi from '../../handler/supplier';
import employeeapi from "../../handler/employee";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

import CreateEmployee from "./create";
import EditEmployee from "./edit";
import DetailEmployee from "./detail";
import DeleteEmployee from "./delete";
import { AlertList } from "react-bs-notifier";

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
        employee_number: "",
        first_name: "",
        last_name: "",
        created_by: "",
        company_name: ""
        // created_date : ''
      },
      created_date: "",
      alertData: {
        status: 99,
        message: ""
      },
      alerts: [],
      getCompanyTitleList: []
    };

    this.getAllEmployee = this.getAllEmployee.bind(this);
    this.editHandler = this.editHandler.bind(this);
    // this.handleChangeDate = this.handleChangeDate.bind(this);
    this.textHandler = this.textHandler.bind(this);
    this.searchEmployee = this.searchEmployee.bind(this);
    this.modalStatus = this.modalStatus.bind(this);
    this.onAlertDismissed = this.onAlertDismissed.bind(this);
    this.detailModalHandler = this.detailModalHandler.bind(this);
    this.getCompanyName = this.getCompanyName.bind(this);
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

    this.state.employee.map(ele => {
      if (employeeid === ele._id) {
        tmp = ele;
      }
    });

    this.setState({
      currentEmployee: tmp
    });
    console.log(tmp);
  }

  editHandler(idEmployee) {
    // console.log("Klik Edit");
    // console.log(this.props.history);
    localStorage.setItem("_id", idEmployee);
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

  textHandler(e) {
    let tmp = this.state.formdata;
    tmp[e.target.name] = e.target.value;
    this.setState({
      formdata: tmp
    });
  }

  modalStatus(status, message, code) {
    this.getAllEmployee();
    this.setState({
      alertData: {
        status: status,
        message: message
      }
    });

    if (status === 1) {
      this.setState({
        alerts: [
          {
            key: 1,
            type: "success",
            headline: "Good Job!",
            message: "Process successfully with Employee Code " + code
          }
        ]
      });
    } else if (status === 0) {
      this.setState({
        alerts: [
          {
            key: 2,
            type: "danger",
            headline: "Whoa!",
            message: "Process failed! with Employee Code " + code
          }
        ]
      });
    }

    console.log("Check Modal Status");
    console.log(this.state.alertData.status);
    console.log(this.state.alertData.message);
  }

  modalStatusEdit(status, message, code) {
    this.getDetailEmployeeByID("id");
    this.setState({
      alertData: {
        status: status,
        message: message
      }
    });

    if (status === 1) {
      this.setState({
        alerts: [
          {
            key: 1,
            type: "success",
            headline: "Good Job!",
            message: "Process successfully with Employee Code " + code
          }
        ]
      });
    } else if (status === 0) {
      this.setState({
        alerts: [
          {
            key: 2,
            type: "danger",
            headline: "Whoa!",
            message: "Process failed! with Employee Code " + code
          }
        ]
      });
    }

    console.log("Check Modal Status Edit");
    console.log(this.state.alertData.status);
    console.log(this.state.alertData.message);
  }

  async searchEmployee() {
    var query = [];
    var obj = {};

    console.log("search" + this.state.formdata);
    console.log(this.state.formdata.company_name);
    console.log(this.state.formdata.employee_number);
    console.log(this.state.formdata.employee_name);
    console.log(this.state.formdata.createdBy);
    // console.log(this.state.createdDate._d);

    let company_name = this.state.formdata.company_name;
    let employee_number = this.state.formdata.employee_number;
    let employee_name = this.state.formdata.employee_name;
    let CreatedBy = this.state.formdata.createdBy;
    // let CreatedDate = moment(this.state.createdDate._id).format("YYYY-MM-DD");

    query.push({
      id: "is_delete",
      value: false
    });

    // if (
    //   this.state.formdata.companyName === "" ||
    //   this.state.formdata.companyName === null ||
    //   typeof this.state.formdata.companyName === undefined ||
    //   this.state.formdata.companyName === undefined
    // ) {
    // } else {
    //   query.push({
    //     id: "CompanyName",
    //     value: company_name
    //   });
    // }

    if (
      this.state.formdata.employee_number === "" ||
      this.state.formdata.employee_number === null ||
      typeof this.state.formdata.employee_number === undefined ||
      this.state.formdata.employee_number === undefined
    ) {
    } else {
      query.push({
        id: "employee_number",
        value: employee_number
      });
    }

    
    if (
      this.state.formdata.employee_name === "" ||
      this.state.formdata.employee_name === null ||
      typeof this.state.formdata.employee_name === undefined ||
      this.state.formdata.employee_name === undefined
    ) {
    } else {
      query.push({
        id: "employee_name",
        value: employee_name
      });
    }

    // if (
    //   this.state.formdata.createdBy === "" ||
    //   this.state.formdata.createdBy === null ||
    //   typeof this.state.formdata.createdBy === undefined ||
    //   this.state.formdata.createdBy === undefined
    // ) {
    // } else {
    //   query.push({
    //     id: "CreatedBy",
    //     value: CreatedBy
    //   });
    // }

    // if (
    //   this.state.createdDate._d === "" ||
    //   this.state.createdDate._d === null ||
    //   typeof this.state.createdDate._d === undefined ||
    //   this.state.createdDate._d === undefined
    // ) {
    // } else {
    //   query.push({
    //     id: "CreatedDate",
    //     value: CreatedDate
    //   });
    // }

    console.log(query);
    let result = await employeeapi.GetAllEmployeeHandlerSearch(query);

    if (result.status === 200) {
      console.log("Client - Index.js Debugger : GetAllSupplierHandlerSearch");
      console.log(result.message);
      this.setState({
        employee: result.message
      });
    } else {
      console.log(result.message);
    }
  }

  async getAllEmployee() {
    let result = await employeeapi.GetAllHandler();

    if (result.status === 200) {
      console.log("Client - Index.js Debugger : getAllEmployee");
      console.log(result.message);
      this.setState({
        employee: result.message
      });
    } else {
      console.log(result.message);
    }
  }

  async getCompanyName() {
    let result = await employeeapi.GetListCompanyName();

    if (result.status === 200) {
      console.log("Supplier - create.js Debugger");
      console.log("getCompanyName");
      console.log(result);
      console.log(result.message);
      console.log("apambuh 2");
      this.setState({
        getCompanyTitleList: result.message
      });
    } else {
      console.log(result.message);
      console.log("apambuh");
    }
  }

  async getDetailEmployeeByID(id) {
    let result = await employeeapi.GetDetailByEmployeeIDHandler(id);

    if (result.status === 200) {
      console.log("Client - Index.js Debugger : getAllEmployee");
      console.log(result.message);
      this.setState({
        employee: result.message
      });
    } else {
      console.log(result.message);
    }
  }

  async getDetailEmployeeByID(id) {
      let result = await employeeapi.GetDetailByEmployeeIDHandler(id);
      let currEmployee = {};

      if(result.status === 200)
      {
          console.log('Employee - Edit.js Debugger');
          console.log(result.message);

          result.message.map((ele) => {
              currEmployee = ele;
          });

          this.setState({
              formdata: currEmployee
          });
      }
      else
      {
          console.log(result.message);
      }
  }
 

  componentDidMount() {
    this.getAllEmployee();
    this.getCompanyName();
    localStorage.removeItem("_id");
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
            <li>
              <a href="#">
                <i className="fa fa-dashboard" /> App
              </a>
            </li>
            <li>
              <a href="#">Employee</a>
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
                      <div className="col-md-2">
                        <input
                          type="text"
                          className="form-control"
                          id="employee_number"
                          name="employee_number"
                          value={this.state.formdata.employee_number}
                          onChange={this.textHandler}
                          placeholder="Employee ID Number"
                        />
                      </div>
                      <div className="col-md-2">
                        <input
                          type="text"
                          className="form-control"
                          id="first_name"
                          name="first_name"
                          value={this.state.formdata.first_name}
                          onChange={this.textHandler}
                          placeholder="Employee Name"
                        />
                      </div>

                      <div className="col-md-2">
                        <select
                          // style={{ marginTop: "10px" }}
                          ref="company_name"
                          className="form-control"
                          id="company_name"
                          name="company_name"
                          value={this.state.formdata.company_name}
                          onChange={this.textHandler}
                        >
                          <option value="">Company Name</option>
                          {this.state.getCompanyTitleList.map(elemen => (
                            <option key={elemen.name} value={elemen.name}>
                              {elemen.nama}
                            </option>
                          ))}
                        </select>
                        {/* <input
                          type="text"
                          className="form-control"
                          id="first_name"
                          name="first_name"
                          value={this.state.formdata.first_name}
                          onChange={this.textHandler}
                          placeholder="Select Company Name"
                        /> */}
                      </div>

                      <div className="col-md-2">
                        <div className="input-group date">
                          {/* <DatePicker
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
                          /> */}
                        </div>
                      </div>
                      <div className="col-md-2">
                        <input
                          type="text"
                          className="form-control"
                          id="createdBy"
                          name="createdBy"
                          value={this.state.formdata.createdBy}
                          onChange={this.textHandler}
                          placeholder="Created By"
                        />
                        {/* <div class="form-group">
                          <label>Date:</label>

                          <div class="input-group date">
                            <div class="input-group-addon">
                              <i class="fa fa-calendar" />
                            </div>
                            <input
                              type="text"
                              class="form-control pull-right"
                              id="datepicker"
                            />
                          </div>
                        </div> */}
                      </div>
                      <div className="col-md-1">
                        <div className="input-group-btn">
                          <button
                            type="button"
                            className="btn btn-warning"
                            onClick={this.searchEmployee}
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
                        <th>Employee ID Number</th>
                        <th>Employee Name</th>
                        <th>Company Name</th>
                        <th>Created Date</th>
                        <th>Created By</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employee_data.map((ele, x) => (
                        <tr key={ele._id}>
                          <td>{x + 1}</td>
                          <td>{ele.employee_number}</td>
                          <td>
                            {ele.first_name} {ele.last_name}
                          </td>
                          <td>{ele.company_name}</td>
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
            <CreateEmployee modalStatus={this.modalStatus} />
          </div>
        </div>

        <div className="modal fade" id="modal-edit">
          <div className="modal-dialog">
            <EditEmployee
              Employee={this.state.currentEmployee}
              modalStatus={this.modalStatus}
            />
          </div>
        </div>

        <div className="modal fade" id="modal-view">
          <div className="modal-dialog">
            <DetailEmployee Employee={this.state.currentEmployee} />
          </div>
        </div>

        {/* <div className="modal fade" id="modal-delete">
          <div className="modal-dialog">
            <DetailEmployee Employee={this.state.currentEmployee} />
          </div>
        </div> */}

        <div className="modal fade" id="modal-delete">
          <div className="modal-dialog">
            <DeleteEmployee
              employee={this.state.currentEmployee}
              modalStatus={this.modalStatus}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default index;
