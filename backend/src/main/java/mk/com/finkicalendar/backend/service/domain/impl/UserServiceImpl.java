package mk.com.finkicalendar.backend.service.domain.impl;

import mk.com.finkicalendar.backend.model.User;
import mk.com.finkicalendar.backend.model.enums.Role;
import mk.com.finkicalendar.backend.model.exceptions.InvalidArgumentsException;
import mk.com.finkicalendar.backend.repository.UserRepository;
import mk.com.finkicalendar.backend.service.domain.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User register(
            String email,
            String username,
            String password,
            String repeatPassword,
            Role role
    ) {
        if (!password.equals(repeatPassword))
            throw new IllegalArgumentException("Passwords do not match!");
        if (userRepository.existsByUsername(username))
            throw new IllegalArgumentException("Username already exists!");
        if (userRepository.existsByEmail(email))
            throw new IllegalArgumentException("Email already exists!");

        return userRepository.save(new User(email, username, passwordEncoder.encode(password)));
    }

    @Override
    public User login(String username, String password) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(InvalidArgumentsException::new);

        if (username == null || username.isEmpty() || password == null || password.isEmpty())
            throw new IllegalArgumentException("Invalid credentials!");
        if (!passwordEncoder.matches(password, user.getPassword()))
            throw new IllegalArgumentException("Invalid credentials!");

        return user;
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    @Override
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User findbyEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow();
    }

}
