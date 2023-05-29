import { Header } from "../header/Header";
import iconWorkout from "../../assets/workout.svg";
import { Link } from "react-router-dom";
import { Paths } from "../../utils/paths";
import { useEffect, useRef, useState } from "react";
import { Button } from "reactstrap";
import './workout.css';

export const WorkoutPersonalized = () => {

    const [heating, setHeating] = useState<number>(0);
    const [timeInSeconds, setTimeInSeconds] = useState<number>(0);
    const [countdown, setCountdown] = useState<number>(0);
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
                    <h1 className="text-white">Treino personalizado</h1>
                </div>

                {!isRunning ? (
                    <div className="container-fluid mt-4">
                        <div className="row p-2">
                            <label className="col-6 text-end mt-1">Aquecimento</label>
                            <input className="form-control-sm col-3" placeholder="seg" type="number"  min={5} max={600} onChange={(e) => {setHeating((Number(e.target.value)))}}required />
                        </div>
                        <div className="row p-2">
                            <label className="col-6 text-end mt-1">Alta intensidade</label>
                            <input className="form-control-sm col-3" placeholder="seg" type="number"  min={5} max={600} onChange={(e) => {setHighIntensityTime((Number(e.target.value)))}}required />
                        </div>
                        <div className="row p-2">
                            <label className="col-6 text-end mt-1">Descanso</label>
                            <input className="form-control-sm col-3" placeholder="seg" type="number" min={5} max={600} onChange={(e) => {setRestTime((Number(e.target.value)))}}required />
                        </div>
                        <div className="row p-2">
                            <label className="col-6 text-end mt-1">Intervalos</label>
                            <input className="form-control-sm col-3" type="number"  min={2} max={600} required onChange={(e) => {setRepetitions((Number(e.target.value)))}}/>
                        </div>
                    </div>
                ) : (
                    <>
                        {!isFinished ? (
                            <div className={`${color} ${label === 'Aquecimento' ? 'text-dark' : 'text-light' } rounded text-center mt-5`}>
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