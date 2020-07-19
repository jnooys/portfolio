import React, { memo, useCallback } from 'react';
import { useStateContext, useReducerContext } from '../context';
import { openItem, openModal } from '../reducer';

const ProjectItem = memo(({ item }) => {
  const { imagePath } = useStateContext();
  const dispatch = useReducerContext();
  const { title, subtitle, date, url, thumbnail } = item; 

  const onClickItem = useCallback((item) => {
    openModal();
    dispatch(openItem(item));
  }, []);

  return (
    <>
      <li>
        <img src={imagePath+thumbnail} alt={title} />
        <div>
          <div className="info">
            <span className="title">{title}</span>
            <span className="subtitle">{subtitle}</span>
            <span className="date">{date}</span>
          </div>
          <div className="anchor">
            <a href={url} target="_blank" rel="noopener noreferrer" className="btn link">link</a>
            <button type="button" className="btn detail" onClick={() => onClickItem(item)}>details</button>
          </div>
        </div>
      </li>
    </>
  )    
})

export default ProjectItem;