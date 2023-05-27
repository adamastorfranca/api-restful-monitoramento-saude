import { Button } from "reactstrap";
import { Header } from "../header/Header";
import { Link } from "react-router-dom";
import { Paths } from "../../utils/paths";
import { useState } from "react";
import iconCaloricExpenditure from "../../assets/caloric-expenditure.svg"
import './caloric-expenditure.css';

export const CaloricExpenditure = () => {

    const [age, setAge] = useState<number>(0);
    const [weight, setWeight] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);
    const [neck, setNeck] = useState<number>(0);
    const [waist, setWaist] = useState<number>(0);
    const [activityLevel, setActivityLevel] = useState<number>(1);
    const [gender, setGender] = useState<'male' | 'female'>('male');
    const [result, setResult] = useState<string | number>(0);
  
    const calculateCaloricExpenditure = () => {
      const basalMetabolicRate = 10 * weight + 6.25 * height - 5 * age + (gender === 'male' ? 5 : -161);
      const totalCaloricExpenditure = basalMetabolicRate * getActivityMultiplier(activityLevel);
  
      setResult(totalCaloricExpenditure);
    };
  
    const getActivityMultiplier = (level: number) => {
      switch (level) {
        case 1:
          return 1.2;
        case 2:
          return 1.375;
        case 3:
          return 1.55;
        default:
          return 1;
      }
    };
    
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
                        <select className="col-4 form-control-sm" onChange={(e) => setActivityLevel(Number(e.target.value))}>
                            <option value={1}>Sedentário</option>
                            <option value={2}>Moderadamente Ativo</option>
                            <option value={3}>Ativo</option>
                        </select>
                    </div>
                </div>
                {result !== 0 && (
                    <div className="text-center mt-4 text-dark d-flex align-items-center justify-content-center">
                        <div className={`p-2 rounded fw-bold bg-light`}>
                            <p className="mt-3">Resultado: {result} kcal/dia</p>
                        </div>
                    </div>
                )}
                <div className="text-center mt-4">
                    <Button onClick={calculateCaloricExpenditure} className="btn-secondary btn-sm" disabled={weight === 0 || height === 0 || neck === 0 || waist === 0}>
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