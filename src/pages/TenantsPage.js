import React, {Component} from 'react';
import firebase from '../components/firebase';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {faUsers} from '@fortawesome/free-solid-svg-icons';

library.add(faUsers);

let userId;
let tenantList = [];

class TenantsPage extends Component{

    constructor(){
        super();

        this.getPropertyList = this.getPropertyList.bind(this);
        this.toggleEditBox = this.toggleEditBox.bind(this);
        this.selectedTenant = this.selectedTenant.bind(this);
        this.removeTenant = this.removeTenant.bind(this);
        this.addTenant = this.addTenant.bind(this);
        this.toggleNewTenantBox = this.toggleNewTenantBox.bind(this);
        this.submitTenant = this.submitTenant.bind(this);
        this.markDelinquent = this.markDelinquent.bind(this);
        this.markPaid = this.markPaid.bind(this);
        userId = firebase.auth().currentUser.uid;

        this.state = {
            properties: [],
            selected_tenant: ""
        };

    }

    toggleEditBox(boxId){
        let box = document.getElementById("edit-box-" + boxId);
        let managebtn = document.getElementById("manage-btn-" + boxId);

        if(box.classList.contains("hidden")){
            box.classList.remove("hidden");
            managebtn.classList.remove("btn-primary");
            managebtn.classList.add("btn-danger");
            managebtn.innerHTML = "Cancel";
            this.setState({
                managing: true
            });
        }

        else{
            box.classList.add("hidden");
            managebtn.classList.add("btn-primary");
            managebtn.classList.remove("btn-danger");
            managebtn.innerHTML = "Manage";
            this.setState({
                managing: false
            });
            let arr = document.getElementsByClassName("tenant-row");
            let arrLength = arr.length;
    
            for(let i = 0; i < arrLength; i++){
                arr[i].classList.remove("highlighted");
            }
        }

    }

