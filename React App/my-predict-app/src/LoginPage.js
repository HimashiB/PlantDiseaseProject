import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import './LoginPage.css';
import plantImage from './images/plantImages.jpg';
import googleIcon from './images/googleicon.png';
import app from './firebase-config.js';

const LoginPage = () => {
    const [loginInput, setLoginInput] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const auth = getAuth(app);

    const handleSignIn = async (email) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/ai-engine');
        } catch (error) {
            console.error("Error during sign-in: ", error);
            if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                setError("Incorrect email or password. Please try again.");
            } else if (error.code === 'auth/user-disabled') {
                setError("This account has been disabled.");
            } else {
                setError("Login failed, please try again.");
            }
        }
        setLoading(false);
    };

    const signInWithEmailPassword = async (event) => {
        event.preventDefault();
        setLoading(true);
        handleSignIn(loginInput);
    };

    const signInWithGoogle = async () => {
        setLoading(true);
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            navigate('/ai-engine');
        } catch (error) {
            console.error("Error during Google sign-in: ", error);
            setError("Could not sign in with Google. Please try again.");
        }
        setLoading(false);
    };

    useEffect(() => {
        setError(''); // Clear error on input change
    }, [loginInput, password]);

    return (
        <div className="login-container">
            <div className="login-image-container">
                <img src={plantImage} alt="Plant" className="login-plant-image"/>
            </div>
            <div className="login-form-section">
                <div className="login-form-container">
                {error && <div className="alert alert-danger">{error}</div>}
                    <h2 className="brand-title">Sign In</h2>
                    <p>Welcome Back to PlantGuard!</p>
                    <form onSubmit={signInWithEmailPassword}>
                        <input 
                            type="text"
                            placeholder="Email"
                            value={loginInput}
                            onChange={(e) => setLoginInput(e.target.value)}
                            disabled={loading}
                            data-testid="email-input"
                        />
                        <input 
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                            data-testid="password-input"
                        />
                        <div className="login-actions">
                            <button type="submit" disabled={loading} data-testid="submit-button">{loading ? 'Loading...' : 'SIGN IN'}</button>
                        </div>
                    </form>
                    <div className="separator">OR</div>
                    <button onClick={signInWithGoogle} disabled={loading} className="google-signin" data-testid="google-signin-button">
                        <img src={googleIcon} alt="Sign in with Google" />
                        Sign in With Google
                    </button>
                    <div className="signup-link">
                        New User? <span onClick={() => navigate('/RegPage')}>Create Account</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
