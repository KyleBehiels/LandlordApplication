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
                            <img className="full-width" src="https://cdn-images-1.medium.com/max/1200/1*CPSTzfUTCCpUbllyiPvl_A.jpeg"></img>
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <img className="full-width" src="https://static.vaadin.com/directory/user35550/screenshot/file8494337878231358249_15061520778722017-09-2309_33_26-VaadinChart.jsAddon.png"></img>
                        </div>
                    </div>
                    <br></br>
                    <div className="row">
                        <div className="col-sm-12 col-md-6">
                            <img className="full-width" src="https://d33wubrfki0l68.cloudfront.net/27e097e30878eebee95ec72ef3129f6b4e36f25c/5d0a8/images/vuejs/vue-chart-js/chartjs-planets-graph.png"></img>
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <img className="full-width" src="https://i.stack.imgur.com/SY5hu.png"></img>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default AnalyticsPage;