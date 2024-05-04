import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import app from './firebase-config'; // Import the already initialized app
import 'bootstrap/dist/css/bootstrap.min.css';
import './RegPage.css';
import plantImages from './images/plantReg.png';
import googleIcon from './images/googleicon.png';

const db = getFirestore(app);

const RegPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState(''); // State to hold the error message

    const navigate = useNavigate(); 
    const auth = getAuth();

    // Function to check password complexity
    const isPasswordValid = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const registerWithEmailPassword = (event) => {
        event.preventDefault(); 
        if (!isPasswordValid(password)) {
            setError("Password must be at least 8 characters long, include a number, a symbol, and both lower and uppercase letters.");
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Registration successful
                console.log("Registration successful: ", userCredential);
                const userDocRef = doc(db, "users", userCredential.user.uid);
                return setDoc(userDocRef, {
                    fullName: fullName,
                    username: username,
                    email: email 
                });
            })
            .then(() => {
                signOut(auth).then(() => {
                    console.log("User signed out after registration");
                    navigate('/LoginPage'); // Redirect to login page on successful registration
                });
            })
            .catch((error) => {
                console.error("Error during registration: ", error);
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        setError('This email address is already in use.');
                        break;
                    case 'auth/invalid-email':
                        setError('The email address entered is invalid.');
                        break;
                    case 'auth/weak-password':
                        setError('The password is too weak. Please use a stronger password.');
                        break;
                    default:
                        setError('Failed to register. Please try again.');
                }
            });
    };

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log("Google sign-in successful: ", result);
                const user = result.user;
    
                const userDocRef = doc(db, "users", user.uid);
                return setDoc(userDocRef, {
                    fullName: user.displayName, 
                    username: user.displayName, 
                    email: user.email
                }, { merge: true });
            })
            .then(() => {
                // Sign out the user after updating/creating the Firestore document
                return signOut(auth);
            })
            .then(() => {
                console.log("User signed out after Google sign-in");
                navigate('/LoginPage'); // Redirect to login page
            })
            .catch((error) => {
                console.error("Error during Google sign-in: ", error);
                switch (error.code) {
                    case 'auth/account-exists-with-different-credential':
                        setError('An account already exists with the same email address but different sign-in credentials.');
                        break;
                    case 'auth/popup-closed-by-user':
                        setError('The sign-in popup was closed before completion. Please try again.');
                        break;
                    default:
                        setError('Google sign-in failed. Please try again.');
                }
            });
    };


    return (
        <div className="reg-page-container">
            <div className="reg-image-section">
                <img src={plantImages} alt="Plant" className="reg-plant-image"/>
            </div>
            <div className="reg-form-section">
                <div className="reg-form-container">
                {error && <div className="alert alert-danger">{error}</div>}
                    <h2 className="reg-brand-title">Create Account</h2>
                    <form onSubmit={registerWithEmailPassword}>
                        <div className="reg-mb-3">
                            <label htmlFor="username" className="reg-form-label">Username</label>
                            <input type="text" className="reg-form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="reg-mb-3">
                            <label htmlFor="fullName" className="reg-form-label">Full Name</label>
                            <input type="text" className="reg-form-control" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                        </div>
                        <div className="reg-mb-3">
                            <label htmlFor="email" className="reg-form-label">Email</label>
                            <input type="email" className="reg-form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="reg-mb-3">
                            <label htmlFor="password" className="reg-form-label">Password</label>
                            <input type="password" className="reg-form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="reg-actions">
                            <button type="submit" className="reg-btn reg-btn-primary" data-testid="register-button">SIGN UP</button>
                        </div>
                    </form>
                    <div className="separator">OR</div>
                    <button onClick={signInWithGoogle} className="google-signin">
                        <img src={googleIcon} alt="Sign Up with Google" />
                        Sign Up With Google
                    </button>
                    <div className="signup-link">
                        Already Registered? <span onClick={() => navigate('/LoginPage')}>Sign In</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegPage;
