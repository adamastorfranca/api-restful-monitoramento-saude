package com.adamastor.uniesp.hiit.model.dto.request;

import com.adamastor.uniesp.hiit.model.enumeration.GenderEnum;

import lombok.Data;

@Data
public class FatPercentageRequestDTO {
	
    private Double weight;
    
    private Double height;
    
    private Double neck;
    
    private Double waist;
    
    private GenderEnum gender;

}
