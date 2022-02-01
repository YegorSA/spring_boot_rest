package ru.javamentor.spring_boot_crud.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.javamentor.spring_boot_crud.model.Role;
import ru.javamentor.spring_boot_crud.model.User;
import ru.javamentor.spring_boot_crud.service.RoleService;
import ru.javamentor.spring_boot_crud.service.UserService;

import java.security.Principal;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping(path = "/admin")
public class AdminController {

    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public AdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("/users")
    public List<User> showUsers() {
        return userService.findAll();
    }

    @GetMapping("/roles")
    public Set<Role> getRoles() {
        return roleService.findAll();
    }

    @GetMapping("/users/current")
    public User getCurrentUser(Principal principal) {
        return userService.findByEmail(principal.getName());
    }

    @GetMapping("/:{id}")
    public User findUser(@PathVariable("id") Long id) {
        return userService.getUserById(id);
    }

    @PostMapping
    public User create(@RequestBody User user) {
        return userService.create(user);
    }

    @PatchMapping("/:{id}")
    public User update(@RequestBody User user) {
        return userService.update(user);
    }

    @DeleteMapping("/:{id}")
    public void delete(@PathVariable("id") long id) {
        userService.deleteById(id);
    }

}
