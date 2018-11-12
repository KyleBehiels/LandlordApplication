import React, {Component} from 'react';

import firebase from '../components/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import WorkOrder from '../components/WorkOrder';

let firebase_database;

let firstname, userId;

class WorkOrdersPage extends Component{

    constructor(){
        super();
        userId = firebase.auth().currentUser.uid;
        this.toggleNewWorkOrderBox = this.toggleNewWorkOrderBox.bind(this);
        this.submitWorkOrder = this.submitWorkOrder.bind(this);
        this.hashCode = this.hashCode.bind(this);


        this.state ={
            first_name: ""
        }
    }
    componentWillMount(){

        // Get and build work orders

        let workorders = [];
        let workordersRef = firebase.database().ref("/landlords/" + userId + "/workorders/");

        workordersRef.on("value", (snapshot) => {
            snapshot.forEach((child) => {
                let header;
                switch (child.val().type) {
                    case ("maintenance") : 
                        header = "Maintenance";
                    break;
                    case ("upgrade"):
                        header = "Upgrade"
                        break;
                    default:
                        header = "Work Order"
                    break;

                }

                workorders.push(<WorkOrder key={child.key}
                                                 unit={child.val().unit}
                                                 header={header}
                                                 tempkey={child.key}
                                                 description={child.val().description}
                                                 time={child.val().time}    
                                                     ></WorkOrder>); 
                
            });
            this.setState({workorders: workorders});
        });

        console.log(workorders);
        
        this.setState({
            workorders: workorders
        });
    }

    componentDidMount() {
        firstname = firebase.database().ref("/landlords/" + userId).once("value")
        .then((snapshot) => {
          firstname = snapshot.val().firstname;
          this.setState({
            first_name: firstname
          });
        }).catch((e) => {
            alert(e.message);
        });
    }
    
    render(){
        return(
            <div>
                <div className="jumbotron">
                    <h2>Work Orders</h2>
                    <hr></hr>
                    <p>Hello {this.state.first_name}, this is your WorkOrders Page! When tenants submit work orders for your properties they will appear here.</p>
                    
                </div>
                <div className="container">
                    <div className="col-sm-12" style={{marginBottom: 24 + 'px'}}>
                        <button onClick={this.toggleNewWorkOrderBox} id="new_workorder_button" className="btn btn-primary full-width">Add Manual Work Order +</button>
                    </div>
                    <div id="new_workorder_box" className="row form-group hidden">
                        <div className="col-sm-12 col-md-16">
                            <div className="card">
                                <div className="card-body">
                                <div className="form-group">
                                        <label htmlFor="workorder_type">Type</label>
                                        <select id="workorder_type" className="form-control">
                                            <option value="maintenance">Maintenance/Fix</option>
                                            <option value="upgrade">Upgrade</option>

                                        </select>

                                        <label htmlFor="workorder_date">Finish by</label>
                                        <input id="workorder_date" className="form-control" type="date"></input>
                                        <label htmlFor="workorder_unit">Unit</label>
                                        <input id="workorder_unit" className="form-control" type="text" placeholder="Unit"></input>
                                        <label htmlFor="workorder_description">Description</label>
                                        <input id="workorder_description" className="form-control" type="textarea" placeholder="Description" ></input>
                                        <br></br>
                                        <button onClick={this.submitWorkOrder} className="btn btn-success align_center">Add Work Order</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.state.workorders.map(evnt => <div key={evnt.key}>{evnt}</div>)}
                </div>
            </div>
        );
    }

    submitWorkOrder(){
        let workorderDate = document.getElementById("workorder_date").value;
        let workorderDescription = document.getElementById("workorder_description").value;
        let workorderUnit = document.getElementById("workorder_unit").value;
        let workorderType = document.getElementById("workorder_type").value;
        let workorderKey = this.hashCode(workorderDescription) + this.hashCode(workorderDate) + this.hashCode(workorderUnit) + this.hashCode(workorderType);

        firebase.database().ref("/landlords/" + userId + "/workorders/" + workorderKey).set({
            description: workorderDescription,
            time: workorderDate,
            type: workorderType,
            unit: workorderUnit
        });

        console.log(workorderDate);

        this.toggleNewWorkOrderBox();

    }

    toggleNewWorkOrderBox(){
        let toggleButton = document.getElementById("new_workorder_button");
        let workorderBox = document.getElementById("new_workorder_box");
        let btnText = toggleButton.innerHTML;
        console.log(btnText);
        if(btnText == "Add Manual Work Order +"){
            workorderBox.classList.remove("hidden");
            toggleButton.classList.remove("btn-primary");
            toggleButton.classList.add("btn-danger");
            toggleButton.innerHTML = "cancel";
        } else if(btnText == "cancel"){
            workorderBox.classList.add("hidden");
            toggleButton.classList.remove("btn-danger");
            toggleButton.classList.add("btn-primary");
            toggleButton.innerHTML = "Add Manual Work Order +";
        }
    }

    hashCode(mString) {
        let returnable = 0;
        
        for(let x = 0; x < mString.length; x++)
        {
            returnable += mString.charCodeAt(x);
        }

        return returnable;
      };

}

export default WorkOrdersPage;