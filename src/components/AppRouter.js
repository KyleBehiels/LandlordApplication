import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import firebase from '../components/firebase';
import Dashboard from '../pages/Dashboard';

const Index = () => <Dashboard></Dashboard>;
const Properties = () => <h2>Properties</h2>;
const Tenants = () => <h2>Tenants</h2>;
const Analytics = () => <h2>Analytics</h2>;
const WorkOrders = () => <h2>WorkOrders</h2>;

let onDashboard = false, onProperties = false, onTenants = false, onAnalytics = false, onWorkOrders = false; 


class AppRouter extends Component {

  constructor(props){
    super(props);
    let err = 1;
    this.onPageChange = this.onPageChange.bind(this);
    this.logout = this.logout.bind(this);
    this.state={
      onDashboard : "active",
      onProperties : "",
      onTenants : "",
      onAnalytics : "",
      onWorkOrders : ""
    }
  }

  onPageChange(change){

    switch (change) {
      case "Dashboard":
        this.setState({
          onDashboard : "active",
          onProperties : "",
          onTenants : "",
          onAnalytics : "",
          onWorkOrders : ""
        });
        break;
    
      case "Properties":
        this.setState({
          onDashboard : "",
          onProperties : "active",
          onTenants : "",
          onAnalytics : "",
          onWorkOrders : ""
        });
        break;
  
      case "Tenants":
        this.setState({
          onDashboard : "",
          onProperties : "",
          onTenants : "active",
          onAnalytics : "",
          onWorkOrders : ""
        });
        break;
      case "Analytics":
        this.setState({
          onDashboard : "",
          onProperties : "",
          onTenants : "",
          onAnalytics : "active",
          onWorkOrders : ""
        });
        break;
      case "WorkOrders":
        this.setState({
          onDashboard : "",
          onProperties : "",
          onTenants : "",
          onAnalytics : "",
          onWorkOrders : "active"
        });
        break;
  
      default:
        break;
  
  
    }
  }

  logout(){
    if(window.confirm('Are you sure you want to log out?')){
      firebase.auth().signOut();
      this.props.loginFunction(false);
    }
  }

  render(){
    return (
      <Router>
        <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/">Landlord Application</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className={"nav-item " + this.state.onDashboard}>
                <Link onClick={() => this.onPageChange("Dashboard")} className="nav-link" to="/">Dashboard</Link>
              </li>
              <li className={"nav-item " + this.state.onProperties}>
                <Link onClick={() => this.onPageChange("Properties")} className="nav-link" to="/Properties/">Properties</Link>
              </li>
              <li className={"nav-item " + this.state.onTenants}>
                <Link onClick={() => this.onPageChange("Tenants")} className="nav-link" to="/Tenants/">Tenants</Link>
              </li>
              <li className={"nav-item " + this.state.onAnalytics}>
                <Link onClick={() => this.onPageChange("Analytics")} className="nav-link" to="/Analytics/">Analytics</Link>
              </li>
              <li className={"nav-item " + this.state.onWorkOrders}>
                <Link onClick={() => this.onPageChange("WorkOrders")} className="nav-link" to="/WorkOrders">WorkOrders</Link>
              </li>
            </ul>
            <span className="ml-auto">
              <button onClick={this.logout} className="float-right btn btn-primary">Logout</button>
            </span>
            </div>
          </nav>

          <Route path="/" exact component={Index} />
          <Route path="/Properties/" component={Properties} />
          <Route path="/Tenants/" component={Tenants} />
          <Route path="/Analytics/" component={Analytics} />
          <Route path="/WorkOrders/" component={WorkOrders} />
        </div>
      </Router>
    );
  }
  
};

export default AppRouter;