package com.adamastor.uniesp.hiit.model.dto.persist;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.Data;

@Data
public class UserPersistDTO {
	
	private String email;
	
	private String password;
	
	private String name;
	
	private LocalDate birthDate;
	
	private LocalDateTime createdAt = LocalDateTime.now();

}
