import React,{Component} from 'react';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class PropertiesPage extends Component{

    render(){
        return(
            <div>
                <div className="jumbotron">
                    <h2>Properties</h2>
                    <hr></hr>
                    <p>Hello Landlord, this is your Properties Page! From this page you can manage the properties that you currently own and view information about each.</p>
                    
                </div>
                <div className="container">
                    <div className="col-sm-12">
                        <button className="btn btn-primary full-width">Add Property + </button>
                    </div>
                </div>
            </div>
        );
    }


}
export default PropertiesPage;