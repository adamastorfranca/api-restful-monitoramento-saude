package com.adamastor.uniesp.hiit.model.enumeration;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ImcClassificationEnum {
	
    BELOW_WEIGHT("Abaixo do peso", "Baixo"),
    NORMAL_WEIGHT("Peso normal", "Normal"),
    OVERWEIGHT("Sobrepeso", "Aumentado"),
    OBESITY_1("Obesidade grau 1", "Moderado"),
    OBESITY_2("Obesidade grau 2", "Grave"),
    OBESITY_3("Obesidade grau 3", "Muito grave");
    
    private String classification;
    private String riskComorbidity;

    public static ImcClassificationEnum classify(double imc) {
        if (imc < 18.5) {
            return BELOW_WEIGHT;
        } else if (imc < 25) {
            return NORMAL_WEIGHT;
        } else if (imc < 30) {
            return OVERWEIGHT;
        } else if (imc < 35) {
            return OBESITY_1;
        } else if (imc < 40) {
            return OBESITY_2;
        } else {
            return OBESITY_3;
        }
    }
}
