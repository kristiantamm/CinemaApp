package com.kristian.cinema.repos;

import com.kristian.cinema.objects.Screening;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ScreeningRepository extends MongoRepository<Screening, ObjectId> {
    Optional<List<Screening>> findAllByMovieid(ObjectId id);
}
