import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Index = () => <h2>Dashboard</h2>;
const Properties = () => <h2>Properties</h2>;
const Tenants = () => <h2>Tenants</h2>;
const Analytics = () => <h2>Analytics</h2>;
const WorkOrders = () => <h2>WorkOrders</h2>;

const AppRouter = () => (
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/Properties/">Properties</Link>
          </li>
          <li>
            <Link to="/Tenants/">Tenants</Link>
          </li>
          <li>
            <Link to="/Analytics/">Analytics</Link>
          </li>
          <li>
            <Link to="/WorkOrders/">WorkOrders</Link>
          </li>
        </ul>
      </nav>

      <Route path="/" exact component={Index} />
      <Route path="/Properties/" component={Properties} />
      <Route path="/Tenants/" component={Tenants} />
      <Route path="/Analytics/" component={Analytics} />
      <Route path="/WorkOrders/" component={WorkOrders} />
    </div>
  </Router>
);

export default AppRouter;