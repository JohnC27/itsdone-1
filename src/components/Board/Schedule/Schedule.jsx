import React from 'react';
import Block from './Block/Block.jsx';
import css from './Schedule.css';

const Schedule = props => {
  const { cards, blocks, onCardEdit } = props;

  return (
    <div className={css.schedule}>
      {blocks.map((block, i) => <Block onCardEdit={onCardEdit} cards={cards} key={i} title={block.title} />)}
    </div>
  );
};

export default Schedule;