import React, {Component} from 'react';

class AnalyticsPage extends Component{

    render(){
        return(
            <div>
                <div className="jumbotron">
                    <h2>Analytics</h2>
                    <hr></hr>
                    <p>Hello Landlord, this is your Analytics Page! This page visualizes important data about your properties in order to aid in business decisions.</p>
                    
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-6">
                            <img className="full-width" src="https://placehold.it/300x300"></img>
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <img className="full-width" src="https://placehold.it/300x300"></img>
                        </div>
                    </div>
                    <br></br>
                    <div className="row">
                        <div className="col-sm-12 col-md-6">
                            <img className="full-width" src="https://placehold.it/300x300"></img>
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <img className="full-width" src="https://placehold.it/300x300"></img>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default AnalyticsPage;