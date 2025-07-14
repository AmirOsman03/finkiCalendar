package mk.com.finkicalendar.backend.service.application;

import mk.com.finkicalendar.backend.dto.CreateEventDto;
import mk.com.finkicalendar.backend.model.Event;

import java.util.Optional;

public interface EventApplicationService {

    Event createEvent (CreateEventDto event);

    Event updateEvent (Long id, CreateEventDto event);

}
