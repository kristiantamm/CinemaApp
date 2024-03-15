import React from 'react';
import './Hero.css';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';

//Loob nö filmide slideshow
const Hero = ({ movies = [] }) => {
  return (
    <div className='movie-carousel-container'>
        <Carousel>
        {movies.map((movie) => {
            return (
            <Paper key={movie.id}>
                <div className='movie-card-container'>
                    <div className='movie-card'>
                        <div className='movie-detail'>
                            <div className='movie-poster'>
                                <img src={movie.posterUrl} alt=""/>
                            </div>
                            <div className='movie-title'>
                                <h1>{movie.title}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </Paper>
        );
        })}
        </Carousel>
    </div>
  );
};

export default Hero;
