package ru.javamentor.spring_boot_crud.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import ru.javamentor.spring_boot_crud.service.UserService;

@Controller
@PreAuthorize("hasAnyRole('USER', 'ADMIN')")
public class UserController {

	private final UserService userService;

	@Autowired
	public UserController(UserService userService) {
		this.userService = userService;
	}

	@GetMapping("/user")
	public String redirect() {
		return "user/userPage";
	}

}