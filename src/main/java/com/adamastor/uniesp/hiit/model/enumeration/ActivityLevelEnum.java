package com.adamastor.uniesp.hiit.model.enumeration;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ActivityLevelEnum {
	
	SEDENTARY(1.2), 
	MODERATELY_ACTIVE(1.35), 
	ACTIVE(1.55);
	
	private Double value;
	
}
