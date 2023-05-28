package com.adamastor.uniesp.hiit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.adamastor.uniesp.hiit.model.dto.CaloricExpenditureRequestDTO;
import com.adamastor.uniesp.hiit.model.dto.FatPercentageRequestDTO;
import com.adamastor.uniesp.hiit.model.dto.ImcRequestDTO;
import com.adamastor.uniesp.hiit.model.dto.ImcResponseDTO;
import com.adamastor.uniesp.hiit.model.dto.UserPersistDTO;
import com.adamastor.uniesp.hiit.model.dto.UserResponseDTO;
import com.adamastor.uniesp.hiit.service.UserService;

@RestController
@RequestMapping(value = "/users")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@PostMapping(path = "/register")
	public ResponseEntity<UserResponseDTO> create(@RequestBody UserPersistDTO persist) {
		
		return new ResponseEntity<>(userService.create(persist), HttpStatus.CREATED);

    }

	@PostMapping(path = "/imc")
	public ResponseEntity<ImcResponseDTO> imcCalculation(@RequestBody ImcRequestDTO request) {
		
		return new ResponseEntity<>(userService.imcCalculation(request), HttpStatus.OK);

    }	
	
	@PostMapping(path = "/fat-percentage")
	public ResponseEntity<Double> fatPercentageCalculation(@RequestBody FatPercentageRequestDTO request) {
		
		return new ResponseEntity<>(userService.fatPercentageCalculation(request), HttpStatus.OK);

    }	
	
	@PostMapping(path = "/caloric-expenditure")
	public ResponseEntity<Double> caloricExpenditureCalculation(@RequestBody CaloricExpenditureRequestDTO request) {
		
		return new ResponseEntity<>(userService.caloricExpenditureCalculation(request), HttpStatus.OK);

    }	
}