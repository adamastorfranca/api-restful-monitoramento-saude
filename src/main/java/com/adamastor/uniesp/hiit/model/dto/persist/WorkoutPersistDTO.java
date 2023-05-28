package com.adamastor.uniesp.hiit.model.dto.persist;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class WorkoutPersistDTO {
	
	private String name;
	
	private String description;

	private Long highIntensityTime;

	private Long restTime;
	
	private Integer repetitions;
	
	private String slug;
	
	private LocalDateTime createdAt = LocalDateTime.now();

}
