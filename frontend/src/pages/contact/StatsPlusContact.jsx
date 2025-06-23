import React from 'react';
import Contact from './Contact';
import StarsCanvas from './Stars';

const StatsPlusContact = () => {
  return (
    <div className="relative z-0 bg-primary">
      <Contact />
      <StarsCanvas />
    </div>
  );
};

export default StatsPlusContact;
