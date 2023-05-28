import { Header } from "../header/Header";
import iconWorkout from "../../assets/workout.svg";
import { Link } from "react-router-dom";
import { Paths } from "../../utils/paths";
import './workout.css';
import { useEffect, useState } from "react";
import { IWorkout } from "../../interfaces/workout-model";
import axios from "axios";

export const Workouts = () => {

    const [workouts, setWorkouts] = useState<IWorkout[]>();

    useEffect(() => {

        axios.get<IWorkout[]>('http://localhost:8080/workouts')
            .then(response => {
                setWorkouts(response.data);
            })
            .catch(error => {
                console.error(error);
            });

    }, []);

    return (
        <div>
            <Header isHome={false} />
            <div className="background-logo container container-default mt-3">
                <div className="text-center">
                    <img src={iconWorkout} alt="workout" className="icon-workout"/>
                    <h1 className="text-white">Treinos intervalados</h1>
                </div>
                <div className='mt-5'>
                    {workouts?.map((workout, key) => (
                        <div key={key} className="row d-flex align-items-center justify-content-center mt-3">
                            <Link to={`${Paths.WORKOUTS}/${workout.slug}`} type="button" className="btn btn-secondary btn-home">{workout.name}</Link>
                        </div>         
                    ))}
                </div>
                <div className="row d-flex align-items-center justify-content-center mt-3">
                    <Link to={`${Paths.WORKOUTS}`} type="button" className="btn btn-light btn-home">Monte sue treino</Link>
                </div>    
                <div className="text-center mt-4">
                    <Link type="button" to={Paths.HOME} className="btn btn-secondary btn-sm ms-2">
                        Voltar
                    </Link>
                </div>
            </div>
        </div>
    );

}