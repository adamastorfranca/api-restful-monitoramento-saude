import { Header } from "../header/Header";
import iconWorkout from "../../assets/workout.svg";
import { Link, useParams } from "react-router-dom";
import { Paths } from "../../utils/paths";
import { useEffect, useState } from "react";
import { IWorkout } from "../../interfaces/workout-model";
import axios from "axios";
import { Button } from "reactstrap";
import './workout.css';

export const Workout = () => {

    const { slug } = useParams<{ slug: string }>(); 
    const [workout, setWorkout] = useState<IWorkout>();
    const [duration, setDuration] = useState<number>(0);

    useEffect(() => {
        axios.get<IWorkout>('http://localhost:8080/workouts/' + slug)
            .then(response => {
                setWorkout(response.data);
            })  
            .catch(error => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        if (workout && workout.highIntensityTime && workout.restTime && workout.repetitions) {
            setDuration(((workout.highIntensityTime + workout.restTime) * workout.repetitions) / 60);
        }
    }, [workout]);

    return (
        <div>
            <Header isHome={false} />
            <div className="background-logo container container-default mt-3">
                <div className="text-center">
                    <img src={iconWorkout} alt="workout" className="icon-workout"/>
                    <h1 className="text-white">{workout?.name}</h1>
                </div>
                <div className='container mt-5'>
                    <p className="text-justify">{workout?.description}</p>
                </div>
                <div className='text-white small mt-4'>
                    <div className="row">
                        <p className="col col-6 text-end">Duração: </p>
                        <p className="col col-6">{duration} minutos</p>
                    </div>
                    <div className="row">
                        <p className="col col-6 text-end">Repetições: </p>
                        <p className="col col-6">{workout?.repetitions}</p>
                    </div>
                    <div className="row">
                        <p className="col col-6 text-end">Alta intensidade: </p>
                        <p className="col col-6">{workout?.highIntensityTime} segundos</p>
                    </div>
                    <div className="row">
                        <p className="col col-6 text-end">Descanso: </p>
                        <p className="col col-6">{workout?.restTime} segundos</p>
                    </div>
                </div>
                <div className="text-center mt-4">
                    <Button className="btn btn-secondary btn-sm ms-2">
                        Iniciar
                    </Button>
                    <Link type="button" to={Paths.WORKOUTS} className="btn btn-secondary btn-sm ms-2">
                        Voltar
                    </Link>
                </div>
            </div>
        </div>
    );

}