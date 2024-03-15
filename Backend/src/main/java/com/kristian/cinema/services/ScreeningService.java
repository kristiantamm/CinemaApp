package com.kristian.cinema.services;

import com.kristian.cinema.objects.Screening;
import com.kristian.cinema.repos.ScreeningRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ScreeningService {
    @Autowired
    private ScreeningRepository screeningRepository;
    public Optional<List<Screening>> getAllScreeningsByMovieId(ObjectId id){
        return screeningRepository.findAllByMovieid(id);
    }
}
