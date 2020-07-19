import React, { memo } from 'react';
import ProjectItem from './ProjectItem';

const ProjectList = memo(({ title, project }) => {
  return (
    <article>
      <div className="container">
        <h1>{title}</h1>
        <ul>
          {
            project.map((item, index) => 
              <ProjectItem item={item} key={item.id+index} />
            )
          }
        </ul>
      </div>
    </article>
  )
}, (prevProps, nextProps) => prevProps.title === nextProps.title);

export default ProjectList;