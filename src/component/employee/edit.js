import React, { Component } from 'react';
import employeeapi from '../../handler/employee';

class edit extends Component {
    constructor (props){
        super(props)

        this.state={
            formdata:{
                _id : "",
                employee_number : "",
                first_name : "",
                last_name : "",
                m_company_id : "",
                email : "",
                is_delete : "",
                created_by : "",
                created_date : "",
                updated_by : "",
                updated_date : "",
            },
            CompanyNameList : [],
            product : [],
            errors: {}
        };

        // this.getAllProductBySupplierID = this.getAllProductBySupplierID.bind(this);
        this.getDetailEmployeeByID = this.getDetailEmployeeByID.bind(this);
        this.textHandler = this.textHandler.bind(this);
        this.getCompanyName = this.getCompanyName.bind(this);
    }

    textHandler(e) {
        let tmp = this.state.formdata;
        tmp[e.target.name] = e.target.value;
        this.setState({
            formdata: tmp
        });
    }

    // async getAllProductBySupplierID(id) {
    //     let result = await productapi.GetAllProductBySupplierIDHandler(id);

    //     if(result.status === 200)
    //     {
    //         console.log('Product - Edit.js Debugger');
    //         console.log(result.message);
    //         this.setState({
    //             product: result.message
    //         });
    //     }
    //     else
    //     {
    //         console.log(result.message);
    //     }
    // }

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

    async getCompanyName(){
        let result = await employeeapi.GetListCompanyName();

        if(result.status === 200)
        {
            console.log('Company - create.js Debugger');
            console.log("getCompanyName");
            console.log(result);
            console.log(result.message);

            this.setState({
                CompanyNameList: result.message
            });
        }
        else
        {
            console.log(result.message);
        }
    }

    componentDidMount(){
        var id = localStorage.getItem('id');
        this.getDetailEmployeeByID(id);
        console.log("cek detail employeee dulu vrohhh");
        console.log(this.getDetailEmployeeByID(id));
        // this.getAllProductBySupplierID(id);
        this.getCompanyName();
    }

