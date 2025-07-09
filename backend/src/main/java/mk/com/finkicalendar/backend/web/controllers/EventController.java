package mk.com.finkicalendar.backend.web.controllers;

import mk.com.finkicalendar.backend.model.Event;
import mk.com.finkicalendar.backend.model.User;
import mk.com.finkicalendar.backend.service.EventService;
import mk.com.finkicalendar.backend.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;
    private final UserService userService;

    public EventController(EventService eventService, UserService userService) {
        this.eventService = eventService;
        this.userService = userService;
    }

    @PostMapping("/create")
    public Event createEvent(
            @RequestParam String title,
            @RequestParam String description,
            @RequestParam String location,
            @RequestParam String laboratory,
            @RequestParam String start,
            @RequestParam String end
    ) {
        return eventService.createEvent(
                title,
                description,
                location,
                laboratory,
                LocalDateTime.parse(start),
                LocalDateTime.parse(end)
        );
    }

    @PutMapping("/edit/{eventId}")
    public Event editEvent(
            @PathVariable Long eventId,
            @RequestParam String title,
            @RequestParam String description,
            @RequestParam String location,
            @RequestParam String laboratory,
            @RequestParam String start,
            @RequestParam String end
    ) {
        return eventService.updateEvent(
                eventId,
                title,
                description,
                location,
                laboratory,
                LocalDateTime.parse(start),
                LocalDateTime.parse(end)
        );
    }

    @DeleteMapping("/delete/{eventId}")
    public void deleteEvent(@PathVariable Long eventId) {
        eventService.deleteEvent(eventId);
    }

    @GetMapping
    public List<Event> findAll() {
        return eventService.findAll();
    }

    @GetMapping("/{id}")
    public Event findById(@PathVariable Long id) {
        return eventService.findById(id);
    }

    @PostMapping("/{eventId}/signUp")
    public Event addParticipant(@PathVariable Long eventId, Principal principal) {
        User user = userService.findByUsername(principal.getName()).orElseThrow();
        return eventService.addParticipant(eventId, user);
    }

    @PostMapping("/{eventId}/leave")
    public Event removeParticipant(@PathVariable Long eventId, Principal principal) {
        User user = userService.findByUsername(principal.getName()).orElseThrow();
        return eventService.removeParticipant(eventId, user);
    }

}
