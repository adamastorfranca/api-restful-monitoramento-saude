import { Navbar } from "reactstrap";
import { Link } from "react-router-dom";
import { Paths } from "../../utils/paths";
import logo from "../../assets/logo.svg"
import "./header.css"

export const Header = ({ isHome }: { isHome: boolean }) => {

    return (
        <Navbar className="bg-secondary">
            <Link to={Paths.HOME} className="d-flex text-decoration-none text-reset">
                <img src={logo} alt="Logo" className="header-img-logo"/>
                {!isHome ? (
                    <h2 className="my-auto fw-bold">Life HIIT</h2>
                ) : (
                    <h2 className="my-auto fw-bold">LH</h2>
                )}
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