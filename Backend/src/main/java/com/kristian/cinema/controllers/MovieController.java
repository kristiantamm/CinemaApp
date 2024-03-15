package com.kristian.cinema.controllers;

import com.kristian.cinema.objects.Movie;
import com.kristian.cinema.services.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/movies")
@CrossOrigin(origins = "*")
public class MovieController {
    @Autowired
    private MovieService movieService;
    @GetMapping
    public ResponseEntity<List<Movie>> getAllMovies(){
        return new ResponseEntity<List<Movie>>(movieService.allMovies(), HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Movie>> getSingleMovie(@PathVariable String id) {
        return new ResponseEntity<Optional<Movie>>(movieService.singleMovie(id), HttpStatus.OK);
    }
    @GetMapping("/filter")
    public ResponseEntity<List<Movie>> getFilteredMovies(
        @RequestParam(required = false) List<String> genres,
        @RequestParam(required = false) List<String> ratings)
    {
        List<Movie> filteredMovies = movieService.getFilteredMovies(genres, ratings);
        return new ResponseEntity(filteredMovies, HttpStatus.OK);
    }
}
