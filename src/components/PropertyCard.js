import React, {Component} from 'react';


class PropertyCard extends Component{

    render(){
        return(
            <div>
                <div className="card prop_card">
                    <div className="card-body">
                        <h3 className="card-title">{this.props.address}</h3>
                        <h4 className="subtitle">Delinquent:{this.props.delinquent_tenants} Paid:{this.props.paid_tenants} Maint. Requests:{this.props.maintenance_requests} Monthly Rent:{this.props.monthly_rent} </h4>
                        <hr></hr>
                    <div className="d-flex justify-content-center">
                        <button className="prop-btn btn btn-default">View Tenants</button>
                        <button className="prop-btn btn btn-default">View Work Orders</button>
                        <button className="prop-btn btn btn-primary">Add Tenant +</button>
                    </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default PropertyCard;