package mk.com.finkicalendar.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    private String location;

    private String laboratory;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    @ManyToMany
    private List<User> participants;

    public Event(
            String title,
            String description,
            String location,
            String laboratory,
            LocalDateTime startTime,
            LocalDateTime endTime
    ) {
        this.title = title;
        this.description = description;
        this.location = location;
        this.laboratory = laboratory;
        this.startTime = startTime;
        this.endTime = endTime;
    }

}
