package com.kristian.cinema.controllers;

import com.kristian.cinema.objects.Screening;
import com.kristian.cinema.services.ScreeningService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/screenings")
@CrossOrigin(origins = "*")
public class ScreeningController {
    @Autowired
    private ScreeningService screeningService;
    @GetMapping("/{movie_id}")
    public ResponseEntity <Optional<List<Screening>>> getAllScreeningsByMovieId(@PathVariable ObjectId movie_id){
        return new ResponseEntity<>(screeningService.getAllScreeningsByMovieId(movie_id), HttpStatus.OK);
    }
}
