package mk.com.finkicalendar.backend.service.application.impl;

import mk.com.finkicalendar.backend.dto.CreateEventDto;
import mk.com.finkicalendar.backend.model.Event;
import mk.com.finkicalendar.backend.service.application.EventApplicationService;
import mk.com.finkicalendar.backend.service.domain.EventService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EventApplicationServiceImpl implements EventApplicationService {

    private final EventService eventService;

    public EventApplicationServiceImpl(EventService eventService) {
        this.eventService = eventService;
    }

    @Override
    public Event createEvent(CreateEventDto event) {
        return eventService.createEvent(event.toEvent());
    }

    @Override
    public Event updateEvent(Long id, CreateEventDto event) {
        return eventService.updateEvent(id, event.toEvent());
    }

}
