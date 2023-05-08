import { Button, Navbar } from "reactstrap";
import logo from "../../assets/logo.svg"
import "./header.css"
import { useScreenSize } from "../../utils/device-screen-size";

export const Header = () => {

    const screenSize = useScreenSize();

    return (
        <Navbar className="bg-secondary">
            <div className="d-flex">
                <img src={logo} alt="Logo" className="header-img-logo"/>
                <h2 className={`my-auto ${!screenSize.isDesktop && 'fw-bold'}`}>
                    L{screenSize.isDesktop && 'ife '}H{screenSize.isDesktop && 'IIT'}
                </h2>
            </div>
            <div>
                <Button className="btn-outline-dark btn-sm">
                    Entrar
                </Button>
                <Button className="btn-dark btn-sm ms-2">
                    Cadastre-se
                </Button>
            </div>
        </Navbar>
    );

}