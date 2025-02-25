import React from 'react'

const GalleryCard = ({artwork}) => {
    return (
        <span className='grid grid-cols-4 gap-4'>
            <div className="glass w-96">
                <figure>
                    <img
                    // src={artwork?.imageurl}
                    alt="car!" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">Life hack</h2>
                    <p>How to park your car at your garage?</p>
                    <div className="card-actions justify-end">
                    <button className="btn btn-primary">Learn now!</button>
                    </div>
                </div>
            </div>
        </span>
    )
}

export default GalleryCard