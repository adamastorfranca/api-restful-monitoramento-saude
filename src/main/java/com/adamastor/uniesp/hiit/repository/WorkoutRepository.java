package com.adamastor.uniesp.hiit.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.adamastor.uniesp.hiit.model.Workout;

@Repository
public interface WorkoutRepository extends JpaRepository<Workout, UUID> {
	
	Optional<Workout> findBySlug(String slug);

}
