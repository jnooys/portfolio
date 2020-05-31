import React, { memo, useContext } from 'react';
import { PortfolioContext } from '../context/PortfolioContext';

const Modal = memo(({ work, prev, next, closeModal }) => {

  const { img_path, openModal }  = useContext(PortfolioContext);
  const { title, subtitle, url, mainDev, info, images, pages, date } = work;

  return (
    <>
      <article id="modal">
        <span className="dim" onClick={closeModal}></span>
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
                images.map((image, index) => <li key={`image${index}`}><span><img src={img_path+image} alt={`${title} ${subtitle}`} /></span></li>)
              }
              </ul>
            </section>
          </div>
          <button type="button" className="close" onClick={closeModal}><span></span><span></span></button>
        </div>
        <button type="button" className="move prev" onClick={()=> openModal(prev)}><span></span><span></span></button>
        <button type="button" className="move next" onClick={()=> openModal(next)}><span></span><span></span></button>
      </article>
    </>
  )
})

export default Modal;