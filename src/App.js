import React, { useEffect, useCallback, useReducer } from 'react';
import './scss/App.scss';
import Header from './components/Header';
import Footer from './components/Footer';
import WorkCategory from './components/WorkCategory';
import Modal from './components/Modal';
import Loading from './components/Loading';
import { PortfolioContext } from './context/PortfolioContext';

const reducer = (state, action)=> {
  switch(action.type) {
    case 'DATA_LOADED':
      return  {
        ...state,
        project: action.project,
        category: action.category,
        active: action.active,
        loading: action.loading
      }
    case 'SET_WORK':
      return {
        ...state,
        work: action.work
      }
    case 'SET_ACTIVE':
      return {
        ...state,
        active: action.active
      }
    default:
      return state;
  }
}

const initialState = {
  project: [],
  category: [],
  active: {},
  work: false,
  loading: true
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const img_path = 'https://rongchyo.cafe24.com/resources/images/thumbnail/';

  const openModal = useCallback((work) => {
    const html = document.querySelector('html');
    const body = document.querySelector('body');
    html.style.overflowY = 'hidden';
    body.style.overflowY = 'scroll';

    dispatch({type:'SET_WORK', work});
  }, []);

  const closeModal = useCallback(() => {
    const html = document.querySelector('html');
    const body = document.querySelector('body');
    html.style.overflowY = '';
    body.style.overflowY = '';

    dispatch({type:'SET_WORK', work: null});
  }, []);

  const clickNav = useCallback((active) => {
    dispatch({type:'SET_ACTIVE', active});
  }, []);
  
  useEffect(() => {
    (async function(){
      const fetchApiData = async (page) => {
        const path = '/portfolio/data/db.json';
        const res = await fetch(path);
        const data = await res.json();
        return data[page];
      }
      
      const projectData = await fetchApiData('project');
      const categoryData = await fetchApiData('category');
      
      dispatch({type: 'DATA_LOADED', project: projectData, category: categoryData, active:categoryData[0], loading: false});
    })();
  }, []);

  const portfolioContext = { img_path, openModal };
  const { project, category, active, work, loading } = state;
  return (
    <>
      <Header active={active} category={category} clickNav={clickNav} />
      <PortfolioContext.Provider value={portfolioContext}>
        <main>
          {loading && <Loading/>}
          { 
            category.filter(cate => !active.id ? cate.id : active.id === cate.id).map(cate => 
              <WorkCategory title={cate.name} project={project.filter(proj => proj.id === cate.id)} key={cate.id} />
            )
          }
        </main>
        <Footer />
        { work && <Modal work={work} closeModal={closeModal} prev={project[Math.max(project.indexOf(work)-1, 0)]} next={project[Math.min(project.indexOf(work)+1, project.length-1)]} /> }
      </PortfolioContext.Provider>
    </>
  );
}

export default App;
