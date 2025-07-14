package mk.com.finkicalendar.backend.web.controllers;

import mk.com.finkicalendar.backend.model.User;
import mk.com.finkicalendar.backend.model.enums.Role;
import mk.com.finkicalendar.backend.service.domain.UserService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> findAll() {
        return userService.findAll();
    }

    @PostMapping("/register")
    public User register(
            @RequestParam String email,
            @RequestParam String username,
            @RequestParam String password,
            @RequestParam String repeatPassword
    ) {
        return userService.register(
                email,
                username,
                password,
                repeatPassword,
                Role.ROLE_STUDENT
        );
    }

    @PostMapping("/login")
    public User login(@RequestParam String username, @RequestParam String password) {
        return userService.login(username, password);
    }

    @GetMapping("/me")
    public User me(OAuth2AuthenticationToken authToken) {
        OAuth2User user = authToken.getPrincipal();
        String email = user.getAttribute("email");
        return userService.findbyEmail(email);
    }

}