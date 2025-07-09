package mk.com.finkicalendar.backend.dto;

import mk.com.finkicalendar.backend.model.User;
import mk.com.finkicalendar.backend.model.enums.Role;

public record CreateUserDto (
        String email,
        String username,
        String password,
        String repeatPassword,
        Role role
) {
    public User toUser() {
        return new User(email, username, password, role);
    }
}
