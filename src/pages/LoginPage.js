import React, {Component} from 'react';

class LoginPage extends Component{
    constructor(props){
        super(props);
        this.toggleSignup = this.toggleSignup.bind(this);
        this.state = {
            signup : false
        }
    }

    toggleSignup(){
        let signupForm = document.getElementById('signup_form');
        if(this.state.signup){
            signupForm.classList.add("hidden");
            this.setState({
                signup: false
            });
        }
        else{
            signupForm.classList.remove("hidden");
            this.setState({
                signup: true
            });
        }
    }

    render(){
        return (
            <div>
                <div className="container">
                    <div className="header text-center">
                        <h1>Landlord application</h1>
                    </div>
                    
                    <hr></hr>

                    <div id="login_card" className="card">
                        <div className="card-body">
                            <h2>Sign In</h2>
                            <hr></hr>
                            <form>
                                <div className="form-group">
                                    <input className="form-control" type="text" placeholder="Email" ></input>
                                    <br></br>
                                    <input className="form-control" type="password" placeholder="Password"></input>
                                </div>
                                <input className="form-control btn btn-primary" type="submit" value="Sign In"></input>
                            </form>
                            <hr></hr>
                            <button id="signup_button" className="btn btn-secondary" onClick={this.toggleSignup}>Don't have an account?</button>
                            <form id="signup_form" className="hidden">
                                <h2>Sign Up</h2>
                                <hr></hr>
                                <div className="form-group">
                                    <input className="form-control" type="text" placeholder="Email"></input>
                                    <br></br>
                                    <input className="form-control" type="password" placeholder="Password"></input>
                                    <br></br>
                                    <input className="form-control" type="password" placeholder="Confirm"></input>
                                </div>
                                <input className="form-control btn btn-primary" type="submit" value="Sign Up"></input>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPage;