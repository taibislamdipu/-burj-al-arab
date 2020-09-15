import React, { useContext } from 'react';

// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';


const Login = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const history = useHistory();
    const location = useLocation()
    const { from } = location.state || { from: { pathname: "/" } };



    const handleGoogleSignIn = () => {

        if (firebase.apps.length === 0) {
            // Initialize Firebase
            firebase.initializeApp(firebaseConfig);
        }

        //Google sign-in provider
        var provider = new firebase.auth.GoogleAuthProvider();

        //Authenticate with Firebase using the Google provider object.
        firebase.auth().signInWithPopup(provider).then(function (result) {

            var { displayName, email } = result.user;
            const singnedInUser = { name: displayName, email }
            setLoggedInUser(singnedInUser);
            history.replace(from);

        }).catch(function (error) {
            // Handle Errors here.
            var errorMessage = error.message;
            console.log(errorMessage);

        });

    }
    return (
        <div>
            <h1>This is Login</h1>
            <button onClick={handleGoogleSignIn}>Google Sign in</button>
        </div>
    );
};

export default Login;