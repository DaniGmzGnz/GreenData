import ReactSpeedometer from "react-d3-speedometer";
import React, { useState } from "react";
import './results.css';
import BarChart from './BarChart';
import PieChart from './PieChart';

export default function Result(props) {
  console.log("1", props)
  const name_org = props.result.Name_organ[0];
  const year = props.result.Year[0];

  const value = props.result.kgCO2_total[0] / 1000;

    return (
      <div class="main-results">
        <div class="box">
          <div class="head-box">
            <div class="a">{name_org}</div>
            <div class="b">{year}</div>
          </div>
          <div class="boxbox">
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
              <b>Tu huella de CO2 actualmente es de: <br/> {value} toneladas CO2 (tco2).</b><br/><br/>
              La gráfica muestra la huella de la empresa respecto los rangos actuales del sector de tu origanización. Actualmente estás en un rango de <b>{value > 1600 ? 'altas' : value > 800 ? 'medias' : 'bajas'}</b> emisiones en tu sector. <br/><br/>
              
              Tu huella de carbono podría reducirse aún más, consulta nuestro servicio de recomendaciones para más información.
              </div>
            </div>
            <div class="box-chart">
              <BarChart  result={props.result}></BarChart>
              <div style={{textAlign: "justify", fontSize: "14px", width: "75%", margin: "auto"}}><span>En el gráfico anterior se puede observar el consumo de CO2 de manera más detallada. Además, se puede observar el punto medio de consumo del sector al que pertenece tu empresa para cada una de las subdivisiones.</span></div>
            </div>
            <div class="boxes-scope">
              <div class="box-scope" style={{marginRight: '80px'}}>
              Las emisiones de alcance 1 son emisiones directas de GEI (Gases Efecto Invernadero) que ocurren de fuentes que son propiedad de o están controladas por la empresa. Por ejemplo, emisiones provenientes de la combustión en calderas, hornos, vehículos, emisiones provenientes de la producción química en equipos de proceso, etc.<br/><br/>
              Las emisiones de alcance 2 son emisiones indirectas de GEI asociadas a las emisiones de la generación de electricidad adquirida y consumida por la empresa. Electricidad adquirida se define como la electricidad que es comprada, o traída dentro del límite organizacional de la empresa.<br/><br/>
              Las emisiones del alcance 3 son consecuencia de las actividades de la empresa, pero ocurren en fuentes que no son propiedad ni están controladas por la empresa. Algunos ejemplos son la extracción y producción de materiales adquiridos, el transporte de combustibles adquiridos y el uso de productos y servicios vendidos.
              </div>
              <PieChart  result={props.result}></PieChart>
            </div>
          </div>
        </div>
      </div>

      );
  }

