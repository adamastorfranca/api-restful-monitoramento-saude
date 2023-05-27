import { Button } from "reactstrap";
import { Header } from "../header/Header";
import { Link } from "react-router-dom";
import { Paths } from "../../utils/paths";
import { useState } from "react";
import iconFatPercentage from "../../assets/fat-percentage.svg"
import './fat-percentage.css';

export const FatPercentage = () => {

    const [weight, setWeight] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);
    const [neck, setNeck] = useState<number>(0);
    const [waist, setWaist] = useState<number>(0);
    const [gender, setGender] = useState<'male' | 'female'>('male');
    const [result, setResult] = useState<string | number>(0);

    const calculateBodyFatPercentage = () => {
        if (gender === 'male') {
            const bodyFatPercentage = (495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height))) - 450;
            setResult(bodyFatPercentage.toFixed(1));
        } else if (gender === 'female') {
            const bodyFatPercentage = (495 / (1.29579 - 0.35004 * Math.log10(waist - neck) + 0.22100 * Math.log10(height))) - 450;
            setResult(bodyFatPercentage.toFixed(1));
        }
    }
    
    return (
        <div>
            <Header />
            <div className="background-logo container container-default mt-3">
                <div className="text-center">
                    <img src={iconFatPercentage} alt="fat percentage" className="icon-fat-percentage"/>
                    <h1 className="text-white">Percentual de gordura</h1>
                </div>
                <div className="container-fluid">
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
                        <select className="form-control-sm col-4"  onChange={(e) => setGender(e.target.value as "male" | "female")}>
                            <option value="male">Homem</option>
                            <option value="female">Mulher</option>
                        </select>
                    </div>
                    <div className="row p-2">
                        <label className="col col-5 text-end">Pescoço</label>
                        <input className="form-control-sm col-4" type="number" placeholder="cm" min={10} max={60} onChange={(e) => setNeck(Number(e.target.value))} required />
                    </div>
                    <div className="row p-2">
                        <label className="col col-5 text-end">Cintura</label>
                        <input className="form-control-sm col-4" type="number" placeholder="cm" min={40} max={200} onChange={(e) => setWaist(Number(e.target.value))} required />
                    </div>
                    <div className="row p-2"> 
                        <label className="col col-5 text-end fs-9">Estado</label>
                        <select className="col-4 form-control-sm">
                            <option value={1}>Sedentário</option>
                            <option value={2}>Moderadamente Ativo</option>
                            <option value={3}>Ativo</option>
                        </select>
                    </div>
                </div>
                {result !== 0 && (
                    <div className="text-center mt-4 text-dark d-flex align-items-center justify-content-center">
                        <div className={`p-2 rounded fw-bold`}>
                            <p className="mt-2">Resultado: {result}</p>
                        </div>
                    </div>
                )}
                <div className="text-center mt-4">
                    <Button onClick={calculateBodyFatPercentage} className="btn-secondary btn-sm" disabled={weight === 0 || height === 0 || neck === 0 || waist === 0}>
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