package com.kristian.cinema.objects;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "movies")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Movie {
    @Id
    private String id;
    private String title;
    private String year;
    private String runtime;
    private List<String> genres;
    private String director;
    private List<String> actors;
    private String plot;
    private String posterUrl;
    private String rating;
}
