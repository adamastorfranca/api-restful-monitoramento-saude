package com.adamastor.uniesp.hiit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.adamastor.uniesp.hiit.model.User;
import com.adamastor.uniesp.hiit.service.UserService;

@RestController
@RequestMapping(value = "/users")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@PostMapping
	public ResponseEntity<User> create(@RequestBody User persist) {
		
		return new ResponseEntity<>(userService.create(persist), HttpStatus.CREATED);

    }
	
	@GetMapping
	public ResponseEntity<List<User>> get() {
		
		return new ResponseEntity<>(userService.get(), HttpStatus.OK);

    }
	
	
}