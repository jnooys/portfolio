import { createContext } from 'react';

export const PortfolioContext = createContext({
  img_path: '/images/thumbnail/',
  project: [],
  category: [],
  active: {},
  work: {},
  clickNav: () => {},
  openModal: () => {},
  closeModal: () => {}
});