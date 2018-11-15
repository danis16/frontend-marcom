import React, { Component } from 'react';
import souvenirapi from '../../handler/souvenir';
import { AsyncSeriesWaterfallHook } from 'tapable';

class edit extends Component {
    constructor (props){
        super(props)

        this.state={
            formdata:{
                _id :"", 
                code : "", 
                name : "", 
                description : "", 
                m_unit_id : "", 
                is_delete : "", 
                created_by : "", 
                created_date : "", 
                updated_by : "", 
                updated_date : ""
            },
            UnitNameList : [],
            errors: {}
        };

        // this.getAllProductBySupplierID = this.getAllProductBySupplierID.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.textChanged = this.textChanged.bind(this);
        this.handleValidation = this.handleValidation.bind(this);

        this.getUnitName = this.getUnitName.bind(this);
        this.getDetailSouvenirByID = this.getDetailSouvenirByID.bind(this);
        // this.textHandler = this.textHandler.bind(this);
        // this.getUnitName = this.getUnitName.bind(this);
    }

    resetForm() {
        this.setState({
            formdata: {
                _id :"", 
                code : "", 
                name : "", 
                description : "", 
                m_unit_id : "", 
                is_delete : "", 
                created_by : "", 
                created_date : "", 
                updated_by : "", 
                updated_date : ""
            },
            errors: {}
        });
    }

    // handleValidation() {
    //     let fields = this.state.formdata;
    //     let errors = {};
    //     let formIsValid = true;

    //     if(typrof fields.name === "undefined" || fields.name === null || fields.name === ""){
    //         formIsValid = false;
    //         errors.name = "NAMA SOUVENIR TIDAK BOLEH KOSONG";
    //     }

    //     this.setState({ errors : errors});
    //     return formIsValid;
    // }

    textChanged(e) {
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

    async getDetailSouvenirByID(id) {
        let result = await souvenirapi.GetDetailBySouvenirIDHandler(id);
        let currSouvenir = {};

        if(result.status === 200)
        {
            console.log('Edit ini getDetailSouvenirByID');
            console.log(result.message);
            this.setState({
                souvenir: result.message
            });
        }
        else
        {
            console.log(result.message);
        }
    }

    async submitHandler(){
        if (this.handleValidation()) {
            let result = await souvenirapi.updateSouvenir(this.props.Souvenir);
             if(result.status === 200){
                 console.log('Souvenir - Edit.js Debugger');
                 console.log(result.message);
                 document.getElementById("hidePopUpBtn").click();
                 this.props.modalStatus(1, 'Success', this.props.Souvenir.code);
             }
             else{
                 console.log('Souvenir - Edit.js Debugger');
                 console.log(result.message);
                 document.getElementById("hidePopUpBtn").click();
                 this.props.modalStatus(0, 'Failed', this.props.Souvenir.code);
             }
        }
    }

    async getUnitName(){
        let result = await souvenirapi.GetListUnitName();

        if(result.status === 200)
        {
            console.log('Unit - create.js Debugger');
            console.log("getUnitName");
            console.log(result);
            console.log(result.message);
            console.log("apambuh 2");


            this.setState({
                getUnitTitleList: result.message
            });
        }
    
        else{
            console.log(result.message);
        }
    }

    componentDidMount(){
        // var id = localStorage.getItem('id');
        // this.getDetailSouvenirByID(id);
        // console.log("cek detail souvenir dulu vrohhh");
        // console.log(this.getDetailSouvenirByID(id));
        // this.getAllProductBySupplierID(id);
        this.getUnitName();
        console.log(this.getUnitName());
    }

    componentWillReceiveProps(newProps){
        console.log(newProps);
        this.setState({
            formdata : newProps.Souvenir
        });
    }

    render(){
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>
                        Souvenir
                        <small>Edit Souvenir</small>
                    </h1>
                    <ol className="breadcrumb">
                        <li><a href="#"><i className="fa fa-dashboard"></i> App</a></li>
                        <li><a href="#">Souvenir</a></li>
                        <li className="active">Edit</li>
                    </ol>
                </section>

                <section className="content">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box box-primary">
                                <div className="box-header with-border">
                                    <h3 className="box-title">Edit Souvenir - {this.state.formdata.code}</h3>
                                </div>
                                <form>
                                    <div className="box-body">
                                        <div className="col-xs-6">
                                            <div className="form-group">
                                                <label>Souvenir Code</label>
                                                <input ref="code" type="hidden" className="form-control" id="code" name="code" value={this.state.formdata.code} onChange={this.textChanged}/>
                                                <input type="text" className="form-control" placeholder="Souvenir Code" value={this.state.formdata.code} disabled/>
                                            </div>
                                            <div className="form-group">
                                                <label>Souvenir Name</label>
                                                <input type="text" ref="name" className="form-control" id="name" name="name" 
                                                value={this.state.formdata.name} onChange={this.textHandler} placeholder="Enter Souvenir Name"/>
                                            </div>
                                            <div className="form-group">
                                                <label>Unit Name</label>
                                                <select style={{ marginTop: '10px' }} ref="m_unit_id" className="form-control" id="m_unit_id" name="m_unit_id" value={this.state.formdata.m_unit_id} onChange={this.textChanged}>
                                                <option value=""> Select Unit Name</option>
                                         {
                                             this.state.getUnitTitleList.map((elemen) =>
                                                 <option key={elemen.code} value={elemen.code}> {elemen.name} </option>
                                             )
                                         }
                                            </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Description</label>
                                                <input type="text" ref="description" className="form-control" id="description" name="description" 
                                                value={this.state.formdata.description} onChange={this.textHandler} placeholder="Enter description"/>
                                            </div>
                                        </div>
                                    </div>
    
        
                                </form>
                            </div>
                        </div>
                  </div>
                  </section>
                  </div>
        )
    }
}

export default edit;