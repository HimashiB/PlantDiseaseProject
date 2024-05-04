//PredictionComponent.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext.js'; 
import axios from 'axios';
import { getFirestore, addDoc, collection } from 'firebase/firestore';
import './PredictionComponent.css';

const PredictionComponent = () => {
    const [file, setFile] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState('');
    const [prediction, setPrediction] = useState('');
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const onFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) { 
            setFile(selectedFile);
            setImagePreviewUrl(URL.createObjectURL(selectedFile));
        }
    };

    const savePredictionToFirestore = async (prediction) => {
        if (!currentUser) {
            console.error('No user logged in');
            return;
        }

        const db = getFirestore();
        const predictionDoc = {
            userId: currentUser.uid,
            prediction: prediction,
            timestamp: new Date()
        };

        try {
            await addDoc(collection(db, "predictions"), predictionDoc);
            console.log('Prediction saved successfully');
        } catch (error) {
            console.error('Error saving prediction:', error);
        }
    };

    const onFileUpload = async () => {
        if (!currentUser) {
            alert('You must be logged in to make a prediction.');
            navigate('/LoginPage');
            return;
        }
    
        if (!file) {
            alert('Please select an image to upload.');
            return;
        }
    
        const formData = new FormData();
        formData.append('image', file);
    
        try {
            const response = await axios.post('http://localhost:5000/predict', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            
            if (response.status === 200 && response.data.result !== 'Uncertain') {
                const predictionResult = `Prediction: ${response.data.result}`;
                setPrediction(predictionResult);
                savePredictionToFirestore(predictionResult);
            } else if (response.data.result === 'Uncertain') {
                setPrediction('The image could not be confidently classified. Please try a different image.');
            } else {
                setPrediction('The system is currently loading, please wait a moment and try again.');
            }
        } catch (error) {
            console.error('Error during prediction:', error);
            setPrediction(`Failed to predict. ${error.response?.data.error || error.message}`);
        }
    };

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-md-6">
                    {/* Left side: Upload and Prediction */}
                    <h1>Plant Disease Prediction</h1>
                    <br />
                    <div className="mb-3">
                        <input type="file" className="form-control" name="fileInput" onChange={onFileChange} />
                        {imagePreviewUrl && (
                            <img src={imagePreviewUrl} alt="Preview" className="img-fluid my-3" />
                        )}
                    </div>
                     <button className="btn btn-success btn-lg" id="predictButton" onClick={onFileUpload}>
                        Predict
                    </button>
                    {prediction && <div className="alert alert-info mt-3">{prediction}</div>}
                </div>
                <div className="col-md-6 card-container" id="aiEngineInfoSection">
                    {/* Right side: Static Content */}
                    <div className="card" id="aiEngineCard">
                        <div className="card-body" id="aiEngineCardBody">
                            <h5 className="card-title" id="aiEngineCardTitle">Why is Plant Disease Detection Important?</h5>
                            <p className="card-text" id="aiEngineCardText">
                                Keeping plants healthy is vital for our environment and food supply. Early detection of plant diseases prevents 
                                widespread damage, saving millions of crops and maintaining lush, green gardens. This not only ensures abundant food production 
                                but also protects the natural beauty of our surroundings.
                            </p>
                            <p className="card-text" id="aiEngineCardText2">
                                By spotting and managing plant diseases swiftly, 
                                we safeguard our plants and help maintain ecological balance. Let’s commit to protecting our green friends by staying vigilant against plant diseases!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PredictionComponent;