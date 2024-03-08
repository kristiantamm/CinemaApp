import React from 'react';
import Hero from '../hero/Hero';
import List from '../list/List';

const Home = ({movies}) => {
  return (
    <div>
        <Hero movies = {movies}/>
        <List movies = {movies}/>
    </div>
  )
}

export default Home