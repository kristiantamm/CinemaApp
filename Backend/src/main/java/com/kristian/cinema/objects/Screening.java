package com.kristian.cinema.objects;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "screenings")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Screening {
    @Id
    private String id;
    private List<Integer> occupied;
    private String screening_time;
    private Double ticket_price;
    private ObjectId movieid;
}
