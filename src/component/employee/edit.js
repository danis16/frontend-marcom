import React, { Component } from 'react';
// import AutoGen from '../../common/autoGenerateNumber';
import employee from '../../handler/employee';

class EditEmployee extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formdata: {
                _id: "",
                employee_number: "",
                first_name: "",
                last_name: "",
                // m_company_id: "",
                email: "",
                is_delete: "",
                created_by: "",
                created_date: "",
                updated_by: "",
                updated_date: "",
                m_company_id: ""
            },
            getCompanyTitleList: [],
            errors: {}
    };

        this.submitHandler = this.submitHandler.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.textChanged = this.textChanged.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
        //     this.autoGenSupplier = this.autoGenSupplier.bind(this);
        this.getCompanyName = this.getCompanyName.bind(this);
        this.getDetailEmployeeByID = this.getDetailEmployeeByID.bind(this);
    }

    resetForm() {
        this.setState({
            formdata: {
                CompanyId: "",
                employee_number: "",
                first_name: "",
                last_name: "",
                m_company_id: "",
                email: "",
                is_delete: "",
                created_by: "",
                created_date: "",
                updated_by: "",
                updated_date: ""
            },
            errors: {}
        });
    }

    handleValidation() {
        let fields = this.state.formdata;
        let errors = {};
        let formIsValid = true;

        if (typeof fields.first_name === "undefined" || fields.first_name === null || fields.first_name === "") {
            formIsValid = false;
            errors.first_name = "Nama Company tidak boleh kosong.";
        }

        if (typeof fields.last_name === "undefined" || fields.last_name === null || fields.last_name === "") {
            formIsValid = false;
            errors.last_name = "Nama Contact tidak boleh kosong.";
        }
        // else {
        //     if (!fields.ContactName.match(/^[a-zA-Z\s]+$/)) {
        //         formIsValid = false;
        //         errors.ContactName = "Nama Contact harus berupa huruf.";
        //     }
        // }

        if (typeof fields.ContactEmail === "undefined" || fields.ContactEmail === null || fields.ContactEmail === "") {
        }
        else {
            if (!fields.ContactEmail.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/)) {
                formIsValid = false;
                errors.ContactEmail = "Mohon masukkan email yang valid.";
            }
        }

        if (typeof fields.Phone === "undefined" || fields.Phone === null || fields.Phone === "") {
        }
        else {
            if (!fields.Phone.match(/^[0-9() +-]+$/)) {
                formIsValid = false;
                errors.Phone = "Mohon masukkan nomor telepon yang valid.";
            }
        }

        if (typeof fields.Fax === "undefined" || fields.Fax === null || fields.Fax === "") {
        }
        else {
            if (!fields.Fax.match(/^[0-9() +-]+$/)) {
                formIsValid = false;
                errors.Fax = "Mohon masukkan nomor fax yang valid.";
            }
        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    textChanged(e) {
        let tmp = this.state.formdata;
        tmp[e.target.name] = e.target.value;
        this.setState({
            formdata: tmp
        });
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

    async getDetailEmployeeByID(id) {
        let result = await employee.GetDetailByEmployeeIDHandler(id);

        if (result.status === 200) {
            console.log('edit INI getDetailEmployeeByID');
            console.log(result.message);
            this.setState({
                employee: result.message
            });

        }
        else {
            console.log(result.message);
        }
    }


    async submitHandler() {
        if (this.handleValidation()) {
            // console.log(this.state.formdata);

            let result = await employee.updateEmployee(this.props.Employee);

            // Purpose Test
            // let result = {
            //   status : 200,
            //    message : "OK"
            // }

            if (result.status === 200) {
                console.log('Employee - Edit.js Debugger');
                console.log(result.message);
                document.getElementById("hidePopUpBtn").click();
                this.props.modalStatus(1, 'Success', this.props.Employee.employee_number);
            }
            else {
                console.log('Employee - Edit.js Debugger');
                console.log(result.message);
                document.getElementById("hidePopUpBtn").click();
                this.props.modalStatus(0, 'Failed', this.props.Employee.employee_number);
            }

            // this.autoGenSupplier();
        }
    }

    // async autoGenSupplier() {
    //     let result = await AutoGen.createCodeSupplier();
    //     console.log("autoGenSupplier");
    //     console.log(result);
    //     this.setState({
    //         formdata: {
    //             Code: result
    //         }
    //     });
    // }

    async getCompanyName() {
        let result = await employee.GetListCompanyName();

        if (result.status === 200) {
            console.log('Supplier - create.js Debugger');
            console.log("getCompanyName");
            console.log(result);
            console.log(result.message);
            console.log("apambuh 2");
            this.setState({
                getCompanyTitleList: result.message
            });
        }
        else {
            console.log(result.message);
          
        }
    }

    componentDidMount() {
        // this.autoGenSupplier();
        this.getCompanyName();
        // this.getDetailEmployeeByID('id');
        console.log(this.getCompanyName());
    }

    componentWillReceiveProps(newProps) {
        console.log(newProps);
        this.setState({
            formdata : newProps.Employee
        });
    }


    render() {
        return (
            <div className="modal-content">
                <div className="modal-header">
                    <button id="hidePopUpBtn" onClick={this.resetForm} type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 className="modal-title">Edit Employee -</h4>
                </div>
                <form>
                    <div className="modal-body">
                        <div className="box-body">
                            <div className="col-xs-6">
                                <div className="form-group">
                                    <label>Employee ID Number </label>
                                    <input type="text" className="form-control" placeholder="Employee Number ID"
                                        id="employee_number" name="employee_number" value={this.props.Employee.employee_number} onChange={this.textChanged} required />
                                </div>
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input ref="first_name" type="text" className="form-control" placeholder="First Name"
                                        id="first_name" name="first_name" value={this.props.Employee.first_name} onChange={this.textChanged} required />
                                    <span className="help-block" style={{ color: "red" }}>{this.state.errors.first_name}</span>
                                </div>
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input ref="last_name" type="text" className="form-control" placeholder="Last Name"
                                        id="last_name" name="last_name" value={this.props.Employee.last_name} onChange={this.textChanged} required />
                                    <span className="help-block" style={{ color: "red" }}>{this.state.errors.last_name}</span>
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <div className="form-group">
                                    <label>Company Name</label>
                                    <select style={{ marginTop: '10px' }} ref="m_company_id" className="form-control" id="m_company_id" name="m_company_id" value={this.state.formdata.getCompanyTitleList} onChange={this.textChanged}>
                                        <option value="">{this.props.Employee.company_name}</option>
                                        {
                                            this.state.getCompanyTitleList.map((elemen) => //kalo pake props, state nya di ganti apa ????
                                                <option key={elemen._id} value={elemen._id}> {elemen.nama} </option>
                                            )
                                        }
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input ref="email" type="text" className="form-control" placeholder="Email"
                                        id="email" name="email" value={this.props.Employee.email} onChange={this.textChanged} required />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default pull-left" data-dismiss="modal" onClick={this.resetForm}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={this.submitHandler}>Save</button>
                    </div>
                </form>
            </div>
        )
    }
}
export default EditEmployee