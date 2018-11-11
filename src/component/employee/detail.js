import React, { Component } from 'react';

class DetailEmployee extends Component{
    render(){
        return(
            <div className="modal-content">
                <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 className="modal-title">Detail Employee - {this.props.Employee.employee_number}</h4>
                </div>
                <form>
                    <div className="modal-body">
                        <div className="box-body">
                            <div className="col-xs-6">
                                <div className="form-group">
                                    <label>Employee ID Number</label>
                                    <input type="text" className="form-control" placeholder="Employee ID Number" value={this.props.Employee.employee_number} disabled/>
                                </div>
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input ref="FirstName" type="text" className="form-control" placeholder="First Name" value={this.props.Employee.first_name} disabled/>
                                </div>
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input ref="LastName" type="text" className="form-control" placeholder="Last Name" value={this.props.Employee.last_name} disabled/>
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <div className="form-group">
                                    <label>Company Name</label>
                                    <input ref="CompanyName" type="text" className="form-control" placeholder="Company Name" value={this.props.Employee.company_name} disabled/>
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input ref="Email" type="text" className="form-control" placeholder="Email" value={this.props.Employee.email} disabled/>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default pull-right" data-dismiss="modal">Close</button>
                    </div>
                </form>
            </div>
        )
    }
}
export default DetailEmployee