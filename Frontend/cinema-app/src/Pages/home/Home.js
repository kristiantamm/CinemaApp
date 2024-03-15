import React, { useState } from 'react';
import Hero from '../../Components/hero/Hero';
import List from '../../Components/list/List';
import Filter from '../../Components/filter/Filter';
import axios from 'axios';

const Home = ({ movies, setMovies }) => {
  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [filtersApplied, setFiltersApplied] = useState(false);

  const applyFilters = async (filters) => {
    try {
      const params = new URLSearchParams();
      for (const key in filters) {
        if (Array.isArray(filters[key])) {
          filters[key].forEach((value) => {
            params.append(key, value);
          });
        }
      }
      const response = await axios.get('http://localhost:8080/api/v1/movies/filter', { params });
      setFilteredMovies(response.data);
      setFiltersApplied(true);
    } catch (error) {
      console.error('Error fetching filtered movies:', error);
    }
  };

  return (
    <div>
      <Hero movies={movies} />
      <Filter applyFilters={applyFilters} />
      {filtersApplied ? (
        <List movies={filteredMovies} />
      ) : (
        <List movies={movies} />
      )}
    </div>
  );
};

export default Home;