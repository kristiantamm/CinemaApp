import React, { useState } from 'react';
import './Filter.css';

//Filtreerib žanrite ja vanusepiirangu alusel
const Filter = ({ applyFilters }) => {
    const genresList = ["Action","Adventure","Animation", "Drama", "Comedy"];
    const ageRatingList = ["PG", "R", "PG-13"];

    const [filters, setFilters] = useState({
        genres: [],
        ratings: [],
    });

    const handleGenreChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setFilters((prevFilters) => ({
                ...prevFilters,
                genres: [...prevFilters.genres, value],
            }));
        } else {
            setFilters((prevFilters) => ({
                ...prevFilters,
                genres: prevFilters.genres.filter((genre) => genre !== value),
            }));
        }
    };

    const handleRatingChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setFilters((prevFilters) => ({
                ...prevFilters,
                ratings: [...prevFilters.ratings, value],
            }));
        } else {
            setFilters((prevFilters) => ({
                ...prevFilters,
                ratings: prevFilters.ratings.filter((rating) => rating !== value),
            }));
        }
    };

    const handleApplyFilters = () => {
        applyFilters(filters);
    };

    const [showGenres, setShowGenres] = useState(false);
    const [showRatings, setShowRatings] = useState(false);

    return (
        <div className='filter-component'>
            <div className='filter'>
                <div className='genres-filter'>
                    <label onClick={() => setShowGenres(!showGenres)}>Genres</label>
                    {showGenres &&
                        genresList.map((genre) => (
                            <div key={genre}>
                                <input
                                    type='checkbox'
                                    id={genre}
                                    value={genre}
                                    onChange={handleGenreChange}
                                />
                                <label htmlFor={genre}>{genre}</label>
                            </div>
                        ))}
                </div>
                <div className='rating-filter'>
                    <label onClick={() => setShowRatings(!showRatings)}>Ratings</label>
                    {showRatings &&
                        ageRatingList.map((rating) => (
                            <div key={rating}>
                                <input
                                    type='checkbox'
                                    id={rating}
                                    value={rating}
                                    onChange={handleRatingChange}
                                />
                                <label htmlFor={rating}>{rating}</label>
                            </div>
                        ))}
                </div>
                <button className='button' onClick={handleApplyFilters}>Apply filters</button>
            </div>
        </div>
    );
};

export default Filter;