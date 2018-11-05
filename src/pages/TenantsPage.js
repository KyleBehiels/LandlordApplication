import React, {Component} from 'react';

class TenantsPage extends Component{

    render(){
        return(
            <div>
                <div className="jumbotron">
                    <h2>Tenants</h2>
                    <hr></hr>
                    <p>Hello Landlord, this is your Tenants Page! From this page you can manage the status of the tenants living in your properties.</p>
                    
                </div>
                <div className="container">
                    <div className="col-sm-12">
                        <button className="btn btn-primary full-width">Add Tenant + </button>
                    </div>
                </div>
            </div>
        );
    }

}

export default TenantsPage;