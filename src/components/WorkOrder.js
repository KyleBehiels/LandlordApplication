import React, {Component} from 'react';
import firebase from '../components/firebase';

// Props = {header, unit, time, description}

let userId;

class WorkOrder extends Component{
    constructor (props) {
        userId = firebase.auth().currentUser.uid;
        super(props);
        this.finishWorkOrder = this.finishWorkOrder.bind(this);

    }
    finishWorkOrder(){
        console.log(this.props.tempkey);
        firebase.database().ref("/landlords/" + userId + "/workorders/" + this.props.tempkey).remove();
        let workorderCard = document.getElementById("workorder_card");
        workorderCard.classList.add("hidden");
        this.setState()
        //return firebase.database().ref('items').child('ITEM_KEY').remove();

    }
    render(){
        return(
            <div className="row" id="workorder_card">
                <div className="col-sm-12 col-md-16">
                    <div className="card">
                        <div className="card-body">
                            <h3>{this.props.header} <button onClick={this.finishWorkOrder} id="finish_button" className="btn float-right btn-primary">Finish</button></h3>
                            <b>Unit: {this.props.unit} | Finish by: {this.props.time}</b>
                            <p>{this.props.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default WorkOrder;