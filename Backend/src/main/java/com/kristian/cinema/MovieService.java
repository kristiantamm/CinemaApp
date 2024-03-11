package com.kristian.cinema;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MovieService {
    @Autowired
    private MovieRepository movieRepository;
    public List<Movie> allMovies(){
        return movieRepository.findAll();
    }
    public Optional<Movie> singleMovie(String id){
        return movieRepository.findMovieById(id);
    }

    public List<Movie> getFilteredMovies(List<String> genres, List<String> rating){
        List<Movie> movies = allMovies();
        if(genres == null && rating == null){
            return movies;
        }
        else{
            if(genres == null){
                return movies.stream()
                        .filter(movie -> rating.contains(movie.getRating()))
                        .collect(Collectors.toList());
            }
            else if(rating == null){
                return movies.stream()
                        .filter(movie -> movie.getGenres().stream().anyMatch(genres::contains))
                        .collect(Collectors.toList());
            }
            else {
                return movies.stream()
                        .filter(movie -> movie.getGenres().stream().anyMatch(genres::contains) && rating.contains(movie.getRating()))
                        .collect(Collectors.toList());
            }
        }
    }
}
