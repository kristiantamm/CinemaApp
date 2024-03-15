import './App.css';
import api from './api/axiosConfig';
import { useState, useEffect } from 'react';
import Layout from './Components/Layout';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/home/Home';
import Header from './Components/header/Header';
import MoviePage from './Pages/moviePage/MoviePage';
import ChooseSeats from './Pages/chooseSeats/ChooseSeats'

function App() {

  const [movies, setMovies] = useState([]);

  const getMovies = async () =>{
    try {
      const response = await api.get("/api/v1/movies");
      console.log(response.data);
      setMovies(response.data);
    } catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home movies={movies} />} />
          <Route path="movie/:id" element={<MoviePage />} />
          <Route path="movie/seats/:id" element={<ChooseSeats />}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;