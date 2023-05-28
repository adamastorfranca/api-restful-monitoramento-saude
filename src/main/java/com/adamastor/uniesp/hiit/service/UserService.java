package com.adamastor.uniesp.hiit.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.adamastor.uniesp.hiit.model.User;
import com.adamastor.uniesp.hiit.model.dto.CaloricExpenditureRequestDTO;
import com.adamastor.uniesp.hiit.model.dto.FatPercentageRequestDTO;
import com.adamastor.uniesp.hiit.model.dto.ImcRequestDTO;
import com.adamastor.uniesp.hiit.model.dto.ImcResponseDTO;
import com.adamastor.uniesp.hiit.model.dto.UserPersistDTO;
import com.adamastor.uniesp.hiit.model.dto.UserResponseDTO;
import com.adamastor.uniesp.hiit.model.enumeration.GenderEnum;
import com.adamastor.uniesp.hiit.model.enumeration.ImcClassificationEnum;
import com.adamastor.uniesp.hiit.repository.UserRepository;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	public UserResponseDTO create(UserPersistDTO persist) {
		
		User newUser = new User();
		
		BeanUtils.copyProperties(persist, newUser);
		
		newUser = userRepository.save(newUser);
		
		return UserResponseDTO.builder()
				.name(newUser.getName())
				.email(newUser.getEmail())
				.birthDate(newUser.getBirthDate())
				.createdAt(newUser.getCreatedAt())
				.build();
		
	}

	public ImcResponseDTO imcCalculation(ImcRequestDTO request) {
		
	    Double x = request.getHeight() / 100.0;
	    Double calculatedResult = request.getWeight() / (x * x);
	    
	    ImcClassificationEnum info = ImcClassificationEnum.classify(calculatedResult);
	    
	    return ImcResponseDTO.builder()
	    	.result(String.format("%.1f", calculatedResult))
	    	.classification(info.getClassification())
	    	.riskComorbidity(info.getRiskComorbidity())
	    	.build();

	}
	
	public Double fatPercentageCalculation(FatPercentageRequestDTO request) {
		
		double parameter = GenderEnum.MALE.equals(request.getGender()) ? 0.15456 : -0.22100;
		
        return (495 / (1.0324 - 0.19077 * Math.log10(request.getWaist() - request.getNeck()) + parameter * Math.log10(request.getHeight()))) - 450;

	}
	
    public Double caloricExpenditureCalculation(CaloricExpenditureRequestDTO request) {
    	
    	double parameter = GenderEnum.MALE.equals(request.getGender()) ? 5 : -161;
    	
        double basalMetabolicRate = 10 * request.getWeight() + 6.25 * request.getHeight() - 5 * request.getAge() + parameter;

        return basalMetabolicRate * request.getActivityLevel().getValue();
        
    }
}
