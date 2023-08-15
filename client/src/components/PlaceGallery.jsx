import {useState} from 'react'
import PlaceImg from './PlaceImg'

const PlaceGallery = ({place}) => {
    const [showAllPhotos, setShowAllPhotos] = useState(false)

    if(showAllPhotos){
        return (
            <div className='absolute inset-0 bg-white min-h-screen p-8 grid gap-4'>
                <div>
                    <h2 className='text-2xl mr-40'>Photos of {place.title}</h2>
                    <button className='flex gap-1 right-10 fixed bg-gray-100 hover:bg-gray-300 rounded-2xl p-2 shadow-md top-8' onClick={()=>setShowAllPhotos(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                        </svg>
                        Close</button>
                </div>
                {place?.photos?.length >0 && place.photos.map((photo)=>(
                    <div className='flex justify-center'>
                        <PlaceImg place={{photos: [photo]}} className='max-w-l'/>
                      
                    </div>
                ))}
            </div>
        )
    }

  return (
    <div className='relative lg:w-8/12 xl:w-6/12 mx-auto'>
            <div className='grid gap-2 grid-cols-[2fr_1fr] rounded-2xl overflow-hidden'>
                <div className='cursor-pointer'>
                    {place.photos?.[0] &&(
                        <PlaceImg onClick={()=>setShowAllPhotos(true)} className='aspect-square object-cover' place={place}/>
                    )}
                </div>
                <div className='grid'>
                    {place.photos?.[1] &&(
                        <PlaceImg onClick={()=>setShowAllPhotos(true)} className='aspect-square object-cover' place={{photos: [place.photos[1]]}}/>
                    )}
                    <div className='overflow-hidden'>
                    {place.photos?.[2] &&(
                        <PlaceImg onClick={()=>setShowAllPhotos(true)} className='aspect-square object-cover' place={{photos: [place.photos[2]]}}/>
                    )}
                    </div>
                </div>
            </div>
            <button onClick={()=>setShowAllPhotos(true)} className='flex gap-1 absolute bottom-1 right-1 px-3 py-2 bg-primary rounded-2xl text-white shadow-md'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M4.5 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clipRule="evenodd" />
            </svg>
                Show more</button>
        </div>
  )
}

export default PlaceGallery

