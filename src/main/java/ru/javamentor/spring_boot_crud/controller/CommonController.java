package ru.javamentor.spring_boot_crud.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class CommonController {

    @RequestMapping(value = "login", method = RequestMethod.GET)
    public String loginPage() {
        return "common/login";
    }

    @RequestMapping(value = "login?logout", method = RequestMethod.GET)
    public String logout() {
        return "common/login";
    }
}
