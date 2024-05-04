import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './footer.css'; 

const FooterComponent = () => {
  return (
    <footer className="bg-light text-center text-lg-start mt-auto">
      <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2024 PlantGuard: Plant Disease Predictor. All rights reserved.
      </div>
    </footer>
  );
};

export default FooterComponent;