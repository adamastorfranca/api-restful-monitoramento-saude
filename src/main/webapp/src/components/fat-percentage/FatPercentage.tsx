import { Button } from "reactstrap";
import { Header } from "../header/Header";
import { Link } from "react-router-dom";
import { Paths } from "../../utils/paths";
import { useState } from "react";
import iconFatPercentage from "../../assets/fat-percentage.svg"
import './fat-percentage.css';
import axios from "axios";
import { IActivityLevel } from "../../interfaces/activity-level-enum";
import { IGenre } from "../../interfaces/genre-enum";

export const FatPercentage = () => {

    const [height, setHeight] = useState<number>(0);
    const [neck, setNeck] = useState<number>(0);
    const [waist, setWaist] = useState<number>(0);
    const [gender, setGender] = useState<IGenre>(IGenre.MALE);
    const [result, setResult] = useState<number>(0);

    function getResult() {
        const data = { height, neck, waist, gender };

        axios.post<number>('http://localhost:8080/users/fat-percentage', data)
            .then(response => {
                setResult(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }
    
    return (
        <div>
            <Header isHome={false} />
            <div className="background-logo container container-default mt-3">
                <div className="text-center">
                    <img src={iconFatPercentage} alt="fat percentage" className="icon-fat-percentage"/>
                    <h1 className="text-white">Percentual de gordura</h1>
                </div>
                <div className="container-fluid mt-5">
                    <div className="row p-2">
                        <label className="col-5 text-end mt-1">Peso</label>
                        <input className="form-control-sm col-4" type="number" placeholder="kg" min={10} max={200} required />
                    </div>
                    <div className="row p-2">
                        <label className="col-5 text-end mt-1">Altura</label>
                        <input className="form-control-sm col-4" type="number" placeholder="cm" min={50} max={250} onChange={(e) => {setHeight((Number(e.target.value)))}}required />
                    </div>
                    <div className="row p-2">
                        <label className="col-5 text-end mt-1">Gênero</label>
                        <select className="form-control-sm col-4" onChange={(e) => setGender(e.target.value as IGenre)}>
                            <option value={IGenre.MALE}>Homem</option>
                            <option value={IGenre.FEMALE}>Mulher</option>
                        </select>
                    </div>
                    <div className="row p-2">
                        <label className="col col-5 text-end mt-1">Pescoço</label>
                        <input className="form-control-sm col-4" type="number" placeholder="cm" min={10} max={60} onChange={(e) => setNeck(Number(e.target.value))} required />
                    </div>
                    <div className="row p-2">
                        <label className="col col-5 text-end mt-1">Cintura</label>
                        <input className="form-control-sm col-4" type="number" placeholder="cm" min={40} max={200} onChange={(e) => setWaist(Number(e.target.value))} required />
                    </div>
                    <div className="row p-2"> 
                        <label className="col col-5 text-end mt-1 fs-9">Estado</label>
                        <select className="col-4 form-control-sm">
                            <option value={IActivityLevel.SEDENTARY}>Sedentário</option>
                            <option value={IActivityLevel.MODERATELY_ACTIVE}>Moderadamente Ativo</option>
                            <option value={IActivityLevel.ACTIVE}>Ativo</option>
                        </select>
                    </div>
                </div>
                {result !== 0 && (
                    <div className="text-center mt-4 text-dark bg-light d-flex align-items-center justify-content-center rounded">
                        <div className={`p-2 rounded fw-bold`}>
                            <p className="mt-3">Resultado aproximado: {result.toFixed(1)} %</p>
                        </div>
                    </div>
                )}
                <div className="text-center mt-4">
                    <Button onClick={getResult} className="btn-secondary btn-sm" disabled={height === 0 || neck === 0 || waist === 0}>
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