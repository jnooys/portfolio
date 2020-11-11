import React from 'react';
import { useStateContext } from '../context';
import ProjectList from './ProjectList';

const Main = () => {
  const { sortedProject, sortYear, sortCategory, activeCategory } = useStateContext();
  
  return (
    <main>
      { 
        activeCategory ?
        sortCategory.filter(v => !activeCategory.id ? v.id : v.id === activeCategory.id).map((category) => 
        <ProjectList title={category.name}
          project={sortedProject.filter(v => v.id === category.id)}
          key={category.id}
        /> 
        )
        : sortYear.map(year =>
          <ProjectList title={year} 
            project={sortedProject.filter(proj => proj.date.slice(0, 4) * 1 === year)} 
            key={year} />
        )
      }
    </main>
  )
}

export default Main;