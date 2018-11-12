import React, {Component} from 'react';

class InfoModal extends Component{

    render(){
        return(
            <div id="modal-window">
                <div onClick={this.props.hideModal} className="blanket"></div>
                <div className="modal-content">
                    <div className="container">
                        <h1>{this.props.title}</h1>
                        <hr></hr>
                        {this.props.content}
                    </div>
                </div>
            </div>
        );
    }

    

}

export default InfoModal;