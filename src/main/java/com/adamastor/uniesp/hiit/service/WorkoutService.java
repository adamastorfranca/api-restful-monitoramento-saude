package com.adamastor.uniesp.hiit.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.adamastor.uniesp.hiit.model.Workout;
import com.adamastor.uniesp.hiit.model.dto.persist.WorkoutPersistDTO;
import com.adamastor.uniesp.hiit.model.dto.response.WorkoutResponseDTO;
import com.adamastor.uniesp.hiit.repository.WorkoutRepository;

@Service
public class WorkoutService {
	
	@Autowired
	private WorkoutRepository workoutRepository;
	
	public WorkoutResponseDTO create(WorkoutPersistDTO persist) {
		
		Workout newWorkout = new Workout();
		
		BeanUtils.copyProperties(persist, newWorkout);
		
		newWorkout = workoutRepository.save(newWorkout);
		
		return WorkoutResponseDTO.builder()
				.name(newWorkout.getName())
				.description(newWorkout.getDescription())
				.highIntensityTime(newWorkout.getHighIntensityTime())
				.restTime(newWorkout.getRestTime())
				.repetitions(newWorkout.getRepetitions())
				.slug(newWorkout.getSlug())
				.build();
		
	}
	
	public List<Workout> findAll() {
		
		return workoutRepository.findAll();
		
	}
	
	public Workout findBySlug(String slug) {
		
		Optional<Workout> optional = workoutRepository.findBySlug(slug);
		
		if (optional.isEmpty()) {
			return null;
		}
		
		return optional.get();
		
	}

}
