import React, { Component } from 'react';
// import AutoGen from '../../common/autoGenerateNumber';
import souvenir from '../../handler/souvenir';

class CreateSouvenir extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formdata: {
                _id: "",
                code: "",
                name: "",
                description: "",
                m_unit_id: "",
                is_delete: "",
                created_by: "",
                created_date: "",
                updated_by: "",
                updated_date: ""
               
            },
            getUnitTitleList: [],
            errors: {}
        };

        this.submitHandler = this.submitHandler.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.textChanged = this.textChanged.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
        //     this.autoGenSupplier = this.autoGenSupplier.bind(this);
        this.getUnitName = this.getUnitName.bind(this);
    }

    resetForm() {
        this.setState({
            formdata: {
                
                code: "",
                name: "",
                description: "",
                m_unit_id: "",
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

    async submitHandler() {
        if (this.handleValidation()) {
            console.log(this.state.formdata);

            let result = await souvenir.InsertNewSouvenir(this.state.formdata);

            // Purpose Test
            // let result = {
            //   status : 200,
            //    message : "OK"
            // }

            if (result.status === 200) {
                console.log('Supplier - Create.js Debugger');
                console.log(result.message);
                document.getElementById("hidePopUpBtn").click();
                this.props.modalStatus(1, 'Success', this.state.formdata.employee_number);
            }
            else {
                console.log('Supplier - Create.js Debugger');
                console.log(result.message);
                document.getElementById("hidePopUpBtn").click();
                this.props.modalStatus(0, 'Failed', this.state.formdata.employee_number);
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

    async getUnitName() {
        let result = await souvenir.GetListUnitName();

        if (result.status === 200) {
            console.log('Supplier - create.js Debugger');
            console.log("getUnitName");
            console.log(result);
            console.log(result.message);
            console.log("apambuh 2");
            this.setState({
                getUnitTitleList: result.message
            });
        }
        else {
            console.log(result.message);
            console.log("apambuh");
        }
    }

    componentDidMount() {
        // this.autoGenSupplier();
        this.getUnitName();
        console.log(this.getUnitName());
    }

    render() {
        return (
            <div className="modal-content">
                <div className="modal-header">
                    <button id="hidePopUpBtn" onClick={this.resetForm} type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 className="modal-title">Add Souvenir</h4>
                </div>
                <form>
                    <div className="modal-body">
                        <div className="box-body">
                            <div className="col-xs-6">
                                <div className="form-group">
                                    <label>Souvenir Code</label>
                                    <input ref="code" type="text" className="form-control" placeholder="Souvenir Code"
                                        id="code" name="code" value={this.state.formdata.code} onChange={this.textChanged} required />
                                </div>
                                <div className="form-group">
                                    <label>Souvenir Name</label>
                                    <input ref="name" type="text" className="form-control" placeholder="Type Souvenir Name"
                                        id="name" name="name" value={this.state.formdata.name} onChange={this.textChanged} required />
                                    <span className="help-block" style={{ color: "red" }}>{this.state.errors.name}</span>
                                </div>
                                {/* <div className="form-group">
                                    <label>Unit Name</label>
                                    <input ref="m_unit_id" type="text" className="form-control" placeholder="-Select Unit Name-"
                                        id="m_unit_id" name="m_unit_name" value={this.state.formdata.m_unit_name} onChange={this.textChanged} required />
                                    <span className="help-block" style={{ color: "red" }}>{this.state.errors.m_unit_name}</span>
                                </div> */}
                                <div className="form-group">
                                     <label>Unit Name</label>
                                     <select style={{ marginTop: '10px' }} ref="m_unit_id" className="form-control" id="m_unit_id" name="m_unit_id" value={this.state.formdata.m_unit_id} onChange={this.textChanged}>
                                         <option value=""> Select Unit Name</option>
                                         {
                                             this.state.getUnitTitleList.map((elemen) =>
                                                 <option key={elemen._id} value={elemen._id}> {elemen.name} </option>
                                             )
                                         }
                                     </select>
                                 </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <input ref="description" type="text" className="form-control" placeholder="Type Description"
                                        id="description" name="description" value={this.state.formdata.description} onChange={this.textChanged} required />
                                    <span className="help-block" style={{ color: "red" }}>{this.state.errors.description}</span>
                                </div>
                                {/* <div className="form-group">
                                    <label>Contact Email</label>
                                    <input ref="ContactEmail" type="text" className="form-control" placeholder="Contact Email"
                                        id="ContactEmail" name="ContactEmail" value={this.state.formdata.ContactEmail} onChange={this.textChanged} required />
                                    <span className="help-block" style={{ color: "red" }}>{this.state.errors.ContactEmail}</span>
                                </div>
                                <div className="form-group">
                                    <label>Contact Title</label>
                                    <input ref="ContactTitle" type="text" className="form-control" placeholder="Contact Title"
                                        id="ContactTitle" name="ContactTitle" value={this.state.formdata.ContactTitle} onChange={this.textChanged} required />
                                </div> */} 
                            {/* </div>
                            <div className="col-xs-6">
                                <div className="form-group">
                                     <label>Company Name</label>
                                     <select style={{ marginTop: '10px' }} ref="m_company_id" className="form-control" id="m_company_id" name="m_company_id" value={this.state.formdata.m_company_id} onChange={this.textChanged}>
                                         <option value="">Select Company Name</option>
                                         {
                                             this.state.getCompanyTitleList.map((elemen) =>
                                                 <option key={elemen._id} value={elemen._id}> {elemen.nama} </option>
                                             )
                                         }
                                     </select>
                                 </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input ref="email" type="text" className="form-control" placeholder="Email"
                                        id="email" name="email" value={this.state.formdata.email} onChange={this.textChanged} required />
                                </div> */}
                                {/* <div className="form-group">
                                    <label>City</label>
                                    <input ref="City" type="text" className="form-control" placeholder="City"
                                        id="City" name="City" value={this.state.formdata.City} onChange={this.textChanged} required />
                                </div>
                                <div className="form-group">
                                    <label>Postal Code</label>
                                    <input ref="PostalCode" type="text" className="form-control" placeholder="Postal Code"
                                        id="PostalCode" name="PostalCode" value={this.state.formdata.PostalCode} onChange={this.textChanged} required />
                                </div>
                                <div className="form-group">
                                    <label>Country</label>
                                    <input ref="Country" type="text" className="form-control" placeholder="Country"
                                        id="Country" name="Country" value={this.state.formdata.Country} onChange={this.textChanged} required />
                                </div>
                                <div className="form-group">
                                    <label>Phone No</label>
                                    <input ref="Phone" type="text" className="form-control" placeholder="Phone"
                                        id="Phone" name="Phone" value={this.state.formdata.Phone} onChange={this.textChanged} required />
                                    <span className="help-block" style={{ color: "red" }}>{this.state.errors.Phone}</span>
                                </div>
                                <div className="form-group">
                                    <label>Fax No</label>
                                    <input ref="Fax" type="text" className="form-control" placeholder="Fax"
                                        id="Fax" name="Fax" value={this.state.formdata.Fax} onChange={this.textChanged} required />
                                    <span className="help-block" style={{ color: "red" }}>{this.state.errors.Fax}</span>
                                </div> */}
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
export default CreateSouvenir