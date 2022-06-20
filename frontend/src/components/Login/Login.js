import React, { useState } from 'react'
import './Login.css'
import avatar from '../../img/logo-2.png'

const Login = ({ close }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
      
    return(
        <div style={loginContainer}>
            <div class="login-box">
                <img src={avatar} class="avatar" alt="Avatar Image"/>
                <h1>Inicio de Sesión</h1>
                <form>
                    <label for="username">Usuario</label>
                    <input type="text" placeholder="Nombre de Usuario" 
                    onChange={event => setUsername(event.target.value)}/>
                    <label for="password">Contraseña</label>
                    <input type="password" placeholder="Contraseña de Usuario"
                    onChange={event => setPassword(event.target.value)}/>
                    <input type="button" onClick={() => { 
                                            username === '' && password === '' ? 
                                            close(b => !b) : 
                                            password === 'green' ? 
                                            alert("Usuario no válido.") : 
                                            username !== 'greendata' ? 
                                            alert("Usuario no válido"): 
                                            alert("Contraseña incorrecta.") }} 
                    value="Iniciar"/>
                    <a href="#">Has olvidado tu contraseña?</a><br/>
                    <a href="#">No tienes una cuenta?</a>
                </form>
            </div>
        </div>
    )
}

export default Login

const loginContainer = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(20px)',
    backgroundColor: 'rgba(0,0,0,0.1)'
}