package com.hiiiiiii.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LoginController {
@GetMapping("/")
public String homepage() {
    return "home.html";
}

}
