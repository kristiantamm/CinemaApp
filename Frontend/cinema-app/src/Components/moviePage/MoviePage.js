import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/axiosConfig';

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
    return <div>Loading...</div>;
    }

    return (
    <div>
        <h1>{movie.title}</h1>
    </div>
    );
};

export default MoviePage;