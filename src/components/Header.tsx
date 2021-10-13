import React from 'react';

export const Header: React.FC = () => {
  const version = process.env.REACT_APP_VERSION
  return(
    <header>
      <h1>Neander Simulator Version {version}</h1>
    </header>
  );
}