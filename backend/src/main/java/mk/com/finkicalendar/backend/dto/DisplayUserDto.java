package mk.com.finkicalendar.backend.dto;

import mk.com.finkicalendar.backend.model.enums.Role;

public record DisplayUserDto (
       String username,
       String name,
       String surname,
       String email,
       Role role
) {}
