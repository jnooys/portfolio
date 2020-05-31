import { createContext } from 'react';

export const PortfolioContext = createContext({
  img_path: '/images/thumbnail/',
  openModal: () => {}
});