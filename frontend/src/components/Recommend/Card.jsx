import React, { useState } from 'react'
import {AnimateSharedLayout, motion} from 'framer-motion'
import './recommend.css';

import cloud from '../../img/cloud.png';
import {UilTimes} from "@iconscout/react-unicons"
import RecommendChart from './Chart';

const Card = (props) => {

    const [expanded, setExpanded] = useState(false)

    return(
        <AnimateSharedLayout>
            {
                expanded? (<ExpandedCard param={props} setExpanded={()=>setExpanded(false)}/>
                ):
                <CompactCard param={props} setExpanded={()=>setExpanded(true)}/>
            }
        </AnimateSharedLayout>
    )
}

// COMPACT CARD
function CompactCard ({param, setExpanded}){
    return(
        <motion.div className='CompactCard'
        onClick={setExpanded}
        layoutId='expandableCard'>
            <div className='box-scope-r'>
                <img src={cloud} style={{height: '80px'}} alt=""/>
                <span>{param.value}%</span>
            </div>
            <div className='measures'>
                <span>{param.text}</span>
            </div>
        </motion.div>
    )
}

function ExpandedCard ({param, setExpanded}){
    return(
        <motion.div className='ExpandedCard'
        layoutId='expandableCard'>
            <div style={{alignSelf: 'flex-end', cursor: 'pointer', color: 'black'}}>
                <UilTimes onClick={setExpanded}/>
            </div>
            <div style={{textAlign: "justify", width:"90%", margin:"auto", color:"white"}}>
                <span >Se ofrecen 5 escenarios distintos para conseguir la reducción de huella de carbono deseada por el cliente. En cada uno se fija un porcentaje máximo (respecto al total de la reducción) a reducir con el consumo de electricidad. El resto se intenta reducir con el consumo de combustible fósil (por parte de los vehículos). Si no se llega al objetivo que ha marcado el cliente, se plantea la posibilidad de reducir el consumo de gas. En caso de que no se llegue al objetivo se contemplará el uso de métodos de compensación.</span>
            </div>
            <div>
                <RecommendChart param={param}/>
            </div>
            <div style={{textAlign: "justify", width:"90%", margin:"auto", color:"white", marginBottom:"30px"}}>
                Información adicional
            </div>
        </motion.div>
    )
}

export default Card