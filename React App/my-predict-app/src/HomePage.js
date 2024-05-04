import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; 
import lateblight from './images/lateblight.jpg'; 
import earlyblightImage from './images/earlyblight.jpg'; 

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Header Section */}
      <header className="header-section">
        <div className="header-content">
          <h1>PlantGuard</h1>
          <p>We cannot allow your plants to suffer from disorders and various diseases damages. Let’s begin treatment with our plant disease identifier and easy in-app ID tool.</p>
          <Link to="/ai-engine" className="btn custom-btn">Diagnose a plant</Link>
        </div>
      </header>

      {/* Information and Problems Section */}
      <div className="container info-problems-container">
        {/* Information Section */}
        <section>
          <h2>Safeguard Your Crops with the Power of AI</h2>
          <p>Plant diseases can devastate your hard-earned harvest, but no more. Our cutting-edge AI technology is revolutionizing the way you detect and manage crop diseases
          AI technology is revolutionizing the detection and management of plant diseases, which are a major threat to agricultural productivity worldwide. 
            Traditional detection methods are time-consuming and unreliable, leaving farmers vulnerable to significant losses. 
            Our AI plant disease prediction tool uses machine learning and computer vision to accurately identify diseases before they cause widespread damage, allowing for early detection and targeted interventions. 
            This AI-powered solution can transform farms and secure success, ensuring the future of precision agriculture.</p>
        </section>
        <br />
        {/* Problem Cards Section */}
        <section className="container problems-section" id="homePageProblemsSection">
          <div className="row row-cols-1 row-cols-md-2 g-4 justify-content-center">
             {/* Card for Disease 1 */}
             <div className="col" id="late-blight-card">
              <div className="card h-100">
                <img src={lateblight} className="card-img-top" alt="Late Blight" />
                <div className="card-body">
                  <h5 className="card-title">Late Blight</h5>
                  <p className="card-text">A leaf disease is caused by a fungus known as Phytophthora infestans, the blight symptoms are found in both potato stem and tuber.</p>
                  <Link to="/LateBlightPage" className="btn learn-more-btn">Learn More</Link>
                </div>
              </div>
            </div>
            {/* Card for Disease 2 */}
            <div className="col" id="early-blight-card">
              <div className="card h-100">
                <img src={earlyblightImage} className="card-img-top" alt="Early Blight" />
                <div className="card-body">
                  <h5 className="card-title">Early Blight</h5>
                  <p className="card-text">A leaf disease that produces small dark spots on older foliage. This is most common in potato plants.</p>
                  <Link to="/EarlyBlightPage" className="btn learn-more-btn">Learn More</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
