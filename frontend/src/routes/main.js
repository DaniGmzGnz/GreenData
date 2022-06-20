// import './estilos.css';
// import './style.css';

export default function Main() {
    return (
      <main>
        <div class="header" id="inicio"/>
        <div class="buttons"/>
            <img class="icon" src="../img/login.svg" onclick="location.href='login.html';" value="Log-In" alt=""/>
            <img class="hamburguer" src="../img/hamburguesa.svg" alt=""/>
        <div>
        <nav class="menu-navegacion">
                <a href="#inicio">Inicio</a>
                <a href="#expertos">Especializados</a>
                <a href="#servicio">Servicio</a>
                <a href="#footer">Contacto</a>
                <a onclick="location.href='login.html';" value="Log-In">Registrarse</a>
        </nav>
            <div class="contenedor head">
                <h1 class="titulo">Convertimos tus ideas en una realidad</h1>
                <p class="copy">Lorem ipsum dolor sit amet consectetur adipisicing.</p>
            </div>
        </div>
      </main>
    );
  }