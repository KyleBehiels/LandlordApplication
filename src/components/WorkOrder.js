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

        if(window.confirm("Are you sure you want to finish this work order?")){
            console.log(this.props.tempkey);
            firebase.database().ref("/landlords/" + userId + "/properties/" + this.props.prop_key + "/work_orders/" + this.props.tempkey).remove();
    
        }
        
    }
    render(){
        return(
            <div className="row" id="workorder_card">
                <div className="col-sm-12 col-md-16">
                    <div className="card">
                        <div className="card-body">
                            <h3>{this.props.header} <button onClick={this.finishWorkOrder} id="finish_button" className="btn float-right btn-primary">Finish</button></h3>
                            <b>Unit: {this.props.unit} - {this.props.propname} | Finish by: {this.props.time}</b>
                            <p>{this.props.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default WorkOrder;