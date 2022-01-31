package ru.javamentor.spring_boot_crud.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import ru.javamentor.spring_boot_crud.model.Role;
import ru.javamentor.spring_boot_crud.model.User;
import ru.javamentor.spring_boot_crud.service.RoleService;
import ru.javamentor.spring_boot_crud.service.UserService;

import java.security.Principal;
import java.util.List;
import java.util.Set;

@RestController
//@Controller
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
    public List<User> showUsers(/*ModelMap model, Principal principal*/) {
//        model.addAttribute("allUsers", userService.findAll());
//        model.addAttribute("currentUser", userService.findByEmail(principal.getName()));
//        model.addAttribute("allRoles", roleService.findAll());
//        model.addAttribute("newUser", new User());
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

/*    @GetMapping
    public String loadAdminPage(ModelMap model, Principal principal) {
        model.addAttribute("allUsers", userService.findAll());
        model.addAttribute("currentUser", userService.findByEmail(principal.getName()));
        model.addAttribute("allRoles", roleService.findAll());
//        model.addAttribute("newUser", new User());
        return "adminPage";
    }*/

    @PostMapping("/create")
    public String create(@ModelAttribute("user") User user) {
        userService.create(user);
        return "redirect:/admin/";
    }

    @PostMapping("/edit")
    @ResponseBody
    public User update(@RequestBody User user) {
        System.out.println(user);
        user.getRoles().stream().map(Role::toString).forEach(System.out::println);
        //userService.update(user);
        return userService.update(user);
    }

    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable("id") long id) {
        userService.deleteById(id);
        return "redirect:/admin";
    }

}
