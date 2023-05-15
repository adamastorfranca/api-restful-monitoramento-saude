package com.adamastor.uniesp.hiit.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.adamastor.uniesp.hiit.model.User;
import com.adamastor.uniesp.hiit.repository.UserRepository;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	public User create(User user) {
		
		return userRepository.save(user);
		
	}
	
	public List<User> get() {
		
		return userRepository.findAll();
		
	}
}
