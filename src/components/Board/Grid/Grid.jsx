import React from 'react';
import css from './Grid.css';
import Card from '../Card/Card.jsx';

const Grid = () => {
  return (
    <div className={css.grid}>
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  );
};

export default Grid;