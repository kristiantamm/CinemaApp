import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/axiosConfig';
import Trailer from '../../Components/trailer/Trailer';
import './MoviePage.css';
import { Link } from 'react-router-dom';

const MoviePage = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await api.get(`/api/v1/movies/${id}`);
                setMovie(response.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchMovie();
    }, [id]);

    if (!movie) {
        return <div className='loading'>Loading...</div>;
    }


    return (
        <div className='movie-page'>
            <div className='trailer-details'>
                <div className='trailer'>
                    <Trailer title={movie.title} />
                </div>
                <div className='movie-details'>
                    <h1 className='movie-title'>{movie.title}</h1>
                    <h4 className='movie-genres'>{movie.genres.join(', ')}</h4>
                    <p className='movie-year'>{movie.year}</p>
                    <p className='movie-runtime'>{movie.runtime} mins</p>
                    <p className='movie-director'>Director: {movie.director}</p>
                    <p className='movie-actors'>Actors: {movie.actors.join(', ')}</p>
                    <h4 className='movie-rating'>{movie.rating}</h4>
                    <Link to={`/movie/seats/${movie.id}`} key={movie.id}>
                    <button className='choose-seat-button'>Choose seats</button>
                    </Link>
                </div>
            </div>
            <div className='plot-poster'>
                <p className='movie-plot'>{movie.plot}</p>
                <img src={movie.posterUrl}/>
            </div>
        </div>
    );
};

export default MoviePage;
