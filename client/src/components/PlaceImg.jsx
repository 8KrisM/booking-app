import React, { lazy, useState } from 'react'

const PlaceImg = ({ place, index = 0, className = 'object-cover rounded-2xl', onClick = undefined }) => {
  const [loaded, setLoaded] = useState(false);

  const handleImageLoad = () => {
    setLoaded(true);
  };

  return (
    <img
      onClick={onClick}
      className={`${className} ${loaded ? '' : 'animate-pulse bg-gray-600 w-full h-full'}`}
      src={'http://192.168.1.58:4000/uploads/' + place.photos[index]}
      loading="lazy"
      onLoad={handleImageLoad}
      alt="place image"
    />
  );
};

export default PlaceImg