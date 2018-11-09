import React, {Component} from 'react';
import firebase from '../components/firebase';

class LoginPage extends Component{
    constructor(props){
        super(props);
        this.toggleSignup = this.toggleSignup.bind(this);
        this.onSignUpSubmit = this.onSignUpSubmit.bind(this);
        this.onSignInSubmit = this.onSignInSubmit.bind(this);
        this.state = {
            signup : false
        }
    }

    toggleSignup(){
        let signupForm = document.getElementById('signup_form');
        let signinForm = document.getElementById('signin_form');
        let signupButton = document.getElementById('signup_button');
        if(this.state.signup){
            signupButton.innerHTML = "Don't have an account?";
            signupForm.classList.add("hidden");
            signinForm.classList.remove("hidden");
            this.setState({
                signup: false,
                signin: true
            });
        }
        else{
            signupButton.innerHTML = "Already have an account?";
            signupForm.classList.remove("hidden");
            signinForm.classList.add("hidden");
            this.setState({
                signup: true,
                signin: false
            });
        }
    }

    onSignInSubmit(){
        let signinUsername = document.getElementById('signinUsername');
        let signinPassword = document.getElementById('signinPassword');

        firebase.auth().signInWithEmailAndPassword(signinUsername.value, signinPassword.value).then(() => {
            // Gucci
            this.props.loginFunction(true);
        }).catch((error) => {
            alert(error.message);
        });


    }

    onSignUpSubmit(){
        let signupPassword = document.getElementById('signupPassword');
        let signupConfirm = document.getElementById('signupConfirm');
        let signupUsername = document.getElementById('signupUsername');
        let signupFirstName = document.getElementById('signupFirstName');
        let signupLastName = document.getElementById('signupLastName');


        
        if((signupUsername.value !== "") && (signupPassword.value !== "") && (signupPassword.value === signupConfirm.value)){
            
            alert("Creating user");

            firebase.auth().createUserWithEmailAndPassword(signupUsername.value, signupPassword.value).then(()=>{
                alert("Success");
                this.props.loginFunction(true);

                let database = firebase.database();
                let userId = firebase.auth().currentUser.uid;
                let ref = database.ref('landlords/'+userId);

                ref.set({
                    email: signupUsername.value,
                    firstname: signupFirstName.value,
                    lastname: signupLastName.value
                });

            }).catch((error) => {
                let errorCode = error.code;
                let errorMessage = error.message;

                alert(errorMessage);
                console.log(errorCode);
                
            });
        }
        else if( signupPassword.value !== signupConfirm.value ){
            alert("Passwords do not match");
        }
        else{
            alert("Please fill all fields");
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
                            
                            <div id="signin_form">
                                <h2>Sign In</h2>
                                <hr></hr>
                                <div className="form-group">
                                    <input id="signinUsername" className="form-control" type="text" placeholder="Email" ></input>
                                    <br></br>
                                    <input id="signinPassword" className="form-control" type="password" placeholder="Password"></input>
                                </div>
                                <button onClick={this.onSignInSubmit} className="form-control btn btn-primary">Sign In</button>
                            </div>
                            <hr></hr>
                            <button id="signup_button" className="btn btn-secondary" onClick={this.toggleSignup}>Don't have an account?</button>
                            <div id="signup_form" className="hidden">
                                <h2>Sign Up</h2>
                                <hr></hr>
                                <div className="form-group">
                                    <label>Name</label>
                                    <div className="row">
                                        <div className="col-6">
                                            <input id="signupFirstName" className="form-control" type="text" placeholder="First"></input>
                                        </div>
                                        <div className="col-6">
                                            <input id="signupLastName" className="form-control" type="text" placeholder="Last"></input>
                                        </div>
                                    </div>
                                    <br></br>
                                    <input id="signupUsername" className="form-control" type="text" placeholder="Email"></input>
                                    <br></br>
                                    <input id="signupPassword" className="form-control" type="password" placeholder="Password"></input>
                                    <br></br>
                                    <input id="signupConfirm" className="form-control" type="password" placeholder="Confirm"></input>
                                </div>
                                <button onClick={this.onSignUpSubmit} className="form-control btn btn-primary">Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPage;