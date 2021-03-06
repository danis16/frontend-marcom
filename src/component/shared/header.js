import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import appconfig from '../../config/app.config.json';

console.log("Header.js Debugging : Check Local Storage");
console.log(localStorage.getItem(appconfig.secure_key.token));
console.log(localStorage.getItem(appconfig.secure_key.userdata));

export default class header extends Component {
    constructor(props) {
        super(props);
        this.onSignOut = this.onSignOut.bind(this);
        this.userData = JSON.parse(localStorage.getItem(appconfig.secure_key.userdata));
        this.username = "";
        this.rolename = "";
        console.log("this.userData");
        console.log(this.userData);

        if(this.userData === null || typeof this.userData === undefined)
        {
            this.username = "";
            this.rolename = "";
        }
        else
        {
            this.username = this.userData.UserName;
            this.rolename = this.userData.Role;
        }
    }

    onSignOut() {
        console.log("Debugger Sign Out");
        localStorage.clear();
        this.props.history.push('/');
    }

    render(){
        return (
            <header className="main-header">
                <a href="#" className="logo">
                    <span className="logo-mini"><b>S</b>PA</span>
                    <span className="logo-lg">MARCOM<b>175</b></span>
                </a>
                <nav className="navbar navbar-static-top">
                    <a href="#" className="sidebar-toggle" data-toggle="push-menu" role="button">
                        <span className="sr-only">Toggle navigation</span>
                    </a>
                    <div className="navbar-custom-menu">
                        <ul className="nav navbar-nav">
                            <li className="dropdown user user-menu">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <img src={require("../../content/img/avatar.png")} className="user-image" alt="User Image"/>
                                    <span className="hidden-xs">
                                        {this.username}
                                    </span>
                                </a>
                                <ul className="dropdown-menu">
                                    <li className="user-header">
                                        <img src={require("../../content/img/avatar.png")} className="img-circle" alt="User Image"/>

                                        <p>
                                            {this.username} - {this.rolename}
                                        </p>
                                    </li>
                                    <li className="user-footer">
                                        <div className="pull-right">
                                            <Link className="nav-link" to="" onClick={this.onSignOut}>Sign out</Link>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="clearfix"></div>
            </header>
        )
    }
}