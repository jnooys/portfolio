import React, { memo} from 'react';
import './style.scss';

const Skeleton = memo(({shape, width = '100%', height, style}) => {
  return (
    <span className={`skeleton ${shape}`} style={{width, height, ...style}}></span>
  )
});

export default Skeleton;
