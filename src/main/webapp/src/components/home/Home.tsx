import { ReactSVG } from "react-svg";
import { useScreenSize } from "../../utils/device-screen-size";
import logo from "../../assets/logo.svg"
import { Header } from "../header/Header";
import "./home.css"
import { Button } from "reactstrap";

export const Home = () => {

    const screenSize = useScreenSize();

    return (
        <>
            <Header />
            <div className='container container-logo'>
                <div className='container' >
                    <ReactSVG src={logo} className="background-logo to-color" />
                </div>
                <div className='container d-flex align-items-center justify-content-center'>
                    <h1 className="my-auto">L{!screenSize.isDesktop && 'ife '}H{!screenSize.isDesktop && 'IIT'}</h1>
                </div>
                <div className='container mt-5 d-flex align-items-center justify-content-center'>
                    <Button className="btn-home">Treino intervalado</Button>
                </div>
                <div className='container mt-4 d-flex align-items-center justify-content-center'>
                    <Button className="btn-home">Cronômetro</Button>
                </div>
                <div className='container mt-4 d-flex align-items-center justify-content-center'>
                    <Button className="btn-home">Timer</Button>
                </div>
                <div className='container mt-4 d-flex align-items-center justify-content-center'>
                    <Button className="btn-home">IMC</Button>
                </div>
                <div className='container mt-4 d-flex align-items-center justify-content-center'>
                    <Button className="btn-home">% de gordura</Button>
                </div>
                <div className='container mt-4 d-flex align-items-center justify-content-center'>
                    <Button className="btn-home">Gasto calórico</Button>
                </div>
            </div>
        </>
    );

}