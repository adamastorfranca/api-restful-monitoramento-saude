package com.adamastor.uniesp.hiit.model.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserResponseDTO {
	
	private String email;

	private String name;
	
	private LocalDate birthDate;
	
	private LocalDateTime createdAt;

}
