import React, { useState } from 'react'
import './Login.css'
import avatar from '../../img/logo-2.png'

const Login = ({ close }) => {
    return(
        <div style={loginContainer}>
            <div class="login-box">
            <img src={avatar} class="avatar" alt="Avatar Image"/>
            <h1>Log-In</h1>
            <form>
                <label for="username">Username</label>
                <input type="text" placeholder="Enter Username"/>
                    <label for="password">Password</label>
                    <input type="password" placeholder="Enter Password"/>
                    <input type="button" onClick={close} value="Log-In" />
                <a href="#">Lost your Password?</a><br/>
                <a href="#">Don't have An account?</a>
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