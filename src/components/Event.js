import React, {Component} from 'react';

// Props = {header, location, time, description}


class Event extends Component{
    
    render(){
        return(
            <div>
                <h3>{this.props.header}</h3>
                <b>{this.props.location} | {this.props.time}</b>
                <p>{this.props.description}</p>
                <hr></hr>
            </div>
        );
    }
}

export default Event;