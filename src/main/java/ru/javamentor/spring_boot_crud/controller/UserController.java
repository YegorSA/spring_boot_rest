package ru.javamentor.spring_boot_crud.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import ru.javamentor.spring_boot_crud.model.Role;
import ru.javamentor.spring_boot_crud.service.UserService;

import java.security.Principal;
import java.util.Objects;

@Controller
public class UserController {

	private final UserService userService;

	@Autowired
	public UserController(UserService userService) {
		this.userService = userService;
	}

	@RequestMapping(value = "login", method = RequestMethod.GET)
	public String loginPage() {
		return "common/login";
	}

	@RequestMapping(value = "login?logout", method = RequestMethod.GET)
	public String logout() {
		return "common/login";
	}

	@GetMapping("/admin")
	public String loadAdminPage(ModelMap model, Principal principal) {
		model.addAttribute("currentUser", userService.findByEmail(principal.getName()));
		return "admin/adminPage";
	}

	@GetMapping("/user")
	public String redirect(Principal principal) {
		long id = userService.findByEmail(principal.getName()).getId();
		return "redirect:/user/" + id;
	}

	@GetMapping("/user/{id}")
	public String showUser(@PathVariable("id") long id, ModelMap model, Principal principal) {
		if (Objects.equals(userService.getUserById(id).getUsername(), principal.getName()) || userService.findByEmail(principal.getName()).getRoles().stream().map(Role::getName).anyMatch(a -> a.equals("ROLE_ADMIN"))) {
			model.addAttribute("user", userService.getUserById(id));
			return "user/userPage";
		} else {
			return "user/accessDeniedPage";
		}
	}
}