import React, { useEffect, useState, useCallback } from 'react';
import '../scss/App.scss';
import Header from './Header';
import Footer from './Footer';
import WorkCategory from './WorkCategory';
import Modal from './Modal';
import Loading from './Loading';
import { PortfolioContext } from '../context/PortfolioContext';

const App = () => {
  
  const [project, setProject] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState([]);
  const [active, setActive] = useState({});
  const [work, setWork] = useState(false);

  const img_path = '/images/thumbnail/';
  const html = document.querySelector('html');
  const body = document.querySelector('body');

  const openModal = useCallback((work) => {
    html.style.overflowY = 'hidden';
    body.style.overflowY = 'scroll';

    setWork(work);
  }, []);

  const closeModal = useCallback(() => {
    html.style.overflowY = '';
    body.style.overflowY = '';

    setWork(null);
  }, []);

  const clickNav = useCallback((active) => {
    setActive(active);
  }, []);
  
  useEffect(() => {
    (async function(){

      const fetchApiData = async (page) => {
        const path = '/data/db.json';
        const res = await fetch(path);
        const data = await res.json();
        return data[page];
      }
      
      const projectData = await fetchApiData('project');
      const categoryData = await fetchApiData('category');
      
      setProject(projectData);
      setCategory(categoryData);
      setActive(categoryData[0]);
      setLoading(false);

    })();
  }, []);

  const value = { img_path, category, project, active, work, clickNav, closeModal, openModal };

  return (
    <>
      <PortfolioContext.Provider value={value}>
        <Header />
        <main>
          {loading && <Loading/>}

          { 
            category.filter(cate => !active.id ? cate.id : active.id === cate.id).map(cate => 
              <WorkCategory title={cate.name} project={project.filter(proj => proj.id === cate.id)} key={cate.id} />
            )
          }
        </main>

        <Footer />
        
        { work && <Modal/> }
      </PortfolioContext.Provider>
    </>
  );
}

export default App;
