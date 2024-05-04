import React, { useState, useEffect, useContext } from 'react';
import { getFirestore, query, collection, where, orderBy, getDocs } from 'firebase/firestore';
import { AuthContext } from './AuthContext.js';
import './PredictionHistory.css';

const PredictionHistory = () => {
    const [predictions, setPredictions] = useState([]);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchPredictions = async () => {
            if (currentUser) {
                const db = getFirestore();
                const q = query(
                    collection(db, "predictions"),
                    where("userId", "==", currentUser.uid),
                    orderBy("timestamp", "desc") // the newest predictions first
                );

                const querySnapshot = await getDocs(q);
                const predictionsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setPredictions(predictionsData);
            }
        };

        fetchPredictions();
    }, [currentUser]);

    return (
        <div className="prediction-history-container">
            <h2>Prediction History</h2>
            {predictions.length > 0 ? (
                <table className="table table-striped" id="predictionHistoryTable">
                    <thead>
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Prediction</th>
                        </tr>
                    </thead>
                    <tbody>
                        {predictions.map((prediction) => (
                            <tr key={prediction.id}>
                                <td>{prediction.timestamp.toDate().toLocaleString()}</td>
                                <td>{prediction.prediction}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No predictions history available.</p>
            )}
        </div>
    );
};

export default PredictionHistory;