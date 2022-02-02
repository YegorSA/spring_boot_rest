package ru.javamentor.spring_boot_crud.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.javamentor.spring_boot_crud.service.UserService;

import java.security.Principal;

@Controller
@PreAuthorize("hasRole('ADMIN')")
@RequestMapping("/admin")
public class AdminController {

    private final UserService userService;

    @Autowired
    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public String loadAdminPage(ModelMap model, Principal principal) {
        model.addAttribute("currentUser", userService.findByEmail(principal.getName()));
        return "admin/adminPage";
    }
}