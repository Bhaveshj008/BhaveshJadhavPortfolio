
import React from 'react';

const ImageComponent = ({ alt, src }) => {
  return <img src={src} alt={alt} className='custom-image'/>;
};

export default ImageComponent;
