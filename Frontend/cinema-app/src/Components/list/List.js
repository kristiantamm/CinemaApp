import React from 'react';
import { Link } from 'react-router-dom';
import './List.css';

//Kuvab filmide järjendit blokkidena
const List = ({ movies = [] }) => {
  return (
    <div className='list-container'>
      <div className='list-elements-container'>
        {movies.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id}>
            <div className='list-element'>
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
          </Link>
        ))}
      </div>
    </div>
  );
};

export default List;
