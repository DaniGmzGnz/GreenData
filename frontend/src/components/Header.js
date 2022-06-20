import React,  {Component, useState} from 'react';
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink, useLocation } from "react-router-dom";
import { faHome, faSignIn, faDatabase, faBarChart, faClipboardList, faSignOut } from '@fortawesome/free-solid-svg-icons'
import {AnimateSharedLayout, motion} from 'framer-motion'
import { useNavigate } from "react-router-dom";
import './Main/style.css';
import planet from '../img/planet-earth2.png';
import logo from '../img/gris.svg';
import Login from './Login/Login';


const Header = () => {

    const [expanded, setExpanded] = useState(false)

    const [predict, setPredict] = useState(false)

    let location = useLocation()


    return (<>
    <div class="containerStyle">
        
        <AnimateSharedLayout>
            {
                expanded? (<>
                    <img src={logo} style={{height: '63px', paddingRight: '20px'}} alt=""/>
                    <ExpandedLogin setExpanded={()=>setExpanded(false)}/>
                    <Link to='/' style={{backgroundColor: location.pathname==='/' ? 'rgb(243, 249, 235)' : '', color: location.pathname==='/' ? '' : ''}} class="Link"><FontAwesomeIcon icon={faHome}/>&nbsp;&nbsp;Inicio</Link>
                    <br/><br/><br/>  
                    </>):
                    <>
                    <img src={logo} style={{height: '63px', paddingRight: '20px'}} alt=""/>  
                    <Link to='/' style={{backgroundColor: location.pathname==='/' ? 'rgb(243, 249, 235)' : '', color: location.pathname==='/' ? '' : ''}} class="Link"><FontAwesomeIcon icon={faHome}/>&nbsp;&nbsp;Inicio</Link>
                    <CompactLogin setExpanded={()=>setExpanded(true)}/>           
                    </>
            }
        </AnimateSharedLayout>
        
        {!predict && expanded ? 
        <>
        <Link to='/input' style={{backgroundColor: location.pathname==='/input' ? 'rgb(243, 249, 235)' : '', color: location.pathname==='/input' ? '#3e9762' : ''}} class="Link"><FontAwesomeIcon icon={faDatabase}/>&nbsp;&nbsp;Datos</Link>
        <Link to='/result' style={{backgroundColor: location.pathname==='/result' ? 'rgb(243, 249, 235)' : '', color: location.pathname==='/result' ? '#3e9762' : ''}} class="Link"><FontAwesomeIcon icon={faBarChart}/>&nbsp;&nbsp;Resultados</Link>
        <Link to='/recommend' style={{backgroundColor: location.pathname==='/recommend' ? 'rgb(243, 249, 235)' : '', color: location.pathname==='/recommend' ? '#3e9762' : ''}} class="Link"><FontAwesomeIcon icon={faClipboardList} aria-hidden="true"/>&nbsp;&nbsp;Recomendaciones</Link>
        <div className='Service' style={{width:'170px', fontSize:'21px'}}>Servicio Análisis</div>
        </> : 
        predict && expanded ?
        <>
        <Link to='/input2' style={{backgroundColor: location.pathname==='/input2' ? 'rgb(243, 249, 235)' : '', color: location.pathname==='/input' ? '#3e9762' : ''}} class="Link"><FontAwesomeIcon icon={faDatabase}/>&nbsp;&nbsp;Datos</Link>
        <Link to='/result2' style={{backgroundColor: location.pathname==='/result2' ? 'rgb(243, 249, 235)' : '', color: location.pathname==='/result' ? '#3e9762' : ''}} class="Link"><FontAwesomeIcon icon={faBarChart}/>&nbsp;&nbsp;Resultados</Link>
        <div className='Service' style={{width:'200px', fontSize:'21px'}}><p>Servicio Predicción</p></div>
        </> :
        <>
        </>}
    </div>
    </>)
}

// LOGIN SETUP
function CompactLogin ({setExpanded}){
    let location = useLocation()

    return(
        <motion.div className='CompactLogin'
        onClick={setExpanded}
        layoutId='expandableLogin'>
            <div to='/' style={{backgroundColor: location.pathname==='/' ? 'rgb(78, 158, 223)' : ''}} 
            class="LinkInicio"><FontAwesomeIcon icon={faSignIn}/>&nbsp;&nbsp;Iniciar Sesión</div>
        </motion.div>
    )
}

function ExpandedLogin ({setExpanded}){
    let location = useLocation()

    let navigate = useNavigate({setExpanded}); 

    const [login, setLogin] = useState(true)

    return(
        <>
        <motion.div className='ExpandedLogin'
        layoutId='expandableLogin'>
            <div to='/' onClick={() => {
                navigate('/')
                setExpanded(b => !b)
            }} style={{backgroundColor: location.pathname==='/' ? 'rgb(78, 158, 223)' : ''}} 
            class="LinkInicio"><FontAwesomeIcon icon={faSignOut}/></div>
        </motion.div>
        {login &&
        <motion.div>
            <Login close={() => setLogin(false)}/>
        </motion.div>
        }
        </>
    )
}

export default Header


