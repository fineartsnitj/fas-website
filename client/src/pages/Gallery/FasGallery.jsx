import React from 'react'
import GalleryCard from './GalleryCard'

const arr = [1, 2, 3, 4]
const FasGallery = () => {
  return (
    <div>
        {arr.map((item, index) => (
          
          <GalleryCard key={index}></GalleryCard>
        
      ))}
    </div>
  )
}

export default FasGallery