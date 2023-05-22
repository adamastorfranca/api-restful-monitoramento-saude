package com.adamastor.uniesp.hiit.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.adamastor.uniesp.hiit.model.enumeration.ActivityLevelEnum;
import com.adamastor.uniesp.hiit.model.enumeration.GenderEnum;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false, unique = true)
	private Long id;
	
	@Column(name = "email", nullable = false, unique = true)
	private String email;
	
	@Column(name = "password", nullable = false)
	private String password;
	
	@Column(name = "name", nullable = false)
	private String name;
	
	@Column(name = "birth_date", nullable = false)
	private LocalDate birthDate;
	
	@Column(name = "gender", nullable = false)
	@Enumerated(EnumType.STRING)
	private GenderEnum gender;
	
	@Column(name = "activity_level", nullable = false)
	@Enumerated(EnumType.STRING)
	private ActivityLevelEnum activityLevel;
	
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Measure> measures;
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Workout> workouts;
    
    @ManyToMany(cascade = CascadeType.ALL)
    private List<Authority> authorities;
 
	@Column(name = "created_at", nullable = false)
	private LocalDateTime createdAt;
	
	@Column(name = "updated_at")
	private LocalDateTime updatedAt;

}
