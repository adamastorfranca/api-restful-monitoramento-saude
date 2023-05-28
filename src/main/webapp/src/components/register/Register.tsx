import { useNavigate } from 'react-router-dom';
import { Header } from "../header/Header";
import { Link } from "react-router-dom";
import { Paths } from "../../utils/paths";
import { Button } from "reactstrap";
import { useState } from "react";
import axios from "axios";
import iconRegister from "../../assets/register.svg";
import './register.css';

export const Register = () => {

    const [name, setName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate()
      
    function register() {
        const data = { name, birthDate, email, password };

        axios.post('http://localhost:8080/users/register', data)
            .then(response => {
                console.log(response.data);
                navigate(Paths.HOME);
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <div>
            <Header />
            <div className="background-logo container container-default mt-5">
                <div className="text-center">
                    <img src={iconRegister} alt="register" className="icon-register"/>
                    <h5 className="text-light">Preencha com suas informações</h5>
                </div>
                <div className="container-fluid mt-5">
                <div className="row p-2">
                    <label className="col col-5">Nome</label>
                    <input className="col-7" type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
                </div>
                <div className="row p-2">
                    <label className="col col-5">Nascimento</label>
                    <input className="col-7" type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required/>
                </div>
                <div className="row p-2">
                    <label className="col col-5">E-mail</label>
                    <input className="col-7" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div className="row p-2">
                    <label className="col-5">Senha</label>
                    <input className="col-7" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <div className="row p-2">
                    <label className="col-5">Repetir senha</label>
                    <input className="col-7" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
                </div>
                </div>
                <div className="text-center mt-4">
                    <Button onClick={register} className="btn btn-secondary btn-sm">
                        Cadastrar
                    </Button>
                    <Link type="button" to={Paths.HOME} className="btn btn-secondary btn-sm ms-2">
                        Voltar
                    </Link>
                </div>
            </div>
        </div>
    );

}