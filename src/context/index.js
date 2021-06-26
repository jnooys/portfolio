import React, { createContext, useContext } from 'react';

const DispatchProvider = createContext();
const StateProvider = createContext();

export const useStateContext = () => {
  const context = useContext(StateProvider);
  if (!context) {
    throw new Error('Cannot find StateProvider');
  }
  return context;
};

export const useReducerContext = () => {
  const context = useContext(DispatchProvider);
  if (!context) {
    throw new Error('Cannot find DispatchProvider');
  }
  return context;
};

const context = ({ value, children }) => {
  return (
    <StateProvider.Provider value={value.state}>
      <DispatchProvider.Provider value={value.dispatch}>{children}</DispatchProvider.Provider>
    </StateProvider.Provider>
  );
};

export default context;
