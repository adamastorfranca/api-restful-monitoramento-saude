import { Navbar } from "reactstrap";
import logo from "../../assets/logo.svg"
import { useScreenSize } from "../../utils/device-screen-size";
import { Link } from "react-router-dom";
import { Paths } from "../../utils/paths";
import "./header.css"

export const Header = () => {

    const screenSize = useScreenSize();

    return (
        <Navbar className="bg-secondary">
            <Link to={Paths.HOME} className="d-flex text-decoration-none text-reset">
                <img src={logo} alt="Logo" className="header-img-logo"/>
                <h2 className={`my-auto ${!screenSize.isDesktop && 'fw-bold'}`}>
                    L{screenSize.isDesktop && 'ife '}H{screenSize.isDesktop && 'IIT'}
                </h2>
            </Link>
            <div>
                <Link to={Paths.LOGIN} type="button" className="btn btn-outline-dark  btn-sm ms-2">
                    Entrar
                </Link>
                <Link to={Paths.REGISTER} type="button" className="btn btn-dark  btn-sm ms-2" >
                    Cadastre-se
                </Link>
            </div>
        </Navbar>
    );

}