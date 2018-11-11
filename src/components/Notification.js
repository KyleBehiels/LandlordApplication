import React, {Component} from 'react';


class Notification extends Component{

    render(){
        return(
            <div>
                <h3>{this.props.header} <br></br><small className="work_order_text" >{this.props.text}</small></h3>
                <p>{this.props.origin}</p>
                <hr></hr>
            </div>
        );
    }

}

export default Notification;