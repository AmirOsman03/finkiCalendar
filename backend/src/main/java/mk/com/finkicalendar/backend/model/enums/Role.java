package mk.com.finkicalendar.backend.model.enums;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {

    ROLE_STUDENT, ROLE_PROFESSOR, ROLE_ADMIN;

    @Override
    public String getAuthority() {
        return name();

    }
}
