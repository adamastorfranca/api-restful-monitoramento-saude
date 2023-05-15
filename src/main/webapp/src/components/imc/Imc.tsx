import { Button } from "reactstrap";
import { Header } from "../header/Header";
import { Link } from "react-router-dom";
import { Paths } from "../../utils/paths";
import { useState } from "react";

export const Imc = () => {

    const [age, setAge] = useState<number>(0);
    const [weight, setWeight] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);
    const [result, setResult] = useState<number>(0);

    function calcularIMC() {
        let x = height / 100;  
        setResult(weight / (x * x)); 
    }

    return (
        <div>
            <Header />
            <div className="background-logo to-color container container-default border mt-3">
                <div className="text-center">
                    <h1 className="text-white">IMC</h1>
                    <h5>Índice de massa corporal</h5>
                </div>
                <div className="container-fluid border">
                    <div className="row mt-4 p-2">
                        <label className="col col-5 text-end">Idade</label>
                        <input className="col-4" type="number" min={1} max={100} required onChange={(e) => {setAge((Number(e.target.value)))}}/>
                    </div>
                    <div className="row p-2">
                        <label className="col-5 text-end">Peso</label>
                        <input className="col-4" type="number" placeholder="kg" min={10} max={200} required onChange={(e) => {setWeight((Number(e.target.value)))}}/>
                    </div>
                    <div className="row p-2">
                        <label className="col-5 text-end">Altura</label>
                        <input className="col-4" type="number" placeholder="cm" min={50} max={250} onChange={(e) => {setHeight((Number(e.target.value)))}}required />
                    </div>
                    <div className="row p-2">
                        <label className="col-5 text-end">Gênero</label>
                        <select className="col-4">
                            <option value="MALE">Homem</option>
                            <option value="FEMALE">Mulher</option>
                        </select>
                    </div>
                </div>
                <div className="text-center mt-4">
                    <Link type="button" to={Paths.HOME} className="btn btn-secondary btn-sm">
                        Voltar
                    </Link>
                    <Button onClick={calcularIMC} className="btn-secondary btn-sm ms-2">
                        Calcular
                    </Button>
                </div>
                <div className="text-center mt-4">
                    {result && <p>{result}</p>}
                </div>
            </div>
        </div>
    );

}