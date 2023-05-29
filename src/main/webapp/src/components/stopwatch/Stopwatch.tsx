import { Header } from "../header/Header";
import { Link } from "react-router-dom";
import { Paths } from "../../utils/paths";
import { useEffect, useState } from "react";
import { Button } from "reactstrap";
import iconStopwatch from "../../assets/stopwatch.svg"
import './stopwatch.css';

export const Stopwatch = () => {

  const [timeInSeconds, setTimeInSeconds] = useState<number>(0);
  const [milliseconds, setMilliseconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;

    if (isRunning) {
      intervalId = setInterval(() => {
        setMilliseconds((prevMilliseconds) => {
          const newMilliseconds = prevMilliseconds + 10;
          if (newMilliseconds >= 1000) {
            setTimeInSeconds((prevTime) => prevTime + 1);
            return 0;
          }
          return newMilliseconds;
        });
      }, 10);
    } else {
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);

  const handleReset = () => {
    setTimeInSeconds(0);
    setMilliseconds(0);
  };

  return (
    <div>
      <Header isHome={false} />
      <div className="background-logo container container-default font-page mt-3">
        <div className="text-center">
          <img src={iconStopwatch} alt="stopwatch" className="icon-stopwatch"/>
          <h1 className="text-light">Cronômetro</h1>
        </div>

        <div className="container container-time bg-light text-dark rounded text-center fw-bold display-3 strong mt-5">
          {Math.floor(timeInSeconds / 3600) > 0 && (
            <>
              <span>{Math.floor(timeInSeconds / 3600).toString().padStart(2, '0')}</span>
              <span> : </span>
            </>
          )}
          <span>{Math.floor((timeInSeconds / 60) % 60).toString().padStart(2, '0')}</span>
          <span> : </span>
          <span>{(timeInSeconds % 60).toString().padStart(2, '0')}</span>
          <span> : </span>
          <span>{Math.floor(milliseconds / 10).toString().padStart(2, '0')}</span>
        </div>

        <div className="text-center mt-4">
          {!isRunning ? (
            <>
              <Button className="btn btn-secondary btn-sm ms-2" onClick={() => setIsRunning(true)}>
              {milliseconds === 0 ? 'Iniciar' : 'Retornar'}
              </Button>
              {milliseconds !== 0 && (
                <Button className="btn btn-secondary btn-sm ms-2" onClick={handleReset}>
                  Resetar
                </Button>
              )}
            </>
          ) : (
            <Button className="btn btn-secondary btn-sm ms-2" onClick={() => setIsRunning(false)}>
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