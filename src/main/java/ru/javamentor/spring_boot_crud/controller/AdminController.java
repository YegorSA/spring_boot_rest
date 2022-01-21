package ru.javamentor.spring_boot_crud.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import ru.javamentor.spring_boot_crud.model.User;
import ru.javamentor.spring_boot_crud.service.RoleService;
import ru.javamentor.spring_boot_crud.service.UserService;

import java.security.Principal;
import java.util.List;

//@Controller
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

    @GetMapping
    public List<User> showUsers(ModelMap model, Principal principal) {
        model.addAttribute("allUsers", userService.findAll());
        model.addAttribute("currentUser", userService.findByEmail(principal.getName()));
        model.addAttribute("allRoles", roleService.findAll());
        model.addAttribute("newUser", new User());
        return userService.findAll();

    }

    @PostMapping("/create")
    public String create(@ModelAttribute("user") User user) {
        userService.create(user);
        return "redirect:/admin/";
    }

    @PatchMapping("/{id}/edit")
    public String update(@ModelAttribute("user") User user) {
        userService.update(user);
        return "redirect:/admin";
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable("id") long id) {
        userService.deleteById(id);
        return "redirect:/admin";
    }

}
