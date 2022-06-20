import './style.css';

import footprint from '../../img/footprint.png';
import dataanalytics from '../../img/dataanalytics.png';
import interfacee from '../../img/interface.png';
import fprint from '../../img/fprint.svg';


export default function Main() {
    return (
      <main>
        <div>
          <div class="head" style={{width:"90%", margin:"auto"}}>
              <h1 class="titulo-main">Des de Green Data luchamos para salvar el planeta.</h1>
              <p class="copy"></p>
          </div>
        </div>
        <div class="container-mid">
          <section class="contenedor" id="expertos">
              <h2 class="subtitulo">Expertos en</h2>
              <section class="experts">
                  <div class="cont-expert">
                      <img src={footprint} alt=""/>
                      <h3 class="n-expert">Cambio Climático</h3><br/><br/>
                      <p>Nuestros trabajadores estan documentados con todos los canvios mas actuales sobre el cambio climático. Disponemos de toda la información necesaria para satisfacer al máximo las necesidades del cliente y manterlos informados sobre nuevas actualizaciones. </p>
                  </div>
                  <div class="cont-expert">
                      <img src={dataanalytics} alt=""/>
                      <h3 class="n-expert">Análisis de Datos</h3><br/><br/>
                      <p>Disponemos de estudiantes del grado en ciencia e ingenieria de datos que disponen de habilidades avanzadas relacionadas con el análisi de datos y el trato de estos. Disponen de técnicas avanzadas para el cálculo de las emisiones y su correspondiente análisis. </p>
                  </div>
                  <div class="cont-expert">
                      <img src={interfacee} alt=""/>
                      <h3 class="n-expert">Visualizaciones</h3><br/><br/>
                      <p>Nuestros trabajadores disponen de cualidades para realizar las mejores visualizaciones posibles mediante las herramientas mas efectivas para este trabajo ajustándose a las necesidades del cliente y la tarea a realizar. </p>
                  </div>
              </section>
          </section>
          <section class="services-contenedor" id="servicio">
              <h2 class="subtitulo">Nuestro servicio</h2>
              <div class="contenedor-servicio">
                  <img src={fprint} alt=""/>
                  <div class="checklist-servicio">
                      <div class="service">
                          <h3 class="n-service"><span class="number">1</span>Cálculo Huella de Carbono</h3>
                          <p> El objetivo es definir el proceso de cálculo de la huella de dióxido de carbono de las organizaciones a través de una exploración exhaustiva de la calculadora del Ministerio para la Transición Ecológica. También la exploración de vías de mejora para minimizar la incertidumbre del cálculo, y poder predecir con mayor precisión las emisiones de CO2 del cliente.</p>
                      </div>
                      <div class="service">
                          <h3 class="n-service"><span class="number">2</span>Recomendaciones a Futuro</h3>
                          <p> Calculamos el número de emisiones que se espera que tenga el usurario segun possibles cambios que deseen implementar en la empresa o teniendo en cuenta otras variables externas proporcionando varios escenarios posibles personalizados segun el cliente. Disponemos de mecanismos para automatizar las actualizaciones de las gráficas y predicciones a medida que el cliente nos proporcione nuevos datos.</p>
                      </div>
                      <div class="service">
                          <h3 class="n-service"><span class="number">3</span>Plan de Certificación Oficial</h3>
                          <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab autem enim illum dolorum nisi. Aspernatur.</p>
                      </div>
                  </div>
              </div>
          </section>
          <div class="imagen-light">
              <img src="img/close.svg" alt="" class="close"/>
              <img src="" alt="" class="agregar-imagen"/>
          </div>
      
        </div>
        <div class="contenedor footer-content">
              <div class="contact-us">
                  <h2 class="brand">Contacta con nosotros</h2>
                  <p>greendata.pe@gmail.com</p>
              </div>
              <div class="social-media">
                  <a href="https://ca-es.facebook.com/greendata.official/" target="_blank" class="social-media-icon">
                      <i class='bx bxl-facebook'></i>
                  </a>
                  <a href="./" target="_blank" class="social-media-icon">
                      <i class='bx bxl-twitter' ></i>
                  </a>
                  <a href="https://www.instagram.com/greendata.official/" target="_blank" class="social-media-icon">
                      <i class='bx bxl-instagram' ></i>
                  </a>
              </div>
          </div>
          <div class="line"></div>
      </main>
    );
  }