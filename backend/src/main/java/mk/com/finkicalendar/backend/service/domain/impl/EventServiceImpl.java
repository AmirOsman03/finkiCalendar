package mk.com.finkicalendar.backend.service.domain.impl;

import mk.com.finkicalendar.backend.model.Event;
import mk.com.finkicalendar.backend.model.User;
import mk.com.finkicalendar.backend.repository.EventRepository;
import mk.com.finkicalendar.backend.service.domain.EventService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;

    public EventServiceImpl(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @Override
    public Event createEvent (Event event) {
        return eventRepository.save(event);
    }

    @Override
    public Event updateEvent (
            Long eventId,
            String title,
            String description,
            String location,
            String laboratory,
            LocalDateTime startTime,
            LocalDateTime endTime
    ) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        event.setTitle(title);
        event.setDescription(description);
        event.setLocation(location);
        event.setLaboratory(laboratory);
        event.setStartTime(startTime);
        event.setEndTime(endTime);

        return eventRepository.save(event);
    }

    @Override
    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }

    @Override
    public List<Event> findAll() {
        return eventRepository.findAll();
    }

    @Override
    public Event addParticipant(Long eventId, User user) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));
        event.getParticipants().add(user);
        return eventRepository.save(event);
    }

    @Override
    public Event removeParticipant(Long eventId, User user) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));
        event.getParticipants().remove(user);
        return eventRepository.save(event);
    }

    @Override
    public Event findById(Long id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));
    }

}
