import React from 'react';
import './FeaturedMove.css'

export default function FeaturedMove({ item }) {
    console.log(item)

    const moveYear = new Date(item.first_air_date).getFullYear();
    const genresList = item.genres.map((elem) => (elem.name))

    return (
       <section
           className='featured'
           style={{
               backgroundSize: 'cover',
               backgroundPosition: 'center',
               backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
           }}
       >

           <div className='featured--vertical'>
               <div className='featured--horizontal'>
                   <div className='featured--name'>{item.original_name}</div>
                   <div className='featured--info'>
                       <div className='featured--points'>{item.vote_average}</div>
                       <div className='featured--year'>{moveYear}</div>
                       <div className='featured--seasons'>{item.number_of_seasons} Temporadas</div>
                       <div className='featured--description'>{item.overview}</div>

                       <div className='featured--buttons'>
                            <a className='featured--watchbutton' href='/' >Assistir</a>
                           <a className='featured--mylistbutton' href='/' >+ Minha Lista</a>
                       </div>

                       <div className='featured--genres'>
                           <strong>Generos: </strong>{genresList.join(', ')}
                       </div>

                   </div>
               </div>
           </div>

       </section>
    )
}