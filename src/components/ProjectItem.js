import React, { memo, useEffect, useState, useCallback } from 'react';
import { useStateContext, useReducerContext } from '../context';
import { openItem, openModal } from '../reducer';
import Skeleton from './Skeleton';

const ProjectItem = memo(({ item }) => {
  const { imagePath } = useStateContext();
  const [ loading, setLoading ] = useState(true);
  const dispatch = useReducerContext();
  const { title, subtitle, date, url, thumbnail } = item; 
  const imageURL = imagePath+thumbnail;

  useEffect(() => {
    if(!imageURL) return;
    const image = new Image();
    
    image.onload = () => {
      setLoading(false);
    };
    image.src = imageURL;
  }, [imageURL]);

  const onClickItem = useCallback((item) => {
    openModal();
    dispatch(openItem(item));
  }, [dispatch]);

  return (
    <>
      <li>
        {loading ?
          <>
            <Skeleton style={{paddingTop:'70%', marginBottom:'5%'}} />
            <Skeleton height="2em" style={{marginBottom:'2%'}} />
            <Skeleton width="60%" height="1em" />
          </>
          : 
          <>
            <img src={imageURL} alt={title} />
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
          </>
        }
      </li>
    </>
  )    
})

export default ProjectItem;