    addTenant(){

    }
    removeTenant(propertyKey){
        if(this.state.selected_tenant === ""){
            alert("Please select a tenant!");
        }
        else{
            if(window.confirm("Are you sure you want to delete this tenant?")){
                firebase.database().ref("/landlords/" + userId + "/properties/" + propertyKey + "/tenants/" + this.state.selected_tenant).remove();
                this.getPropertyList();
            }
        }
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

    selectedTenant(selectedTenant, boxId){
        if(this.state.managing){

            this.setState({
                selected_tenant: selectedTenant
            }); 
            let arr = document.getElementsByClassName("tenant-row");
            let arrLength = arr.length;
    
            for(let i = 0; i < arrLength; i++){
                arr[i].classList.remove("highlighted");
            }
            
            // .forEach(row => {
            //     row.classList.remove("highlighted");
            // });
            document.getElementById(boxId + "" + selectedTenant).classList.add("highlighted");

        }
        
    }

    toggleNewTenantBox(boxId){
        let tenantBox = document.getElementById("new-tenant-box-"+boxId);
        let addTenantsButton = document.getElementById("new-tenant-btn-" + boxId);


        if(tenantBox.classList.contains("hidden")){
            tenantBox.classList.remove("hidden");
            addTenantsButton.classList.add("btn-danger");
            addTenantsButton.classList.remove("btn-primary");
            addTenantsButton.innerHTML = "Cancel";
        }
        else{
            tenantBox.classList.add("hidden");
            addTenantsButton.classList.remove("btn-danger");
            addTenantsButton.classList.add("btn-primary");
            addTenantsButton.innerHTML = "Add Tenant +";
        }
    }

    markPaid(){
        alert("Tenant marked as paid. Well... at least they will be in the final version. Stay tuned :-)");
    }

    markDelinquent(){
        alert("Tenant marked as delinquent. Well... at least they will be in the final version. Stay tuned :-)");
    }

    submitTenant(boxId){
        let tenantEmail = document.getElementById("tenant-email-" + boxId).value;
        let tenantFirst =document.getElementById("tenant-first-" + boxId).value;
        let tenantLast = document.getElementById("tenant-last-" + boxId).value;
        let tenantPhone = document.getElementById("tenant-phone-" + boxId).value;
        let tenantRent = document.getElementById("tenant-rent-" + boxId).value;
        
        if(tenantEmail !== "" && tenantFirst !== "" && tenantLast !== "" && tenantPhone !== "" && tenantRent !== "" ){

            let tenantKey = this.hashCode(tenantFirst + tenantLast + tenantEmail + tenantPhone);

            firebase.database().ref("/landlords/" + userId + "/properties/" + boxId + "/tenants/" + tenantKey).set({
                first: tenantFirst,
                last: tenantLast,
                email: tenantEmail,
                phone: tenantPhone,
                rent: tenantRent
            });
            

            alert( tenantFirst + " " + tenantLast + " was added successfully!");

            let indexval = tenantEmail.split("@")[0];
            firebase.database().ref("/tenantindex/" + indexval).set({
                key: tenantKey,
                landlord_key: userId,
                propid: boxId,
                tenantname: tenantFirst + " " + tenantLast
            });

        }
        else{
            alert("Please fill out all fields!")
        }        
        
    }

    getPropertyList(callback){
        let properties = [];
        firebase.database().ref('/landlords/'+userId+"/properties").once("value", (snapshot) => {
            
            snapshot.forEach(child => {
                console.log(child);
                let tenants = [];
                firebase.database().ref('/landlords/' + userId + "/properties/" + child.key + "/tenants").once("value", (_tenants) => {
                    
                    _tenants.forEach(tenant => {
                        console.log(child.val().email);
                        tenants.push({
                            key : tenant.key,
                            name: tenant.val().first + " " + tenant.val().last,
                            email: tenant.val().email,
                            phone : tenant.val().phone,
                            rent: tenant.val().rent
                        });
                    });
                    // properties.push({
                    //     key: child.key,
                    //     address: child.val().address,
                    //     tenants: tenants
                    // });
                    properties.push(
                    <div>
                        <hr></hr>
                        <div className="row">
                            <div className="col-6 col-sm-8">
                                <h3>{child.val().address}</h3>
                            </div>
                            <div className="col-6 col-sm-4">
                                <button id={"manage-btn-" + child.key} onClick={()=>this.toggleEditBox(child.key)} className="tenant-manage-btn btn btn-primary float-right">Manage</button>
                            </div>
                        </div>
                        <div id={"edit-box-"+child.key} className="row hidden">
                            <div className="col-sm-12">
                                <button onClick={this.markPaid} className="btn btn-success tenant-manage-btn float-right">Mark Paid</button>
                                <button onClick={this.markDelinquent} className="btn btn-warning tenant-manage-btn float-right">Mark Delinquent</button>
                                <button id={"new-tenant-btn-"+child.key} onClick={() => this.toggleNewTenantBox(child.key)} className="btn btn-primary tenant-manage-btn float-right">Add Tenant +</button>
                                <button onClick={() => this.removeTenant(child.key)} className="btn btn-danger tenant-manage-btn float-right">Remove Tenant -</button>
                            </div>
                        </div>
                        <div id={"new-tenant-box-" + child.key} className="hidden">
                            <h4>New Tenant</h4>
                            <hr></hr>
                            <form className="form-group">
                                <div className="row">
                                    <div className="col-12">
                                        <input id={"tenant-email-" + child.key} className="form-control" type="email" placeholder="email"></input>
                                    </div>
                                </div>
                                <br></br>
                                <div className="row">

                                    <div className="col-sm-6">
                                        <input id={"tenant-first-" + child.key} className="form-control" type="text" placeholder="First"></input>
                                    </div>

                                    <div className="col-sm-6">
                                        <input id={"tenant-last-" + child.key} className="form-control" type="text" placeholder="Last"></input>
                                    </div>

                                </div>
                                <br></br>
                                <div className="row">

                                    <div className="col-sm-6">
                                        <input id={"tenant-rent-" + child.key} className="form-control" type="number" placeholder="Rent/Month"></input>
                                    </div>

                                    <div className="col-sm-6">
                                        <input id={"tenant-phone-" + child.key} className="form-control" type="phone" placeholder="Phone Number"></input>
                                    </div>

                                </div>
                                <br></br>
                                <div className="row">
                                    <div className="col-12">
                                        <button onClick={() => this.submitTenant(child.key)} className="btn btn-success">Add Tenant +</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        
                        <table className="tenant-table">
                            <th>Name</th><th>Phone</th><th>Email</th><th>Rent</th>
                            {tenants.map(ten => <tr id={child.key + "" + ten.key} onClick={() => this.selectedTenant(ten.key, child.key)} className="tenant-row" key={ten.key}><td>{ten.name}</td><td>{ten.phone}</td> <td>{ten.email}</td> <td>${ten.rent}</td> </tr>)}
                        </table>
                        
                    </div>)
                   this.setState({
                    properties: properties
                   }) ;
                });
                
            });  

        });
       
    }


    componentWillMount(){        
        this.getPropertyList();
    }

    render(){
        return(
            <div>
                <div className="jumbotron">
                    <h2><FontAwesomeIcon icon="users"></FontAwesomeIcon> Tenants</h2>
                    <hr></hr>
                    <p>Hello Landlord, this is your Tenants Page! From this page you can manage the status of the tenants living in your properties.</p>
                    
                </div>
                <div className="container">
                    {this.state.properties.map(proper => <div key={proper.key}>{proper}</div>)}
                </div>
            </div>
        );
    }

}

export default TenantsPage;