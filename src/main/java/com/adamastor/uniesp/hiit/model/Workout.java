package com.adamastor.uniesp.hiit.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "workouts")
public class Workout {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false, unique = true)
	private Long id;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "description", columnDefinition = "TEXT")
	private String description;

	@Column(name = "high_intensity_time")
	private Long highIntensityTime;

	@Column(name = "rest_time")
	private Long restTime;
	
	@Column(name = "repetitions")
	private Integer repetitions;
	
	@Column(name = "slug")
	private String slug;
	
	@Column(name = "created_at")
	private LocalDateTime createdAt;
	
	@Column(name = "updated_at")
	private LocalDateTime updatedAt;
	
}
