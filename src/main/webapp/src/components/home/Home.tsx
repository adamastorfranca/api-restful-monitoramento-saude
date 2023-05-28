import { ReactSVG } from "react-svg";
import logo from "../../assets/logo.svg"
import { Header } from "../header/Header";
import { Link } from "react-router-dom";
import { Paths } from "../../utils/paths";
import google from "../../assets/google.svg"
import facebook from "../../assets/facebook.svg"
import twitter from "../../assets/twitter.svg"
import instagram from "../../assets/instagram.svg"
import "./home.css"

export const Home = () => {

    return (
        <div>
            <Header isHome={true} />
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
                    <Link to={Paths.CALORIC_EXPENDITURE} type="button" className="btn btn-secondary btn-home  mb-2">Gasto calórico basal</Link>
                </div>
                <div className="mt-4 ms-4">
                    <Link to="https://www.google.com">
                        <img src={google} alt="google" className="img-google ms-2" />
                    </Link>
                    <Link to="https://www.facebook.com">
                        <img src={facebook} alt="facebook" className="img-facebook" />
                    </Link>
                    <Link to="https://www.instagram.com">
                        <img src={instagram} alt="instagram" className="img-instagram" />
                    </Link>
                    <Link to="https://www.twitter.com">
                        <img src={twitter} alt="twitter" className="img-twitter ms-2" />
                    </Link>
                </div>
            </div>
        </div>
    );

}
