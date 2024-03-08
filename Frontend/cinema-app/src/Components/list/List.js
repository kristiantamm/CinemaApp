import React from 'react';
import './List.css';

const List = ({ movies = [] }) => {
  return (
    <div className='list-container'>
      <div className='list-elements-container'>
        {movies.map((movie) => (
          <div className='list-element' key={movie.id}>
            <div className='list-image'>
              <img src={movie.posterUrl} alt=''width="50%" height="auto" />
            </div>
            <div className='list-details'>
              <h1>{movie.title}</h1>
              <h3>{movie.genres.join(', ')}</h3>
              <h3>{movie.year}</h3>
              <div className='list-rating-runtime'>
                <h3>{movie.rating}</h3>
                <h4>{movie.runtime} mins</h4>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;