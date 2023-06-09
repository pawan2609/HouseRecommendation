// src/components/Plot.js
import React from 'react';
import '../styles/Plot.css';

const Plot = ({ service, assignService, addHouse }) => {
  const handleAssignService = (e) => {
    assignService(e.target.value);
  };

  const handleAddHouse = () => {
    const label = prompt('Enter house label:');
    if (label) {
      addHouse(label);
    }
  };

  return (
    <div className="plot">
      {service === 'House' && <div className="house"></div>}
      {service === 'Restaurant' && <div className="restaurant"></div>}
      {service === 'Gym' && <div className="gym"></div>}
      {service === 'Hospital' && <div className="hospital"></div>}
      {service === null && (
        <div>
          <button onClick={handleAssignService.bind(null, 'Restaurant')}>R</button>
          <button onClick={handleAssignService.bind(null, 'Gym')}>G</button>
          <button onClick={handleAssignService.bind(null, 'Hospital')}>H</button>
          <button onClick={handleAddHouse}>Add House</button>
        </div>
      )}
    </div>
  );
};

export default Plot;
