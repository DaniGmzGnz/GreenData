import React,  {Component, useState} from 'react';
import ReactSpeedometer from "react-d3-speedometer";
import './Result2.css';

const Result2 = (props) => {
    const name_org = props.result.Name_organ[0];
    const year = props.result.Year[0];
    const value = props.result.prediction

    // const [value, setValue] = useState(270);

    // const value = props.result.kgCO2_total[0];

    return(
        <div className="main-results">
        <div className="box">
          <div className="head-box">
            <div className="a">{name_org}</div>
            <div className="b">{year}</div>
          </div>
          <div className="boxbox" style={{width: '80%'}}>
            <div className='box-chart' style={{width: ''}}>
            El resultado de la predicción de la huella de carbono de la empresa es: <b><br/> {value} toneladas CO2 (tco2).</b><br/>
            </div>
            <div class="boxes-scope">
              <div class="speed">
              <ReactSpeedometer style={{marginTop: '40px'}}
                width={350}
                minValue={0}
                maxValue={2400}
                segments={3}
                ringWidth={30}
                needleColor={'#616A6Bd0'}
                needleHeightRatio={0.7}
                needleTransitionDuration={3000}
                segmentColors={["#82E0AA", "#F7DC6F", "#EC7063"]}
                currentValueText="${value} tCO2"
                value={parseInt(value, 10)}
              />
              </div>
              <div class="box-scope" style={{marginLeft: '80px', fontSize:'medium', alignContent:'center', alignSelf:'center'}}>
              La gráfica muestra la predicción de la huella de carbono de la empresa respecto los rangos actuales del sector de tu origanización. Actualmente estás en un rango de <b>{value > 1600 ? 'altas' : value > 800 ? 'medias' : 'bajas'}</b> emisiones en tu sector. <br/><br/>
              
              Detalles sobre el error.
              </div>
            </div>
          </div>
        </div>
      </div>
    )

}
export default Result2
