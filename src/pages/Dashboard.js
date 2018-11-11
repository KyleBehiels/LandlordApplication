import React,{Component} from 'react';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import firebase from '../components/firebase';
import Notification from "../components/Notification";
import Event from '../components/Event';

import {faBell} from '@fortawesome/free-solid-svg-icons';
import {faCalendar} from '@fortawesome/free-solid-svg-icons';

library.add(faBell);
library.add(faCalendar);

let firebase_database;

let firstname, userId;

class Dashboard extends Component{

    constructor(){
        super();
        userId = firebase.auth().currentUser.uid;
        this.state ={
            first_name: "",
            notifications: [<Notification></Notification>]
        }
    }

    componentWillMount(){

        // Get and build notifications

        let notifications = [];
        let notificationsRef = firebase.database().ref("/landlords/" + userId + "/notifications/");

        notificationsRef.on("value", (snapshot) => {
            snapshot.forEach((child) => {
                let header;
                switch (child.val().type) {
                    case ("work_order") : 
                        header = "Work Order";
                    break;
                    case ("rent"):
                        header = "Rent"
                    break;
                    default:
                        header = "Notification"
                    break;

                }

                notifications.push(<Notification key={child.key}
                                                 origin={child.val().origin}
                                                 header={header}
                                                 text={child.val().text}    
                                                     ></Notification>); 
                
            });
        });

        // Get and build events

        let events = [];
        let eventsRef = firebase.database().ref("/landlords/" + userId + "/events/");

        eventsRef.on("value", (snapshot) => {
            snapshot.forEach((child) => {
                let header;
                switch (child.val().type) {
                    case ("maintenance") : 
                        header = "Maintenance";
                    break;
                    case ("visitor"):
                        header = "Visitor"
                        break;
                    default:
                        header = "Event"
                    break;

                }

                events.push(<Event key={child.key}
                                                 location={child.val().location}
                                                 header={header}
                                                 description={child.val().description}
                                                 time={child.val().time}    
                                                     ></Event>); 
                
            });
        });

        console.log(events);
        
        this.setState({
            notifications: notifications,
            events: events
        });
    }

    componentDidMount() {
        firstname = firebase.database().ref("/landlords/" + userId).once("value")
        .then((snapshot) => {
          firstname = snapshot.val().firstname;
          this.setState({
            first_name: firstname
          });
        }).catch((e) => {
            alert(e.message);
        });


    }


    render(){
        console.log(this.state.notifications);
        
        return(
            <div>
                <div className="jumbotron">
                    <h2>Dashboard</h2>
                    <hr></hr>
                    <p>Hello {this.state.first_name}, this is your Dashboard! From here you can see notifications and important information. Take a look around!</p>
                    
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <h2 className="card-title"><FontAwesomeIcon icon="bell"></FontAwesomeIcon> Notifications</h2>
                                    <hr></hr>
                                    {this.state.notifications.map(not => <div key={not.key}>{not}</div>)}
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <h2 className="card-title"><FontAwesomeIcon icon="calendar"></FontAwesomeIcon> Upcoming Events <button className="btn float-right btn-primary">+</button> </h2>
                                    <hr></hr>
                                    {this.state.events.map(evnt => <div key={evnt.key}>{evnt}</div>)}
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