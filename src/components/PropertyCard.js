import React, {Component} from 'react';

import firebase from "../components/firebase";
import InfoModal from '../components/InfoModal';

let userId;


class PropertyCard extends Component{

    constructor(){
        super();
        this.hashCode = this.hashCode.bind(this);
        this.toggleTenantForm = this.toggleTenantForm.bind(this);
        this.submitTenant = this.submitTenant.bind(this);
        this.showTenantsModal = this.showTenantsModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        userId = firebase.auth().currentUser.uid;
        this.state = {
            InfoModal: ""
        };
    }

    // Not a real hash but guarantees a unique ID
    hashCode(mString) {
        let returnable = 0;
        
        for(let x = 0; x < mString.length; x++)
        {
            returnable += mString.charCodeAt(x);
        }

        return returnable;
    };

    hideModal(){
        this.setState({
            InfoModal: ""
        });

    }

        


    toggleTenantForm(){
        let newTenantFormBtn = document.getElementById('toggle-tenant-btn' + this.props.prop_key);
        let newTenantForm = document.getElementById('new-tenant-form' + this.props.prop_key);
        if(newTenantFormBtn.innerHTML === "Add Tenant +"){
            newTenantForm.classList.remove("hidden");
            newTenantFormBtn.innerHTML = "Cancel";
            newTenantFormBtn.classList.remove("btn-primary");
            newTenantFormBtn.classList.add("btn-danger");
        }
        else{
            newTenantForm.classList.add("hidden");
            newTenantFormBtn.innerHTML = "Add Tenant +";
            newTenantFormBtn.classList.add("btn-primary");
            newTenantFormBtn.classList.remove("btn-danger");
        }
    }

    showTenantsModal(){
        let tenants = [];
        firebase.database().ref("/landlords/" + userId + "/properties/" + this.props.prop_key + "/tenants/").once("value", (snapshot)=> {
            snapshot.forEach(child => {
                tenants.push(
                <div key={child.first + child.last} className="row">
1                   <div className="col-6 col-md-3">{child.first + " " + child.last}</div>
                    <div className="col-6 col-md-3">{child.email}</div>
                    <div className="col-6 col-md-3">{child.phone}</div>
                    <div className="col-6 col-md-3">{child.rent}</div>
                </div>
                );
            });
        });

        this.setState({
            InfoModal: <InfoModal title="Tenants" contents={tenants.map(ten => <div key={ten.key}>{ten}</div>)} hideModal={this.hideModal}></InfoModal>
        });
    }

    submitTenant(){
        let tenantEmail = document.getElementById('tenant-email' + this.props.prop_key).value;
        let tenantFirst = document.getElementById('tenant-first' + this.props.prop_key).value;
        let tenantLast = document.getElementById('tenant-last' + this.props.prop_key).value;
        let tenantRent = document.getElementById('tenant-rent' + this.props.prop_key).value;
        let tenantPhone = document.getElementById('tenant-phone' + this.props.prop_key).value;
        let tenantKey =this.hashCode(tenantEmail) + this.hashCode(tenantFirst) + this.hashCode(tenantLast) + this.hashCode(tenantRent) + this.hashCode(tenantPhone);
        
        if(tenantEmail !== "" &&tenantFirst !== "" &&tenantLast !== "" &&tenantRent !== "" &&tenantPhone !== "" ){
            firebase.database().ref("/landlords/" + userId + "/properties/" + this.props.prop_key + "/tenants/" + tenantKey).set({
                email: tenantEmail,
                first: tenantFirst,
                last: tenantLast,
                rent: tenantRent,
                phone: tenantPhone
            });
            alert("Tenant added!")
        }
        else{
            alert("Please fill out all of the fields!");
        }
    
    }

    render(){
        return(
            <div>
                {this.state.InfoModal}
                <div className="card prop_card">
                    <div className="card-body">
                        <h3 className="card-title">{this.props.address}</h3>
                        <h4 className="subtitle"><span className="category-bold">Delinquent: </span>{this.props.delinquent_tenants} <span className="category-bold">Paid: </span>{this.props.paid_tenants} <span className="category-bold">Work Orders: </span>{this.props.maintenance_requests} <span className="category-bold">Monthly Rent: </span>{this.props.monthly_rent} </h4>
                        <hr></hr>
                        <div className="d-flex justify-content-center">
                            <button onClick={this.showTenantsModal} className="prop-btn btn btn-default">View Tenants</button>
                            <button className="prop-btn btn btn-default">View Work Orders</button>
                            <button onClick={this.toggleTenantForm} id={"toggle-tenant-btn" + this.props.prop_key} className="prop-btn btn btn-primary">Add Tenant +</button>
                        </div>
                        <div id={"new-tenant-form" + this.props.prop_key} className="card hidden">
                            <div className="card-body">
                            <h4 className="card-title">New Tenant</h4>
                            <hr></hr>
                                <form className="form-group">
                                    <div className="row">
                                        <div className="col-12">
                                            <input id={"tenant-email" + this.props.prop_key} className="form-control" type="email" placeholder="email"></input>
                                        </div>
                                    </div>
                                    <br></br>
                                    <div className="row">

                                        <div className="col-sm-6">
                                            <input id={"tenant-first" + this.props.prop_key} className="form-control" type="text" placeholder="First"></input>
                                        </div>

                                        <div className="col-sm-6">
                                            <input id={"tenant-last" + this.props.prop_key} className="form-control" type="text" placeholder="Last"></input>
                                        </div>

                                    </div>
                                    <br></br>
                                    <div className="row">

                                        <div className="col-sm-6">
                                            <input id={"tenant-rent" + this.props.prop_key} className="form-control" type="number" placeholder="Rent/Month"></input>
                                        </div>

                                        <div className="col-sm-6">
                                            <input id={"tenant-phone" + this.props.prop_key} className="form-control" type="phone" placeholder="Phone Number"></input>
                                        </div>

                                    </div>
                                    <br></br>
                                    <div className="row">
                                        <div className="col-12">
                                            <button onClick={this.submitTenant} className="btn btn-success">Add Tenant +</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default PropertyCard;