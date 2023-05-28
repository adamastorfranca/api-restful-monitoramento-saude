import { Header } from "../header/Header";
import { Link } from "react-router-dom";
import { Paths } from "../../utils/paths";
import iconLogin from "../../assets/login.svg";
import './login.css';

export const Login = () => {

    return (
        <div>
            <Header />
            <div className="background-logo to-color container container-default mt-5">
                <div className="text-center">
                    <img src={iconLogin} alt="login" className="icon-login"/>
                    <h1 className="text-light">Faça seu login</h1>
                </div>
                <div className="container-fluid mt-5">
                    <div className="row p-2">
                        <label className="col col-3 text-end">E-mail</label>
                        <input className="col-7" type="email" />
                    </div>
                    <div className="row p-2">
                        <label className="col-3 text-end">Senha</label>
                        <input className="col-7" type="password"  />
                    </div>
                </div>
                <div className="text-center">
                    <p className="small">Esqueceu sua senha?</p>
                </div>
                <div className="text-center mt-4">
                    <Link type="button" to={Paths.HOME} className="btn btn-secondary btn-sm">
                        Entrar
                    </Link>
                    <Link type="button" to={Paths.HOME} className="btn btn-secondary btn-sm ms-2">
                        Voltar
                    </Link>
                </div>

            </div>
        </div>
    );

}