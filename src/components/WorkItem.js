import React, { memo, useContext } from 'react';
import { PortfolioContext } from '../context/PortfolioContext';

const WorkItem = memo(({ work }) => {
    
    const { img_path, openModal } = useContext(PortfolioContext);
    
    const { title, subtitle, date, url, thumbnail } = work; 

    const onClickWork = e => {
        e.preventDefault();
        openModal(work);
    } 

    return (
        <>
            <li>
                <img src={img_path+thumbnail} alt={title} />
                <div>
                    <div className="info">
                        <span className="title">{title}</span>
                        <span className="subtitle">{subtitle}</span>
                        <span className="date">{date}</span>
                    </div>
                    <div className="anchor">
                        <a href={url} target="_blank" className="btn link">link</a>
                        <button type="button" className="btn detail" onClick={onClickWork}>details</button>
                    </div>
                </div>
            </li>
        </>
    )    
})

export default WorkItem;