import React, { Component } from 'react';

class DetailSouvenir extends Component{
    render(){
        return(
            <div className="modal-content">
                <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 className="modal-title">Detail Souvenir -{this.props.Souvenir.code}</h4>
                </div>
                <form>
                    <div className="modal-body">
                        <div className="box-body">
                            <div className="col-xs-6">
                                <div className="form-group">
                                    <label>Souvenir Code</label>
                                    <input type="text" className="form-control" placeholder="Code" value={this.props.Souvenir.code} disabled/>
                                </div>
                                <div className="form-group">
                                    <label>Souvenir Name</label>
                                    <input ref="SouvenirName" type="text" className="form-control" placeholder="Souvenir Name" value={this.props.Souvenir.name} disabled/>
                                </div>  
                            </div>
                            <div className="col-xs-6">
                                <div className="form-group">
                                    <label>Unit Name</label>
                                    <input ref="UnitName" type="text" className="form-control" placeholder="Unit Name" value={this.props.Souvenir.unit_name} disabled/>
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <input ref="description" type="text" className="form-control" placeholder="description" value={this.props.Souvenir.description} disabled/>
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
export default DetailSouvenir