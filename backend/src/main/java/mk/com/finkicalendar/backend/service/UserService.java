package mk.com.finkicalendar.backend.service;

import mk.com.finkicalendar.backend.model.User;
import mk.com.finkicalendar.backend.model.enums.Role;

import java.util.List;
import java.util.Optional;

public interface UserService {

    User register (
            String email,
            String username,
            String password,
            String repeatPassword,
            Role role
    );

    User login(String username, String password);

    Optional<User> findByUsername(String username);

    Optional<User> findById(Long id);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    List<User> findAll();

    User findbyEmail(String email);

}
