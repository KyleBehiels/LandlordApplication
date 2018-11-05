import React,{Component} from 'react';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {faBell} from '@fortawesome/free-solid-svg-icons';
import {faCalendar} from '@fortawesome/free-solid-svg-icons';

library.add(faBell);
library.add(faCalendar);

class Dashboard extends Component{


    render(){
        return(
            <div>
                <div className="jumbotron">
                    <h2>Dashboard</h2>
                    <hr></hr>
                    <p>Hello Landlord, this is your Dashboard! From here you can see notifications and important information. Take a look around!</p>
                    
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <h2 className="card-title"><FontAwesomeIcon icon="bell"></FontAwesomeIcon> Notifications</h2>
                                    <hr></hr>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <h2 className="card-title"><FontAwesomeIcon icon="calendar"></FontAwesomeIcon> Upcoming Events</h2>
                                    <hr></hr>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


}
export default Dashboard;