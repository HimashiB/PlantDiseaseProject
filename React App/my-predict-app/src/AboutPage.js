import React from 'react';
import './AboutPage.css'; 
import aboutUsImage from './images/aboutUsImage.jpg'; 
import 'bootstrap/dist/css/bootstrap.min.css';

function AboutPage() {
  return (
    <div className="container py-5" id="aboutContainer">
      <div className="row align-items-start"> 
        {/* Left side: About content */}
        <div className="col-md-8" id="aboutContent">
          <h2 id="aboutStoryTitle">Our Story</h2>
          <div id="titleLine"></div>
          <p id="aboutStoryText">
          Welcome to PlantGuard, where our journey began with a simple goal: to empower those who nurture the earth. 
          Born from a passion for sustainable agriculture and the shared experiences of farmers, agricultural experts, and plant enthusiasts, 
          PlantGuard was created to be a guardian for your crops and gardens. Our platform bridges the gap between traditional 
          farming wisdom and modern technology, providing users with a powerful tool to detect and manage plant health effectively.
          </p>
          <h2 id="aboutMissionTitle">Our Mission</h2>
          <div id="titleLine"></div>
          <p id="aboutMissionText">
          Our mission at PlantGuard is to revolutionize plant care by equipping farmers, government agriculture departments, and
          plant lovers with advanced tools for early disease detection and management. We are committed to enhancing productivity, 
          reducing losses due to plant diseases, and promoting environmentally friendly farming practices.
          </p>
          <h2 id="aboutVisionTitle">Our Vision</h2>
          <div id="titleLine"></div>
          <p id="aboutVisionText">
          At PlantGuard, our vision is a thriving world where every plant benefits from cutting-edge technology and sustainable care. 
          We strive to be the foremost innovator in plant health, fostering a global community united in nurturing the vitality of plants 
          everywhere.
          </p>
          <div className="row mt-5">
        <div className="col">
          <h2>Contact Us</h2>
          <p>Email: customerservice@plantguard.com</p>
          <p>Address: B21,Pemaduwa,Kandy,Sri Lanka</p>
          <p>Phone: (081) 242 1801</p>
        </div>
      </div>
        </div>
        {/* Right side: image */}
        <div className="col-md-4" id="aboutImageContainer">
          <img src={aboutUsImage} alt="Company" className="img-fluid" id="companyImage"/>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;