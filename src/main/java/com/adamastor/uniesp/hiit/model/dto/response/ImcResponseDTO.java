package com.adamastor.uniesp.hiit.model.dto.response;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ImcResponseDTO {
	
	private String result;
	
	private String classification;
	
	private String riskComorbidity;

}
