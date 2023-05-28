package com.adamastor.uniesp.hiit.model.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class WorkoutResponseDTO {
	
	private String name;
	
	private String description;

	private Long highIntensityTime;

	private Long restTime;
	
	private Integer repetitions;
	
	private String slug;

}
