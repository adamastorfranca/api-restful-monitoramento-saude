package com.adamastor.uniesp.hiit.model.enumeration;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ActivityLevelEnum {
	
	SEDENTARY(1), 
	LIGHTLY_ACTIVE(2), 
	MODERATELY_ACTIVE(3), 
	ACTIVE(4), 
	VERY_ACTIVE(5);
	
	private Integer value;
	
}
