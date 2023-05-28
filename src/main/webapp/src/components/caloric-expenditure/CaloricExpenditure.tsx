import { Button } from "reactstrap";
import { Header } from "../header/Header";
import { Link } from "react-router-dom";
import { Paths } from "../../utils/paths";
import { useState } from "react";
import iconCaloricExpenditure from "../../assets/caloric-expenditure.svg"
import './caloric-expenditure.css';
import axios from "axios";
import { IGenre } from "../../interfaces/genre-enum";
import { IActivityLevel } from "../../interfaces/activity-level-enum";

export const CaloricExpenditure = () => {

    const [age, setAge] = useState<number>(0);
    const [weight, setWeight] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);
    const [activityLevel, setActivityLevel] = useState<string>('SEDENTARY');
    const [gender, setGender] = useState<IGenre>(IGenre.MALE);
    const [result, setResult] = useState<string | number>(0);
  
    function getResult() {
        const data = { height, weight, age, activityLevel, gender };

        axios.post<number>('http://localhost:8080/users/caloric-expenditure', data)
            .then(response => {
                setResult(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <div>
            <Header />
            <div className="background-logo container container-default mt-3">
                <div className="text-center">
                    <img src={iconCaloricExpenditure} alt="caloric expenditure" className="icon-caloric-expenditure"/>
                    <h1 className="text-white">Gasto calórico basal</h1>
                </div>
                <div className="container-fluid mt-4">
                    <div className="row p-2">
                        <label className="col-5 text-end">Idade</label>
                        <input className="form-control-sm col-4" type="number" min={5} max={100} required onChange={(e) => {setAge((Number(e.target.value)))}}/>
                    </div>
                    <div className="row p-2">
                        <label className="col-5 text-end">Peso</label>
                        <input className="form-control-sm col-4" type="number" placeholder="kg" min={10} max={200} required onChange={(e) => {setWeight((Number(e.target.value)))}}/>
                    </div>
                    <div className="row p-2">
                        <label className="col-5 text-end">Altura</label>
                        <input className="form-control-sm col-4" type="number" placeholder="cm" min={50} max={250} onChange={(e) => {setHeight((Number(e.target.value)))}}required />
                    </div>
                    <div className="row p-2">
                        <label className="col-5 text-end">Gênero</label>
                        <select className="form-control-sm col-4"  onChange={(e) => setGender(e.target.value as IGenre)}>
                            <option value={IGenre.MALE}>Homem</option>
                            <option value={IGenre.FEMALE}>Mulher</option>
                        </select>
                    </div>
                    <div className="row p-2"> 
                        <label className="col col-5 text-end fs-9">Estado</label>
                        <select className="col-4 form-control-sm" onChange={(e) => setActivityLevel(e.target.value as IActivityLevel)}>
                            <option value={IActivityLevel.SEDENTARY}>Sedentário</option>
                            <option value={IActivityLevel.MODERATELY_ACTIVE}>Moderadamente Ativo</option>
                            <option value={IActivityLevel.ACTIVE}>Ativo</option>
                        </select>
                    </div>
                </div>
                {result !== 0 && (
                    <div className="text-center mt-4 text-dark d-flex align-items-center justify-content-center">
                        <div className={`p-2 rounded fw-bold bg-light`}>
                            <p className="mt-3">Resultado aproximado: {result} kcal/dia</p>
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