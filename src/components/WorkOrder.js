import React, {Component} from 'react';
import firebase from '../components/firebase';

// Props = {header, unit, time, description}


class WorkOrder extends Component{
    constructor (props) {

        super(props);
        this.finishWorkOrder = this.finishWorkOrder.bind(this);

    }
    finishWorkOrder(){
        console.log(this.props.tempkey);
    }
    render(){
        return(
            <div className="row">
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