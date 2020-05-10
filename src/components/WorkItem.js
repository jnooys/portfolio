import React, { memo, useContext } from 'react';
import { PortfolioContext } from '../context/PortfolioContext';

const WorkItem = memo(({ work }) => {
    
    const { img_path, openModal } = useContext(PortfolioContext);

    const onClickWork = e => {
        e.preventDefault();
        openModal(work);
    } 

    return (
        <>
            <li>
                <img src={img_path+work.thumbnail} alt={work.title} />
                <div>
                    <div className="info title"><span>{work.title}</span></div>
                    <div className="info subtitle"><span>{work.subtitle}</span></div>
                    <div className="anchor">
                        <a href={work.url} target="_blank" className="btn link">link</a>
                        <button type="button" className="btn detail" onClick={onClickWork}>details</button>
                    </div>
                </div>
            </li>
        </>
    )    
})

export default WorkItem;