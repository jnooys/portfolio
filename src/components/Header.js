import React, { memo, useContext } from 'react';
import { PortfolioContext } from '../context/PortfolioContext';

const Header = memo(() => {

    const { category, active, clickNav } = useContext(PortfolioContext);
    
    return (
        <>
            <header id="header">
                <div className="container">
                    <h1><a href="/portfolio">seoyoon jung</a></h1>
                    <nav>
                        <ul>
                            {category.map((cate, index) => 
                                <li key={cate.id} className={(!active.id && index === 0 ) || active.id === cate.id ? 'active' : ''}><button type="button" onClick={() => {clickNav(cate)}}>{cate.name}</button></li>
                            )}
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    )
})

export default Header;