import React,{Component} from 'react';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import firebase from '../components/firebase';
import PropertyCard from '../components/PropertyCard'

let userId, userRef;

class PropertiesPage extends Component{

    constructor(){
        super();

        this.state = {
            first_name: "",
            properties: []
        }
        userId = firebase.auth().currentUser.uid;
        userRef = firebase.database().ref("/landlords/" + userId);
        this.togglePropertyForm = this.togglePropertyForm.bind(this);
        this.submitNewProperty = this.submitNewProperty.bind(this);
    }

    togglePropertyForm(){
        let togglePropertyFormButton = document.getElementById('propFormBtn');
        let propertyForm = document.getElementById('propForm');
        if(togglePropertyFormButton.innerHTML == "Add Property +"){
            propertyForm.classList.remove("hidden");
            togglePropertyFormButton.classList.add("btn-danger");
            togglePropertyFormButton.classList.remove("btn-primary");
            togglePropertyFormButton.innerHTML = "Cancel";
        }
        else{
            propertyForm.classList.add("hidden");
            togglePropertyFormButton.classList.remove("btn-danger");
            togglePropertyFormButton.classList.add("btn-primary");
            togglePropertyFormButton.innerHTML = "Add Property +";
        }
    }
 
    submitNewProperty(){
<<<<<<< Updated upstream
        let address = document.getElementById('addressInput').value;
        let delinquent = document.getElementById('delinquentInput').value;
        let paid = document.getElementById('paidTotalInput').value;
        let rent = document.getElementById('rentTotalInput').value;
        let workOrders = document.getElementById('workOrderInput').value;

        if(address !== "" && delinquent !== "" && paid !== "" && rent !== "" && workOrders !== ""){
            let propertyKey = this.hashCode(address) + this.hashCode(delinquent) + this.hashCode(paid) + this.hashCode(rent) + this.hashCode(workOrders);

            firebase.database().ref('/landlords/' + userId + '/properties/' + propertyKey).set({
                address: address,
                delinquent_tenants: delinquent,
                paid_tenants: paid,
                monthly_rent: rent,
                work_orders: workOrders
            });

        }
=======
        let address = document.getElementById('addressInput').nodeValue;
        let delinquent = document.getElementById('delinquentInput').nodeValue;
>>>>>>> Stashed changes

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

    componentWillMount(){
        
        firebase.database().ref("/landlords/" + userId).once("value")
        .then((snapshot) => {
          let firstname = snapshot.val().firstname;
          this.setState({
            first_name: firstname
          });
        }).catch((e) => {
            alert(e.message);
        });
    }


    componentDidMount(){
        firebase.database().ref('/landlords/'+userId+"/properties").on("value", (snapshot) => {
            let properties = [];
            snapshot.forEach(child => {
                console.log(child);
                
                properties.push(<PropertyCard 
                    key={child.key}
                    address={child.val().address} 
                    prop_key={child.key}
                    delinquent_tenants={child.val().delinquent_tenants}
                    maintenance_requests={child.val().maintenance_requests}
                    monthly_rent={child.val().monthly_rent}
                    paid_tenants={child.val().paid_tenants} ></PropertyCard>)
            });
            this.setState({
                properties: properties
            });
        });
    }


    render(){



        return(
            <div>
                <div className="jumbotron">
                    <h2>Properties</h2>
                    <hr></hr>
                    <p>Hello {this.state.first_name}, this is your Properties Page! From this page you can manage the properties that you currently own and view information about each.</p>
                    
                </div>
                <div className="container">
                    <div className="col-sm-12">
                        <button id="propFormBtn" onClick={this.togglePropertyForm} className="btn btn-primary full-width">Add Property +</button>
                        <form id="propForm" className="form-group container hidden">
                            <hr></hr>
                            <h3>New Property</h3>
                            <hr></hr>
                            <div className="row">
                                <input id="addressInput" className="form-control" type="text" placeholder="Address"></input>
                            </div>
                            <br></br>
                            <div className="row">
                                <input id="delinquentInput" className="prop-field form-control col-sm-2 col-6" type="number" placeholder="Delinquent"></input>
                                <input id="workOrderInput" className="prop-field form-control col-sm-2 col-6" type="number" placeholder="Work Orders"></input>
                                <input id="rentTotalInput" className="prop-field form-control col-sm-2 col-6" type="number" placeholder="Rent Total"></input>
                                <input id="paidTotalInput" className="prop-field form-control col-sm-2 col-6" type="number" placeholder="Paid Tenants"></input>
                                <button onClick={this.submitNewProperty} id="submitForm" className="prop-field btn btn-success" >Add Property</button>
                            </div>
                            <hr></hr>
                        </form>
                    </div>
                    {this.state.properties.map(proper => <div key={proper.key}>{proper}</div>)}
                </div>
            </div>
        );
    }


}
export default PropertiesPage;