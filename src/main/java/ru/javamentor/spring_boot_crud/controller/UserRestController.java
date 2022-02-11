package ru.javamentor.spring_boot_crud.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.javamentor.spring_boot_crud.model.Role;
import ru.javamentor.spring_boot_crud.model.User;
import ru.javamentor.spring_boot_crud.service.UserService;

import java.security.Principal;
import java.util.Map;
import java.util.Set;

@RestController
@PreAuthorize("hasAnyRole('USER', 'ADMIN')")
@RequestMapping("/user")
public class UserRestController {

    private final UserService userService;

    @Autowired
    public UserRestController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/current")
    public User getCurrentUser(Principal principal) {
        if (principal instanceof OAuth2AuthenticationToken) {
            OAuth2AuthenticationToken oAuth2AuthenticationToken = (OAuth2AuthenticationToken)principal;
            OAuth2User oAuth2User = oAuth2AuthenticationToken.getPrincipal();
            Map<String, Object> userAttributes = oAuth2User.getAttributes();
            String email = (String) userAttributes.get("email");
            if (userService.findByEmail(email) == null) {
                User user = new User();
                user.setEmail(email);
                user.setFirstname((String) userAttributes.get("given_name"));
                user.setLastname((String) userAttributes.get("family_name"));
                user.setRoles(Set.of(new Role("ROLE_USER")));
                user.setPassword("password_user_doesnt_know");
                userService.create(user);
            }
            return userService.findByEmail(email);
        } else {
            return userService.findByEmail(principal.getName());
        }
    }
}