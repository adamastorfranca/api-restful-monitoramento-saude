import { Header } from "../header/Header";
import { Link } from "react-router-dom";
import { Paths } from "../../utils/paths";
import { useEffect, useState } from "react";
import { Button } from "reactstrap";
import iconTimer from "../../assets/timer.svg"
import './timer.css'

export const Timer = () => {

  const [timeInSeconds, setTimeInSeconds] = useState<number>(0);
  const [hour, setHour] = useState('00');
  const [minute, setMinute] = useState('00');
  const [second, setSecond] = useState('00');
  const [hourTens, hourUnits] = String(Math.floor(timeInSeconds / 3600)).padStart(2, '0');
  const [minuteTens, minuteUnits] = String(Math.floor(timeInSeconds / 60)).padStart(2, '0');
  const [secondTens, secondUnits] = String(timeInSeconds % 60).padStart(2, '0');
  const [isRunning, setIsRunning] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | undefined>(undefined);
  const audio = new Audio(require("../../audio/timer.mp3"));

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
  
    if (isRunning) {
      const countdown = (count: number = 0) => {
        timeoutId = setTimeout(() => {
          if (count > 0 && isRunning) {
            setTimeInSeconds(count - 1);
            countdown(count - 1);
          } else if (count === 0 && isRunning) {
            audio.play();
            handleStop();
          }
        }, 1000);
      };
  
      countdown(timeInSeconds);
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    }
  
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isRunning, timeInSeconds]);
  
  const handleStop = () => {
    clearTimeout(timeoutId);
    setTimeoutId(undefined);
    setIsRunning(false);
  };

  const handleTimeChange = () => {
    const totalSeconds = parseInt(hour, 10) * 3600 + parseInt(minute, 10) * 60 + parseInt(second, 10);
    setTimeInSeconds(totalSeconds);
    setIsRunning(true);
  };

  return (
    <div>
      <Header isHome={false} />
      <div className="background-logo container container-default font-page mt-3">

        <div className="text-center">
          <img src={iconTimer} alt="stopwatch" className="icon-timer"/>
          <h1 className="text-light">Timer</h1>
        </div>

        {!isRunning ? (
          <div className="text-center mt-5">
            <input type="number" 
              placeholder="00" 
              min="0" max="23" 
              value={hour.padStart(2, '0')} 
              onChange={(e) => setHour(e.target.value)} 
              className="input-time" /> h :
            <input type="number"
              placeholder="00" 
              min="0" max="59" 
              value={minute.padStart(2, '0')} 
              onChange={(e) => setMinute(e.target.value)} 
              className="input-time" /> m :
            <input type="number"
              placeholder="00" 
              min="0" max="59" 
              value={second.padStart(2, '0')} 
              onChange={(e) => setSecond(e.target.value)} 
              className="input-time" /> s
          </div>
        ) : (
          <div className="container container-time bg-light text-dark rounded text-center fw-bold display-3 strong mt-5">
            <span>{hourTens}</span>
            <span>{hourUnits}</span>
            <span> : </span>
            <span>{minuteTens}</span>
            <span>{minuteUnits}</span>
            <span> : </span>
            <span>{secondTens}</span>
            <span>{secondUnits}</span>
          </div>
        )}

        <div className="text-center mt-4">
          {!isRunning ? (
            <Button className="btn btn-secondary btn-sm ms-2" onClick={handleTimeChange} hidden={hour === '00' && minute === '00' && second === '00'}>
              Iniciar
            </Button>
          ) : (
            <Button className="btn btn-secondary btn-sm ms-2" onClick={handleStop}>
              Parar
            </Button>
          )}
          <Link type="button" to={Paths.HOME} className="btn btn-secondary btn-sm ms-2">
            Voltar
          </Link>
        </div>
      </div>
    </div>
  );

}