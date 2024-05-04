import React from 'react';
import './DiseaseDetailPage.css';
import earlyblight1 from './images/earlyblight1.jpg'; 
import earlyblight2 from './images/earlyblight2.jpg';
import earlyblight3 from './images/earlyblight3.jpg';
import earlyblight4 from './images/earlyblight4.jpg';


const EarlyBlightPage = () => {
  return (
    <div className="disease-detail-page">
      <div className="disease-content">
        <div className="disease-images">
          <img src={earlyblight1} alt="Early Blight on Leaves" />
          <img src={earlyblight2} alt="Early Blight on Leaves" />
          <img src={earlyblight3} alt="Early Blight on Leaves" />
          <img src={earlyblight4} alt="Early Blight on Leaves" />
        </div>
        <div className="disease-text">
        <h1>Early Blight Disease</h1>
          <p>Early blight is a common and destructive fungal disease that can significantly impact potato crops 
             The disease is caused by the fungus Alternaria solani and can infect the leaves, stems, and tubers of potato plants.
             Early blight thrives in warm, humid conditions and can spread rapidly through a potato field if left unchecked. 
             Severe infections can lead to significant defoliation, reduced tuber size, and decreased yield and quality 
            </p>
          <h2>Signs of Damage</h2>
          <ul>
            <li>Early blight symptoms include circular, dark brown spots with concentric rings on the leaves.</li>
            <li>Lesions may have a target-like appearance and can lead to leaf yellowing and defoliation.</li>
            <li>Infected plants may exhibit premature death of lower leaves and reduced yield potential.</li>
            <li>In severe cases, lesions can spread to stems and tubers, causing further damage.</li>
            <li>Seedling stems are infected at or just above the soil line.</li>
          </ul>
          <h2>Prevention</h2>
          <ul>
            <li>Practice crop rotation to reduce pathogen buildup in the soil.</li>
            <li>Remove and destroy infected plant debris to prevent disease spread.</li>
            <li>Apply fungicides preventatively or at the first signs of disease.</li>
            <li>Ensure proper plant spacing and ventilation to reduce humidity levels.</li>
            <li>Use disease-resistant potato varieties to minimize susceptibility.</li>
          </ul>
          <h2>Fertilizers and Management Practices</h2>
          <ul>
            <li>Chlorantraniliprole 20% + Thiamethoxam 20% WG for seed treatment.</li>
            <li>Maintain proper storage sanitation.</li>
            <li>Ensure tubers are undamaged and free from soil residues.</li>
            <li>Regularly monitor plants for early blight symptoms and take prompt action.</li>
            <li>Implement weed management practices to reduce disease pressure.</li>
            <li>Chemical controls like Pirimiphos methyl and Acetamiprid for pest management.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EarlyBlightPage;
