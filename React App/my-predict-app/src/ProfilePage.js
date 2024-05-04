import React, { useState, useEffect, useContext } from 'react';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { AuthContext } from './AuthContext';
import './ProfilePage.css';

const ProfilePage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState(''); 
    const [fullName, setFullName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { currentUser } = useContext(AuthContext);
    const db = getFirestore();

    useEffect(() => {
        if (currentUser) {
            const fetchData = async () => {
                const docRef = doc(db, "users", currentUser.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setUsername(data.username || '');
                    setFullName(data.fullName || '');
                    setEmail(currentUser.email); 
                } else {
                    setError('No profile data found.');
                }
            };
            fetchData().catch(console.error);
        }
    }, [currentUser, db]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        const userDocRef = doc(db, "users", currentUser.uid);

        try {
            await updateDoc(userDocRef, {
                username: username,
                fullName: fullName
            });
            alert('Profile updated successfully.');
        } catch (error) {
            setError('Failed to update profile.');
            console.error("Error updating document: ", error);
        }
        setLoading(false);
    };


    return (
        <div className="profile-container" id="profilePageContainer">
            <h2 id="profilePageTitle">User Profile</h2>
            {error && <div className="alert alert-danger" id="profilePageError">{error}</div>}
            <form onSubmit={handleUpdate} id="profilePageForm">
                <div className="mb-3" id="profilePageUsername">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" id="usernameInput" value={username} onChange={e => setUsername(e.target.value)} disabled={loading} />
                </div>
                <div className="mb-3" id="profilePageFullName">
                    <label htmlFor="fullName" className="form-label">Full Name</label>
                    <input type="text" className="form-control" id="fullNameInput" value={fullName} onChange={e => setFullName(e.target.value)} disabled={loading} />
                </div>
                <div className="mb-3" id="profilePageEmail">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="emailInput" value={email} readOnly />
                </div>
                <button type="submit" className="btn btn-primary" id="profilePageUpdateBtn" disabled={loading}>Update Profile</button>
            </form>
        </div>
    );
};

export default ProfilePage;
