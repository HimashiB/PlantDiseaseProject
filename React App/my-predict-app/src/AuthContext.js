import React, { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import app from './firebase-config';  

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const db = getFirestore(app);  

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userDocRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    setCurrentUser({ ...user, ...userDoc.data() });
                } else {
                    setCurrentUser(user);
                }
            } else {
                setCurrentUser(null);
            }
            setLoading(false);
        });
        return unsubscribe; // Unsubscribe on cleanup
    }, [db]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
