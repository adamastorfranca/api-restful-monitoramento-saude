package com.adamastor.uniesp.hiit.model.enumeration;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum GenderEnum {
	
	MALE("Male"), 
	FEMALE("Female");

	private String value;

}
