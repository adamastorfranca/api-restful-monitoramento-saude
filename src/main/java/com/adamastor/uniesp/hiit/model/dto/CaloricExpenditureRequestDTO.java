package com.adamastor.uniesp.hiit.model.dto;

import com.adamastor.uniesp.hiit.model.enumeration.ActivityLevelEnum;
import com.adamastor.uniesp.hiit.model.enumeration.GenderEnum;

import lombok.Data;

@Data
public class CaloricExpenditureRequestDTO {
	
	private Integer age;
	
    private Double weight;
    
    private Double height;
    
    private Double neck;
    
    private GenderEnum gender;
    
    private ActivityLevelEnum activityLevel;

}
