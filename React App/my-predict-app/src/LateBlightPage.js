import React from 'react';
import './DiseaseDetailPage.css';
import lateblight1 from './images/lateblight1.jpg'; 
import lateblight2 from './images/lateblight2.jpg';
import lateblight3 from './images/lateblight3.jpg';
import lateblight4 from './images/lateblight4.jpg';

const LateBlightPage = () => {
  return (
    <div className="disease-detail-page">
      <div className="disease-content">
        <div className="disease-images">
          <img src={lateblight1} alt="Late Blight on Leaves" />
          <img src={lateblight2} alt="Late Blight on Leaves" />
          <img src={lateblight3} alt="Late Blight on Leaves" />
          <img src={lateblight4} alt="Late Blight on Leaves" />
        </div>
        <div className="disease-text">
        <h1>Late Blight Disease</h1>
          <p>Late blight is a devastating disease that can rapidly destroy potato crops. It is caused by the oomycete pathogen Phytophthora infestans. 
            The disease can infect both the leaves and tubers of potato plants, leading to significant crop losses if left unchecked.
            Late blight thrives in cool, moist weather and can devastate a potato crop within a matter of weeks if proper control measures are not taken 
            </p>
          <h2>Signs of Damage</h2>
          <ul>
            <li>LInitially, pale green water-soaked spots (2-10 mm) appear on the leaves.</li>
            <li>Lesions become irregularly shaped, spreading brown with white fluffy sporulation at the margins.</li>
            <li>In dry conditions, lesions dry up, turning dark brown with collapsed tissue.</li>
            <li>Water-soaked dark green to brown lesions on stems with white sporulation.</li>
            <li>Red-brown firm lesions on tubers extending several centimeters into tissue.</li>
          </ul>
          <h2>Prevention</h2>
          <ul>
            <li>Destroy infected tubers and volunteer plants.</li>
            <li>Apply appropriate fungicide to potato hills at emergence.</li>
            <li>Time watering to reduce leaf wetness periods.</li>
            <li>Use disease-free seeds and resistant varieties (e.g., Hill Star).</li>
            <li>Do not overuse fertilisers, especially Nitrogen fertilisers.</li>
          </ul>
          <h2>Fertilizers and Management Practices</h2>
          <ul>
            <li>Chlorantraniliprole 20% + Thiamethoxam 20% WG for seed treatment.</li>
            <li>Maintain proper storage sanitation.</li>
            <li>Ensure tubers are undamaged and free from soil residues.</li>
            <li>Regular monitoring and hand collecting of pests.</li>
            <li>Proper field sanitation and deep ploughing to manage pests.</li>
            <li>Chemical controls like Profenophos and Etofenprox for pest management.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LateBlightPage;
