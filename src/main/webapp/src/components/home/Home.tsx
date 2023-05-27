import { ReactSVG } from "react-svg";
import logo from "../../assets/logo.svg"
import { Header } from "../header/Header";
import { Link } from "react-router-dom";
import { Paths } from "../../utils/paths";
import "./home.css"

export const Home = () => {

    return (
        <>
            <Header />
            <div className='container container-logo'>
                <div className='container' >
                    <ReactSVG src={logo} className="home-logo to-color" />
                </div>
                <div className='container d-flex align-items-center justify-content-center'>
                    <h1 className="my-auto">Life HIIT</h1>
                </div>
                <div className='container mt-5 d-flex align-items-center justify-content-center'>
                    <Link to={Paths.WORKOUTS} type="button" className="btn btn-secondary btn-home">Treinos intervalados</Link>
                </div>
                <div className='container mt-4 d-flex align-items-center justify-content-center'>
                    <Link to={Paths.STOPWATCH} type="button" className="btn btn-secondary btn-home">Cronômetro</Link>
                </div>
                <div className='container mt-4 d-flex align-items-center justify-content-center'>
                    <Link to={Paths.TIMER} type="button" className="btn btn-secondary btn-home">Timer</Link>
                </div>
                <div className='container mt-4 d-flex align-items-center justify-content-center'>
                    <Link to={Paths.IMC} type="button" className="btn btn-secondary btn-home" >IMC</Link>
                </div>
                <div className='container mt-4 d-flex align-items-center justify-content-center'>
                    <Link to={Paths.FAT_PERCENTAGE} type="button" className="btn btn-secondary btn-home">% de gordura</Link>
                </div>
                <div className='container mt-4 d-flex align-items-center justify-content-center'>
                    <Link to={Paths.CALORIC_EXPENDITURE} type="button" className="btn btn-secondary btn-home">Gasto calórico basal</Link>
                </div>
            </div>
        </>
    );

}
