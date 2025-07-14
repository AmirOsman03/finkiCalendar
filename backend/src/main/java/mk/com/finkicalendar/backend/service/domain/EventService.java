package mk.com.finkicalendar.backend.service.domain;

import mk.com.finkicalendar.backend.model.Event;
import mk.com.finkicalendar.backend.model.User;

import java.time.LocalDateTime;
import java.util.List;

public interface EventService {

    Event createEvent (Event event);

    Event updateEvent (Long id, Event event);

    void deleteEvent(Long id);

    List<Event> findAll();

    Event addParticipant(Long eventId, User user);

    Event removeParticipant(Long eventId, User user);

    Event findById(Long id);

}
