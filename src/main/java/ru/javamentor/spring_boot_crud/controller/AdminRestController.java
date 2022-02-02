package ru.javamentor.spring_boot_crud.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ru.javamentor.spring_boot_crud.model.Role;
import ru.javamentor.spring_boot_crud.model.User;
import ru.javamentor.spring_boot_crud.service.RoleService;
import ru.javamentor.spring_boot_crud.service.UserService;

import java.util.List;
import java.util.Set;

@RestController
@PreAuthorize("hasRole('ADMIN')")
@RequestMapping(path = "/admin")
public class AdminRestController {

    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public AdminRestController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("/users")
    public List<User> getUsers() {
        return userService.findAll();
    }

    @GetMapping("/roles")
    public Set<Role> getRoles() {
        return roleService.findAll();
    }

    @GetMapping("/users/:{id}")
    public User findUser(@PathVariable("id") Long id) {
        return userService.getUserById(id);
    }

    @PostMapping("/users")
    public User create(@RequestBody User user) {
        return userService.create(user);
    }

    @PatchMapping("/users/:{id}")
    public User update(@RequestBody User user) {
        return userService.update(user);
    }

    @DeleteMapping("/users/:{id}")
    public void delete(@PathVariable("id") long id) {
        userService.deleteById(id);
    }

}
