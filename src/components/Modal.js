import React, { useState, useEffect, useCallback } from 'react';
import { useStateContext, useReducerContext} from '../context';
import {openItem, closeModal, closeItem } from '../reducer';
import Skeleton from './Skeleton';

const Modal = () => {

  const { item, imagePath, sortedProject } = useStateContext();
  const dispatch = useReducerContext();
  const [ loading, setLoading ] = useState(true);
  const { title, subtitle, url, mainDev, info, images, pages, date } = item;

  useEffect(() => {
    setLoading(true);
    if(!images) return;

    const imagePromise = images.map((v) => new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        resolve(true);
      };
      image.onerror = () => {
        reject();
      };
      image.src = imagePath+v;
    }));

    Promise.all(imagePromise).then(() => {
      setLoading(false);
    });
    
  }, [imagePath, images]);

  const onClickClose = useCallback(() => {
    closeModal();
    dispatch(closeItem());
  }, [dispatch]);

  const onClickMove = useCallback((e) => {
    const buttonType = e.target.dataset.move;
    const nowIndex = sortedProject.indexOf(item);
    const lastIndex = sortedProject.length - 1;
    let moveIndex;
    if(buttonType === 'prev') {
      moveIndex = nowIndex === 0 ? lastIndex : nowIndex - 1;
    } else if(buttonType === 'next') {
      moveIndex = nowIndex === lastIndex ? 0 : nowIndex + 1;
    }
    dispatch(openItem(sortedProject[moveIndex]));
  }, [sortedProject, item, dispatch]);

  return (
    <>
      <article id="modal">
        <span className="dim" onClick={onClickClose}></span>
        <div className="modal_popup">
          <div>
            <header>
              <h1>{title}</h1>
              <span className="subtitle">{subtitle}</span>
              <span className="date">{date}</span>
            </header>
            <section>
              <a href={url} target="_blank" className="link">{mainDev ? url : 'HTML페이지 바로가기'}</a>
              {
                pages && 
                <ul className="page">
                  {
                    pages.map((page, index) => <li key={`page${index}`}><a href={page.url} target="_blank">{page.name}</a></li>)
                  }
                </ul>
              }
              <ul className="info">
              {
                info.map((info, index) => <li key={`info${index}`}>{info}</li>)
              }
              </ul>
              <ul className="img">
              {
                loading ? 
                <>
                  <li><Skeleton style={{paddingTop:'120%'}} /></li>
                  <li><Skeleton style={{paddingTop:'120%'}} /></li>
                  <li><Skeleton style={{paddingTop:'120%'}} /></li>
                </>
                : 
                images.map((image, index) => <li key={`image${index}`}><span className="screenshot"><img src={imagePath+image} alt={`${title} ${subtitle}`} /></span></li>)                
              }
              </ul>
            </section>
          </div>
          <button type="button" className="close" onClick={onClickClose}><span></span><span></span></button>
        </div>
        <button type="button" className="move prev" data-move="prev" onClick={onClickMove}><span></span><span></span></button>
        <button type="button" className="move next" data-move="next" onClick={onClickMove}><span></span><span></span></button>
      </article>
    </>
  )
};

export default Modal;