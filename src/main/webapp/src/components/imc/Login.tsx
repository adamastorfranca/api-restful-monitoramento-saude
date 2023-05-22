import { Button } from "reactstrap";
import { Header } from "../header/Header";
import { Link } from "react-router-dom";
import { Paths } from "../../utils/paths";
import { useState } from "react";

export const Login = () => {

    return (
        <div>
            <Header />
            <div className="background-logo to-color container container-default mt-5">
                <div className="text-center">
                    <h5>Faça seu login</h5>
                </div>
                <div className="container-fluid">
                    <div className="row mt-4 p-2">
                        <label className="col col-3 text-end">E-mail</label>
                        <input className="col-7" type="email" />
                    </div>
                    <div className="row p-2">
                        <label className="col-3 text-end">Senha</label>
                        <input className="col-7" type="password"  />
                    </div>
                </div>
                <div className="text-center mt-3">
                    <Link type="button" to={Paths.HOME} className="btn btn-secondary btn-sm">
                        Entrar
                    </Link>
                    <Link type="button" to={Paths.HOME} className="btn btn-secondary btn-sm ms-2">
                        Voltar
                    </Link>
                </div>
                <div className="text-center mt-4">
                    <p>Esqueceu sua senha?</p>
                </div>
            </div>
        </div>
    );

}