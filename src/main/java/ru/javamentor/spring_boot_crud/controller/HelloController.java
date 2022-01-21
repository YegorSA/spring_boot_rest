package ru.javamentor.spring_boot_crud.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class HelloController {

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String printWelcome() {
        return "redirect:/login";
    }

    @RequestMapping(value = "login", method = RequestMethod.GET)
    public String loginPage() {
        return "hello/login";
    }

    @RequestMapping(value = "login?logout", method = RequestMethod.GET)
    public String logout() {
        return "hello/login";
    }
}
