import React,{Component} from 'react';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import firebase from '../components/firebase';
import Notification from "../components/Notification";
import Event from '../components/Event';

import {faBell} from '@fortawesome/free-solid-svg-icons';
import {faCalendar} from '@fortawesome/free-solid-svg-icons';
import {faTachometerAlt} from '@fortawesome/free-solid-svg-icons';


library.add(faBell);
library.add(faCalendar);
library.add(faTachometerAlt);




let firebase_database;

let firstname, userId;

class Dashboard extends Component{

    constructor(){
        super();
        userId = firebase.auth().currentUser.uid;
        this.toggleNewEventBox = this.toggleNewEventBox.bind(this);
        this.submitEvent = this.submitEvent.bind(this);
        this.hashCode = this.hashCode.bind(this);
        this.state ={
            first_name: "",
            events: [],
            notifications: [],
            notifications: [<Notification></Notification>]
        }
    }

    componentWillMount(){

        // Get and build notifications

        
        let notificationsRef = firebase.database().ref("/landlords/" + userId + "/notifications/");

        notificationsRef.on("value", (snapshot) => {
            let notifications = [];
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
            this.setState({notifications: notifications});
        });

        // Get and build events

        
        let eventsRef = firebase.database().ref("/landlords/" + userId + "/events/");

        eventsRef.on("value", (snapshot) => {
            let events = [];
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
            this.setState({events: events});
        });

        // console.log(events);
        
        // this.setState({
        //     notifications: notifications,
        //     events: events
        // });
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

        console.log(this.hashCode("Hello World"));
        
    }

    submitEvent(){
        let eventDate = document.getElementById("event_date").value;
        let eventDescription = document.getElementById("event_description").value;
        let eventLocation = document.getElementById("event_location").value;
        let eventType = document.getElementById("event_type").value;

        if(eventDate != "" && eventDescription != "" && eventLocation != "" && eventType != ""){

            let eventKey = this.hashCode(eventDescription) + this.hashCode(eventDate) + this.hashCode(eventLocation) + this.hashCode(eventType);

            firebase.database().ref("/landlords/" + userId + "/events/" + eventKey).set({
                description: eventDescription,
                time: eventDate,
                type: eventType,
                location: eventLocation 
            });

            console.log(eventDate);

            this.toggleNewEventBox();
        }


    }
    // Not a real hash but guarantees a unique ID
    hashCode(mString) {
        let returnable = 0;
        
        for(let x = 0; x < mString.length; x++)
        {
            returnable += mString.charCodeAt(x);
        }

        return returnable;
      };

    toggleNewEventBox(){
        let toggleButton = document.getElementById("new_event_button");
        let eventBox = document.getElementById("new_event_box");
        let btnText = toggleButton.innerHTML;

        if(btnText == "Add Event +"){
            eventBox.classList.remove("hidden");
            toggleButton.classList.remove("btn-primary");
            toggleButton.classList.add("btn-danger");
            toggleButton.innerHTML = "cancel";
        } else if(btnText == "cancel"){
            eventBox.classList.add("hidden");
            toggleButton.classList.remove("btn-danger");
            toggleButton.classList.add("btn-primary");
            toggleButton.innerHTML = "Add Event +";
        }
    }


    render(){
        console.log(this.state.notifications);
        
        return(
            <div>
                <div className="jumbotron">
                    <h2><FontAwesomeIcon icon="tachometer-alt"></FontAwesomeIcon> Dashboard</h2>
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
                                    <h2 className="card-title"><FontAwesomeIcon icon="calendar"></FontAwesomeIcon> Upcoming Events <button onClick={this.toggleNewEventBox} id="new_event_button" className="btn float-right btn-primary">Add Event +</button> </h2>
                                    <div id="new_event_box" className="form-group hidden">
                                        <label htmlFor="event_type">Type</label>
                                        <select id="event_type" className="form-control">
                                            <option value="maintenance">Maintenance</option>
                                            <option value="visitor">Visitor</option>
                                        </select>

                                        <label htmlFor="event_date">Date</label>
                                        <input id="event_date" className="form-control" type="date"></input>
                                        <label htmlFor="event_location">Location</label>
                                        <input id="event_location" className="form-control" type="text" placeholder="Location"></input>
                                        <label htmlFor="event_description">Description</label>
                                        <input id="event_description" className="form-control" type="textarea" placeholder="Description" ></input>
                                        <br></br>
                                        <button onClick={this.submitEvent} className="btn btn-success align_center">Add Event</button>
                                    </div>
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