import React, { lazy, useState } from 'react'

const PlaceImg = ({place, index=0, className='object-cover rounded-2xl', onClick=undefined}) => {

  return (

      <img onClick={onClick} className={className} src={'http://192.168.1.58:4000/uploads/'+place.photos[index]} loading="lazy"/>

  )
}

export default PlaceImg