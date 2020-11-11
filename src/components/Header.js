import React, { useCallback, useState } from 'react';
import { useStateContext, useReducerContext} from '../context';
import { toggleCategory, sortProject } from '../reducer';

const Header = () => {
  const { activeCategory, sortCategory, originProject } = useStateContext();
  const [openCategory, setOpenCategory] = useState(false);
  const dispatch  = useReducerContext();

  const onToggleCateogry = useCallback((e) => {
    e.preventDefault();
    if(openCategory) {
      dispatch(sortProject([...originProject]));
      dispatch(toggleCategory(false));
    }
    setOpenCategory(!openCategory);
  }, [dispatch, openCategory, originProject]);
 
  const onClickCategory = useCallback((id, e) => {
    e.preventDefault();
    let category;
    let project;
    console.log(activeCategory);
    if(activeCategory.id === id) {
      category = false;
      project = [...originProject];
    } else {
      category = sortCategory.find(v => v.id === id);
      project = originProject.filter((v) => !id ? v.id : v.id === id).sort((a, b) => a.id < b.id);
    }

    dispatch(sortProject(project));
    dispatch(toggleCategory(category));

    window.scrollTo(0, 0);
  }, [activeCategory, dispatch, originProject, sortCategory]);

  return (
    <>
      <header id="header" className={openCategory ? 'open' : ''}>
        <div className="container">
          <h1><a href="/portfolio">seoyoon jung</a></h1>
          <div className="category_wrap">
            <h2>
              <a href="#n" onClick={onToggleCateogry}>
                <svg width="200" height="200" viewBox="0 0 200 200">
                  <g>
                    <rect x="0" y="0" width="80" height="80"/>
                    <rect x="120" width="80" height="80"/>
                    <rect y="120" width="80" height="80"/>
                    <rect x="120" y="120" width="80" height="80"/>
                  </g>
                </svg>
              </a>
            </h2>
            {
              openCategory && 
              <ul>
                {sortCategory.map((v) => <li key={v.id} className={activeCategory.id === v.id ? 'active': ''}><a href="#n" onClick={(e) => onClickCategory(v.id, e)}>{v.name}</a></li>)}
              </ul>
            }
          </div>
        </div>
      </header>
    </>
  )
};

export default Header;