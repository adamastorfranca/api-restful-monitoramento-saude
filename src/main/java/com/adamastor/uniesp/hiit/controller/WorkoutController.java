package com.adamastor.uniesp.hiit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.adamastor.uniesp.hiit.model.Workout;
import com.adamastor.uniesp.hiit.model.dto.persist.WorkoutPersistDTO;
import com.adamastor.uniesp.hiit.model.dto.response.WorkoutResponseDTO;
import com.adamastor.uniesp.hiit.service.WorkoutService;

@RestController
@RequestMapping(value = "/workouts")
public class WorkoutController {
	
	@Autowired
	private WorkoutService workoutService;
	
	@GetMapping
	public ResponseEntity<List<Workout>> findAll() {
		
		return new ResponseEntity<>(workoutService.findAll(), HttpStatus.OK);

    }
	
	@GetMapping(path = "/{slug}")
	public ResponseEntity<Workout> findBySlug(@PathVariable String slug) {
		
		return new ResponseEntity<>(workoutService.findBySlug(slug), HttpStatus.OK);

    }
	
	@PostMapping
	public ResponseEntity<WorkoutResponseDTO> create(@RequestBody WorkoutPersistDTO persist) {
		
		return new ResponseEntity<>(workoutService.create(persist), HttpStatus.CREATED);

    }

}