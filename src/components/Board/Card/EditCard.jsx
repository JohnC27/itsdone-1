import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { operations } from '../../../redux/tasksReducer';
import css from './Card.css';

const EditCard = props => {
  const { date, title, text, tags, id, setEditCard, isNewCard } = props;
  const [formVal, setFormVal] = useState({
    date: date,
    title: title,
    text: text,
    tags: Object.keys(tags).join(' ')
  });

  const dispatch = useDispatch();

  const onFormSubmit = e => {
    e.preventDefault();
    e.persist();

    const newTags = {};

    formVal.tags
      .split(' ')
      .forEach(tagName => {
        newTags[tagName] = tags[tagName] ? tags[tagName] : "";
      });

    if (isNewCard) {
      dispatch(operations.addTask({ ...formVal, tags: newTags }));
    } else {
      dispatch(operations.updateTask({ id: id, ...formVal, tags: newTags }));
    }

    setEditCard({
      id: id,
      isEdit: false
    });
  }

  const onInputChange = (value, type) => {
    if (type === 'tags') {
      if (value.split(' ').length <= 5) {
        const validArr = [];
        value.split(' ').forEach((item) => {
          if (item.length <= 9) {
            validArr.push(true);
          } else {
            validArr.push(false);
          }
        });
        if (validArr.indexOf(false) === -1) {
          setFormVal({ ...formVal, [type]: value });
        }
      }
    } else {
      setFormVal({ ...formVal, [type]: value });
    }
  }

  const closeEditCard = e => {
    if (e.target.closest('button[data-cancelbtn=true]')) {
      setEditCard({
        id: id,
        isEdit: false
      });
    }
  };

  return (
    <div className={css.card}>
      <form onSubmit={onFormSubmit} className={css.card__form}>
        <input type='date' className={css.card__date} onChange={e => onInputChange(e.target.value, 'date')} value={formVal.date} />
        <input type='text' className={css.card__title} onChange={e => onInputChange(e.target.value, 'title')} value={formVal.title} />
        <textarea cols='20' rows='4' className={css.card__edit_note} onChange={e => onInputChange(e.target.value, 'text')} value={formVal.text} />
        <input type="text" onChange={e => onInputChange(e.target.value, 'tags')} value={formVal.tags} />
        <button type='submit' className={css.card__btn}>Сохранить</button>
        <button data-cancelbtn={true} onClick={closeEditCard} type='submit' className={css.card__btn}>Отменить</button>
      </form>
    </div>
  )
};

export default EditCard;