    render(){
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>
                        Employee
                        <small>Edit Employee</small>
                    </h1>
                    <ol className="breadcrumb">
                        <li><a href="#"><i className="fa fa-dashboard"></i> App</a></li>
                        <li><a href="#">Employee</a></li>
                        <li className="active">Edit</li>
                    </ol>
                </section>

                <section className="content">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box box-primary">
                                <div className="box-header with-border">
                                    <h3 className="box-title">Edit Employee - {this.state.formdata.employee_number}</h3>
                                </div>
                                <form>
                                    <div className="box-body">
                                        <div className="col-xs-6">
                                            <div className="form-group">
                                                <label>Supplier Code</label>
                                                <input ref="Code" type="hidden" className="form-control" id="Code" name="Code" value={this.state.formdata.Code} onChange={this.textChanged}/>
                                                <input type="text" className="form-control" placeholder="Supplier Code" value={this.state.formdata.Code} disabled/>
                                            </div>
                                            <div className="form-group">
                                                <label>Company Name</label>
                                                <input ref="CompanyName" type="text" className="form-control" id="CompanyName" name="CompanyName" 
                                                value={this.state.formdata.CompanyName} onChange={this.textHandler} placeholder="Enter Company Name"/>
                                            </div>
                                            <div className="form-group">
                                                <label>Contact Title Name</label>
                                                <select style= {{ marginTop : '10px'}} ref="ContactNameTitleId" className="form-control" id="ContactNameTitleId" name="ContactNameTitleId" value={ this.state.formdata.ContactNameTitleId } onChange={ this.textChanged }>
                                                    <option value="">Select Contact Title Name</option>
                                                    {
                                                        this.state.CompanyNameList.map((elemen) =>
                                                            <option key={ elemen._id } value={ elemen._id }> { elemen.Name } </option>
                                                        )
                                                    }
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Contact Name</label>
                                                <input type="text" ref="ContactName" className="form-control" id="ContactName" name="ContactName" 
                                                value={this.state.formdata.ContactName} onChange={this.textHandler} placeholder="Enter Contact Name"/>
                                            </div>
                                            <div className="form-group">
                                                <label>Contact Email</label>
                                                <input type="text" ref="ContactEmail" className="form-control" id="ContactEmail" name="ContactEmail" 
                                                value={this.state.formdata.ContactEmail} onChange={this.textHandler} placeholder="Enter Contact Email"/>
                                            </div>
                                            <div className="form-group">
                                                <label>Contact Title</label>
                                                <input type="text" ref="ContactTitle" className="form-control" id="ContactTitle" name="ContactTitle" 
                                                value={this.state.formdata.ContactTitle} onChange={this.textHandler} placeholder="Enter Contact Title"/>
                                            </div>
                                        </div>
                                        <div className="col-xs-6">
                                            <div className="form-group">
                                                <label>Address</label>
                                                <input type="text" ref="Address" className="form-control" id="Address" name="Address" 
                                                value={this.state.formdata.Address} onChange={this.textHandler} placeholder="Enter Address"/>
                                            </div>
                                            <div className="form-group">
                                                <label>City</label>
                                                <input type="text" ref="City" className="form-control" id="City" name="City" 
                                                value={this.state.formdata.City} onChange={this.textHandler} placeholder="Enter City"/>
                                            </div>
                                            <div className="form-group">
                                                <label>Postal Code</label>
                                                <input type="text" ref="PostalCode" className="form-control" id="PostalCode" name="PostalCode" 
                                                value={this.state.formdata.PostalCode} onChange={this.textHandler} placeholder="Enter Postal Code"/>
                                            </div>
                                            <div className="form-group">
                                                <label>Country</label>
                                                <input type="text" ref="Country" className="form-control" id="Country" name="Country" 
                                                value={this.state.formdata.Country} onChange={this.textHandler} placeholder="Enter Country"/>
                                            </div>
                                            <div className="form-group">
                                                <label>Phone No</label>
                                                <input type="text" ref="Phone" className="form-control" id="Phone" name="Phone" 
                                                value={this.state.formdata.Phone} onChange={this.textHandler} placeholder="Enter Phone No"/>
                                            </div>
                                            <div className="form-group">
                                                <label>Fax No</label>
                                                <input type="text" ref="Fax" className="form-control" id="Fax" name="Fax" 
                                                value={this.state.formdata.Fax} onChange={this.textHandler} placeholder="Enter Fax"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="box-footer">
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box box-primary">
                                <div className="box-header with-border">
                                <h3 className="box-title">List Product</h3>
                                    <div className="box-tools">
                                        <div className="input-group input-group-sm">
                                            <div className="input-group-btn">
                                                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#modal-create" style={{float : 'right'}}><i className="fa fa-plus"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="box-body table-responsive no-padding">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Product Name</th>
                                                <th>Supplier Name</th>
                                                <th>Category Name</th>
                                                <th>Quantity Per Unit</th>
                                                <th>Unit Price</th>
                                                <th>Unit In Stock</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { 
                                                this.state.product.map((ele,x)=>
                                                    <tr key={ele._id}>
                                                        <td>{x+1}</td>
                                                        <td>{ele.ProductName}</td>
                                                        <td>{ele.SupplierName}</td>
                                                        <td>{ele.CategoryName}</td>
                                                        <td>{ele.QuantityPerUnit}</td>
                                                        <td>{ele.UnitPrice}</td>
                                                        <td>{ele.UnitInStock}</td>
                                                        <td>
                                                            <button type="button" className="btn btn-info"  data-toggle="modal" data-target="#modal-view" style={{marginRight : '5px'}}><i className="fa fa-search"></i></button>
                                                            <button type="button" className="btn btn-success" onClick = {() => {this.editHandler(ele._id)}} style={{marginRight : '5px'}}><i className="fa fa-edit"></i></button>
                                                            <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#modal-delete"><i className="fa fa-trash"></i></button>
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <div className="box-footer">
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    };
};

export default edit;