import { Header } from "../header/Header";
import iconWorkout from "../../assets/workout.svg";
import { Link, useParams } from "react-router-dom";
import { Paths } from "../../utils/paths";
import { useEffect, useRef, useState } from "react";
import { IWorkout } from "../../interfaces/workout-model";
import axios from "axios";
import { Button } from "reactstrap";
import './workout.css';

export const Workout = () => {

    const { slug } = useParams<{ slug: string }>(); 
    const [workout, setWorkout] = useState<IWorkout>();
    const [durationInMinutes, setDurationInMinutes] = useState<number>(0);
    const [timeInSeconds, setTimeInSeconds] = useState<number>(0);
    const [countdown, setCountdown] = useState<number>(0);
    const [heating, setHeating] = useState<number>(0);
    const [highIntensityTime, setHighIntensityTime] = useState<number>(0);
    const [restTime, setRestTime] = useState<number>(0);
    const [repetitions, setRepetitions] = useState<number>(0);
    const [stopwatch, setStopwatch] = useState<number>(0);
    const [repetitionsActual, setRepetitionsActual] = useState<number>(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const startTimeRef = useRef<number | null>(null);
    const [color, setColor] = useState<string>('bg-danger');
    const [label, setLabel] = useState<string>('Alta intensidade');
    const audioBeep = new Audio(require("../../audio/beep.mp3"));
    const audioDoubleBeep = new Audio(require("../../audio/double-beep.mp3"));
    audioBeep.volume = 0.1;
    audioDoubleBeep.volume = 0.1;

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
        if (workout && workout.heating && workout.highIntensityTime && workout.restTime && workout.repetitions) {
            setHighIntensityTime(workout.highIntensityTime);
            setRestTime(workout.restTime);
            setHeating(workout.heating);
            setRepetitions(workout.repetitions);
            setCountdown((((workout.highIntensityTime + workout.restTime) * workout.repetitions) - workout.restTime) + workout.heating);
            setDurationInMinutes(((((workout.highIntensityTime + workout.restTime) * workout.repetitions) - workout.restTime) + workout.heating) / 60);
        }
    }, [workout]);

    useEffect(() => {
        let intervalId: NodeJS.Timeout | undefined;
        let startTime: number | null = null;
        let currentRound = 0;
        let intensityRound = 0;
        let timeLeft = highIntensityTime * 1000;
        let isHeating = true;
      
        const handleInterval = () => {
            const currentTime = performance.now();
            const elapsedTime = currentTime - (startTime as number);
            const timeRemaining = timeLeft - elapsedTime;
      
            if (isHeating) {
                timeLeft = heating * 1000;
                setLabel('Aquecimento');
                setColor('bg-warning');
                isHeating = false;
            } else if (timeRemaining > 0) {
                setTimeInSeconds(Math.ceil(timeRemaining / 1000));
            } else {
                if (currentRound % 2 !== 0) {
                    timeLeft = restTime * 1000;
                    audioBeep.play();
                    setLabel('Descanso');
                    setColor('bg-primary');
                } else {
                    timeLeft = highIntensityTime * 1000;
                    audioDoubleBeep.play();
                    setLabel('Alta intensidade');
                    setColor('bg-danger');
            
                    intensityRound++;
        
                    if (intensityRound <= repetitions) {
                        setRepetitionsActual(intensityRound);
                    }
                }
      
                currentRound++;
        
                if (currentRound > (repetitions * 2) - 1) {
                    clearInterval(intervalId as NodeJS.Timeout);
                    setIsFinished(true);
                } else {
                    startTime = performance.now();
                }
            }
        };
      
        if (isRunning) {
            setRepetitionsActual(currentRound);
            startTime = performance.now();
            intervalId = setInterval(handleInterval, 10);
        }
      
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isRunning]);

    useEffect(() => {
        let intervalId: NodeJS.Timeout | null = null;
    
        if (isRunning) {
            startTimeRef.current = performance.now();
            intervalId = setInterval(() => {
                const currentTime = performance.now();
                const elapsedTime = currentTime - (startTimeRef.current || 0);
                const elapsedSeconds = Math.floor(elapsedTime / 1000);
                
                setStopwatch(elapsedSeconds);
                
                const remainingSeconds = countdown - elapsedSeconds;
                if (remainingSeconds >= 0) {
                    setCountdown(remainingSeconds);
                    setStopwatch(elapsedSeconds);
                } else {
                    setStopwatch(elapsedSeconds - 1);
                    clearInterval(intervalId!);
                }

            }, 1000);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            startTimeRef.current = null;
        }
        
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isRunning]);

    const handleInit = () => {
        setIsRunning(true);
        setIsFinished(false);
        setCountdown((((highIntensityTime + restTime) * repetitions) - restTime) + heating);
    };

    const handleStop = () => {
        setIsRunning(false);
        setTimeInSeconds(0);
        setCountdown((((highIntensityTime + restTime) * repetitions) - restTime) + heating);
        setStopwatch(0);
        setRepetitionsActual(0);
    };

    return (    
        <div>
            <Header isHome={false} />
            <div className="background-logo container container-default mt-3">
                <div className="text-center">
                    <img src={iconWorkout} alt="workout" className="icon-workout"/>
                    <h1 className="text-white">{workout?.name}</h1>
                </div>

                {!isRunning ? (
                    <>
                        <div className='container mt-5'>
                            <p className="text-justify">{workout?.description}</p>
                        </div>
                        <div className='text-white small mt-4'>
                            <div className="row">
                                <p className="col col-6 text-end">Duração: </p>
                                <p className="col col-6">{durationInMinutes.toFixed(0)} minutos</p>
                            </div>
                            <div className="row">
                                <p className="col col-6 text-end">Intervalos: </p>
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
                    </>
                ) : (
                    <>
                        {!isFinished ? (
                            <div className={`${color} ${label === 'Aquecimento' ? 'text-dark' : 'text-light' } text-light rounded text-center mt-5`}>
                                <p className="display-6 fw-bold pt-2 mb-1">{label}</p>
                                <div className="fw-bold display-1 strong pb-2">
                                    <span>{Math.floor((timeInSeconds / 60) % 60).toString().padStart(2, '0')}</span>
                                    <span> : </span>
                                    <span>{(timeInSeconds % 60).toString().padStart(2, '0')}</span>
                                </div>
                            </div>
                        ) : (
                            <div className={`bg-success text-light rounded text-center mt-5`}>
                                <p className="fw-bold display-6 strong pt-3">Treino finalizado!</p>
                                <p className="fw-bold display-5 strong pb-3">Parabéns!</p>
                            </div>
                        )}
                        <div className="bg-light text-dark rounded text-center mt-3">
                            <div>
                                <p className="mb-1 pt-3">Intervalos de alta intensidade</p>
                                <div className="fw-bold display-6 strong">
                                    <p>{repetitionsActual} / {repetitions}</p>
                                </div>
                            </div>
                            <div>
                                <p className="mb-1">Tempo percorrido</p>
                                <div className="fw-bold display-6 strong pb-2">
                                    <span>{Math.floor((stopwatch / 60) % 60).toString().padStart(2, '0')}</span>
                                    <span> : </span>
                                    <span>{(stopwatch % 60).toString().padStart(2, '0')}</span>
                                </div>
                            </div>
                            <div>
                                <p className="mb-1">Tempo restante</p>
                                <div className="fw-bold display-6 strong pb-3">
                                    <span>{Math.floor((countdown / 60) % 60).toString().padStart(2, '0')}</span>
                                    <span> : </span>
                                    <span>{(countdown % 60).toString().padStart(2, '0')}</span>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                <div className="text-center mt-4">
                    {!isRunning ? (              
                        <Button className="btn btn-secondary btn-sm ms-2" onClick={handleInit}>
                            Iniciar
                        </Button>
                    ) : (
                        <>
                            {!isFinished && (
                                <Button className="btn btn-secondary btn-sm ms-2" onClick={handleStop}>
                                    Parar
                                </Button>
                            )}
                        </>
                    )}
                    <Link type="button" to={Paths.WORKOUTS} className="btn btn-secondary btn-sm ms-2">
                        Voltar
                    </Link>
                </div>
            </div>
        </div>
    );

}