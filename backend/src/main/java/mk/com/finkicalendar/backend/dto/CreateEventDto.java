package mk.com.finkicalendar.backend.dto;

import mk.com.finkicalendar.backend.model.Event;

import java.time.LocalDateTime;

public record CreateEventDto(
        String title,
        String description,
        String location,
        String laboratory,
        LocalDateTime startTime,
        LocalDateTime endTime
) {
    public static CreateEventDto from(Event event) {
        return new CreateEventDto(
                event.getTitle(),
                event.getDescription(),
                event.getLocation(),
                event.getLaboratory(),
                event.getStartTime(),
                event.getEndTime()
        );
    }

    public Event toEvent() {
        return new Event(
                title,
                description,
                location,
                laboratory,
                startTime,
                endTime
        );
    }
}
