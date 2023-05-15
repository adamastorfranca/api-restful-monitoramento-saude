import { ReactSVG } from "react-svg";
import { useScreenSize } from "../../utils/device-screen-size";
import logo from "../../assets/logo.svg"
import { Header } from "../header/Header";
import "./home.css"
import { Link } from "react-router-dom";
import { Paths } from "../../utils/paths";

export const Home = () => {

    const screenSize = useScreenSize();

    return (
        <>
            <Header />
            <div className='container container-logo'>
                <div className='container' >
                    <ReactSVG src={logo} className="home-logo to-color" />
                </div>
                <div className='container d-flex align-items-center justify-content-center'>
                    <h1 className="my-auto">L{!screenSize.isDesktop && 'ife '}H{!screenSize.isDesktop && 'IIT'}</h1>
                </div>
                <div className='container mt-5 d-flex align-items-center justify-content-center'>
                    <Link to={Paths.HOME} type="button" className="btn btn-secondary btn-home">Treino intervalado</Link>
                </div>
                <div className='container mt-4 d-flex align-items-center justify-content-center'>
                    <Link to={Paths.HOME} type="button" className="btn btn-secondary btn-home">Cronômetro</Link>
                </div>
                <div className='container mt-4 d-flex align-items-center justify-content-center'>
                    <Link to={Paths.HOME} type="button" className="btn btn-secondary btn-home">Timer</Link>
                </div>
                <div className='container mt-4 d-flex align-items-center justify-content-center'>
                    <Link to={Paths.IMC} type="button" className="btn btn-secondary btn-home" >IMC</Link>
                </div>
                <div className='container mt-4 d-flex align-items-center justify-content-center'>
                    <Link to={Paths.HOME} type="button" className="btn btn-secondary btn-home">% de gordura</Link>
                </div>
                <div className='container mt-4 d-flex align-items-center justify-content-center'>
                    <Link to={Paths.HOME} type="button" className="btn btn-secondary btn-home">Gasto calórico</Link>
                </div>
            </div>
        </>
    );

}