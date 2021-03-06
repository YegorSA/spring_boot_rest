package ru.javamentor.spring_boot_crud.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.javamentor.spring_boot_crud.model.User;
import ru.javamentor.spring_boot_crud.service.UserService;

import java.security.Principal;

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
            return userService.findByEmail(principal.getName());
    }
}