import { Button } from "reactstrap";
import { Header } from "../header/Header";
import { Link } from "react-router-dom";
import { Paths } from "../../utils/paths";
import { useState } from "react";
import iconImc from "../../assets/imc.svg"
import './imc.css';

export const Imc = () => {

    const [weight, setWeight] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);
    const [result, setResult] = useState<number | string>(0);
    const [classification, setClassification] = useState<string>('');
    const [riskComorbidity, setRiskComorbidity] = useState<string>('');
    const [colorResult, setColorResult] = useState('');

    function imcCalculation() {
        let x = height / 100;  
        const calculatedResult = weight / (x * x);
        setResult(calculatedResult.toFixed(1));
        setClassification(getClassification(calculatedResult)); 
    }

    function getClassification(imc: number): string {
        if (imc < 18.5) {
            setColorResult('bg-info');
            setRiskComorbidity('Baixo');
            return 'Abaixo do peso';
        } else if (imc >= 18.5 && imc < 25) {
            setColorResult('bg-success');
            setRiskComorbidity('Normal');
            return 'Peso normal';
        } else if (imc >= 25 && imc < 30) {
            setColorResult('bg-warning');
            setRiskComorbidity('Aumentado');
            return 'Sobrepeso';
        } else if (imc >= 30 && imc < 35) {
            setColorResult('bg-orange');
            setRiskComorbidity('Moderado');
            return 'Obesidade grau 1';
        } else if (imc >= 35 && imc < 40) {
            setColorResult('bg-danger');
            setRiskComorbidity('Grave');
            return 'Obesidade grau 2';
        } else {
            setColorResult('bg-brown');
            setRiskComorbidity('Muito grave');
            return 'Obesidade grau 3';
        }
    }

    return (
        <div>
            <Header />
            <div className="background-logo container container-default mt-3">
                <div className="text-center">
                    <img src={iconImc} alt="balance" className="icon-imc"/>
                    <h1 className="text-white">IMC</h1>
                    <h5>Índice de massa corporal</h5>
                </div>
                <div className="container-fluid mt-4">
                    <div className="row p-2">
                        <label className="col-5 text-end">Peso</label>
                        <input className="form-control-sm col-4" type="number" placeholder="kg" min={10} max={200} required onChange={(e) => {setWeight((Number(e.target.value)))}}/>
                    </div>
                    <div className="row p-2">
                        <label className="col-5 text-end">Altura</label>
                        <input className="form-control-sm col-4" type="number" placeholder="cm" min={50} max={250} onChange={(e) => {setHeight((Number(e.target.value)))}}required />
                    </div>
                </div>
                {result !== 0 && (
                    <div className="text-center mt-4 text-dark d-flex align-items-center justify-content-center">
                        <div className={`${colorResult} p-2 rounded fw-bold`}>
                            <p className="mt-2">Resultado: {result}</p>
                            <p>Classificação: {classification}</p>
                            <p>Risco de comorbidade: {riskComorbidity}</p>
                        </div>
                    </div>
                )}
                <div className="text-center mt-4">
                    <Button onClick={imcCalculation} className="btn-secondary btn-sm" disabled={weight === 0 || height === 0}>
                        Calcular
                    </Button>
                    <Link type="button" to={Paths.HOME} className="btn btn-secondary btn-sm  ms-2">
                        Voltar
                    </Link>
                </div>
            </div>
        </div>
    );

}