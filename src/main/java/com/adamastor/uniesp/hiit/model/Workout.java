package com.adamastor.uniesp.hiit.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
	
    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "id_user", nullable = false)
    private User user;
	
	@Column(name = "time")
	private Long time;
	
	@Column(name = "duration")
	private Long duration;
	
	@Column(name = "intensity")
	private Integer intensity;
	
	@Column(name = "rest")
	private Integer rest;
	
	@Column(name = "mileage")
	private Float mileage;
	
	@Column(name = "created_at")
	private LocalDateTime createdAt;
	
}
