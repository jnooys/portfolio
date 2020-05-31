import React, { memo } from 'react';
import WorkItem from './WorkItem';

const WorkCategory = memo(({ title, project }) => {
  return (
    <article>
      <div className="container">
        <h1>{title}</h1>
        <ul>
          {
            project.map((work, index) => 
              <WorkItem work={work} key={work.id+index} />
            )
          }
        </ul>
      </div>
    </article>
  )
}, (prevProps, nextProps) => prevProps.title === nextProps.title)

export default WorkCategory;