import React, { useEffect, useReducer } from 'react';
import './scss/App.scss';
import { initialState, reducer, loadData } from './reducer';
import PortfolioProvider from './context';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import Modal from './components/Modal';

const App = () => {

  const [ state, dispatch ] = useReducer(reducer, initialState);
  const { item } = state;

  useEffect(() => {
    (async function(){
      const fetchApiData = async (page) => {
        const path = '/portfolio/data/db.json';
        const res = await fetch(path);
        const data = await res.json();
        return data[page];
      }
      
      const originProject = await fetchApiData('project');
      const sortCategory = await fetchApiData('category');
      const sortYear = originProject.reduce((a, v) => {
        const year = v.date.slice(0, 4) * 1;
        if (a.indexOf(year) === -1) {
          a.push(year);
        }
        return a;
      }, []);
      dispatch(loadData({originProject, sortCategory, sortYear, loading: false }));
    })();
  }, []);

  return (
    <PortfolioProvider value={{state, dispatch}}>
      <Header />
      <Main />
      <Footer />
      { item && <Modal /> }
    </PortfolioProvider>
  );
}

export default App;
