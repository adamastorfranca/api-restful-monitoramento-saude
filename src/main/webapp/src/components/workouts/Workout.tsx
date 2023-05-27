import { Header } from "../header/Header";
import iconWorkout from "../../assets/workout.svg"
import './workout.css';
import { Link } from "react-router-dom";
import { Paths } from "../../utils/paths";

export const Workout = () => {

    return (
        <div>
            <Header />
            <div className="background-logo to-color container container-default mt-5">
                <div className="text-center">
                    <img src={iconWorkout} alt="workout" className="icon-imc"/>
                    <h1 className="text-white">Treinos intervalados</h1>
                </div>

                <div className='container mt-5 d-flex align-items-center justify-content-center'>
                    <Link to={Paths.TABATA} type="button" className="btn btn-secondary btn-home">Tabata</Link>
                </div>


                <div className="text-center mt-5">
                    <Link type="button" to={Paths.HOME} className="btn btn-secondary btn-sm ms-2">
                        Voltar
                    </Link>
                </div>
            </div>
        </div>
    );

}