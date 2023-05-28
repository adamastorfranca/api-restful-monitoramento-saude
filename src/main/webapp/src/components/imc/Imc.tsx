import { Button } from "reactstrap";
import { Header } from "../header/Header";
import { Link } from "react-router-dom";
import { Paths } from "../../utils/paths";
import { useState } from "react";
import iconImc from "../../assets/imc.svg"
import './imc.css';
import axios from "axios";

interface IResultIMC {
    result: string,
    riskComorbidity: string,
    classification: string
}

export const Imc = () => {

    const [weight, setWeight] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);
    const [result, setResult] = useState<IResultIMC>();
    const [colorResult, setColorResult] = useState('');

    function getResult() {
        const data = { height, weight };

        axios.post<IResultIMC>('http://localhost:8080/users/imc', data)
            .then(response => {
                setResult(response.data);
                setColor(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    function setColor(result: IResultIMC) {
        if (result.classification === 'Abaixo do peso') {
            setColorResult('bg-info');
        } else if (result.classification === 'Peso normal') {
            setColorResult('bg-success');
        } else if (result.classification === 'Sobrepeso') {
            setColorResult('bg-warning');
        } else if (result.classification === 'Obesidade grau 1') {
            setColorResult('bg-orange');
        } else if (result.classification === 'Obesidade grau 2') {
            setColorResult('bg-danger');
        } else if (result.classification === 'Obesidade grau 3') {
            setColorResult('bg-brown');
        }
    }

    return (
        <div>
            <Header isHome={false} />
            <div className="background-logo container container-default mt-3">
                <div className="text-center">
                    <img src={iconImc} alt="balance" className="icon-imc"/>
                    <h1 className="text-white">IMC</h1>
                    <p className="small">Índice de massa corporal</p>
                </div>
                <div className="container-fluid mt-5">
                    <div className="row p-2">
                        <label className="col-5 text-end">Peso</label>
                        <input className="form-control-sm col-4" type="number" placeholder="kg" min={10} max={200} required onChange={(e) => {setWeight((Number(e.target.value)))}}/>
                    </div>
                    <div className="row p-2">
                        <label className="col-5 text-end">Altura</label>
                        <input className="form-control-sm col-4" type="number" placeholder="cm" min={50} max={250} onChange={(e) => {setHeight((Number(e.target.value)))}}required />
                    </div>
                </div>
                {result && (
                    <div className="text-center mt-4 text-dark d-flex align-items-center justify-content-center">
                        <div className={`${colorResult} p-2 rounded fw-bold`}>
                            <p className="mt-2">Resultado: {result.result}</p>
                            <p>Classificação: {result.classification}</p>
                            <p>Risco de comorbidade: {result.riskComorbidity}</p>
                        </div>
                    </div>
                )}
                <div className="text-center mt-4">
                    <Button onClick={getResult} className="btn-secondary btn-sm" disabled={weight === 0 || height === 0}>
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