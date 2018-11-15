import React, { Component } from 'react';
import employeeapi from '../../handler/employee';

class DeleteEmployee extends Component{
    constructor (props){
        super(props);
        this.state={
            formdata:{
                _id : ''
            }
        };

        this.deleteHandler = this.deleteHandler.bind(this);
    }

    async deleteHandler(){
        console.log(this.state.formdata);
        // console.log(this.props.employee._id);

        let result = await employeeapi.deleteExistingEmployee(this.props.employee._id);

        if(result.status === 200)
        {
            console.log('Client - Delete.js Debugger');
            console.log(result.message);
            document.getElementById("hidePopUpBtnDelete").click();
            this.props.modalStatus(1, 'Success');
        }
        else
        {
            console.log(result.message);
            document.getElementById("hidePopUpBtnDelete").click();
            this.props.modalStatus(0, 'Failed');
        }
    }

    render(){
        return(
            <div className="modal-content">
                <div className="modal-header">
                    <button id="hidePopUpBtnDelete" type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 className="modal-title">Delete Client</h4>
                </div>
                <form>
                    <div className="modal-body">
                         <div className="callout callout-danger" style={{ marginBottom: "0!important"}}>
                            <h4><i className="fa fa-info"></i> Perhatian : </h4>
                            Apakah Anda yakin untuk menghapus data ini ?
                        </div>
                        {/* <div className="box-body">
                            <div className="form-group">
                                <label>Object ID</label>
                                <input type="text" className="form-control" value={this.props.employee._id} disabled/>
                            </div>
                            <div className="form-group">
                                <label>Client Name</label>
                                <input type="text" className="form-control" value={this.props.employee.nama_client} disabled/>
                            </div>
                            <div className="form-group">
                                <label>Created Date</label>
                                <input type="text" className="form-control" value={this.props.employee.created_date} disabled/>
                            </div>
                            <div className="form-group">
                                <label>Created By</label>
                                <input type="text" className="form-control" value={this.props.employee.created_by} disabled/>
                            </div>
                        </div> */}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default pull-left" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-danger" onClick = {this.deleteHandler}>Delete</button>
                    </div>
                </form>
            </div>
        )
    }
}
export default DeleteEmployee